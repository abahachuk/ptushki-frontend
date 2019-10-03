import { combineEpics, Epic } from "redux-observable";
import { MapState } from "redux-subspace";
import { subspaced } from "redux-subspace-observable";
import {
  catchError,
  filter,
  flatMap,
  map,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { ActionCreator, isActionOf } from "typesafe-actions";
import qs from "qs";
import { EMPTY, from, merge, of } from "rxjs";
import {
  dataGridActionsRequiringRequest,
  setFilters,
  setPage,
  setPageSize,
  setSearch,
  setSelection,
  setSorting
} from "./dataGridActions";
import {
  DataGridActions,
  DataGridState,
  GridDataResponse
} from "./DataGridModels";
import { RootState } from "../../store";
import { getGridQuery } from "../../utils/grid/getGridQuery";
import { ajaxService } from "../../services";
import { SecurityError } from "../../services/SecurutyService";
import { signOut } from "../../store/actions/authActions";

interface GridEpicsParams {
  gridStateSelector: (state: RootState) => DataGridState;
  // TODO: use endpoints enum
  gridEndpoint: string;
  filtersEndpoint: string;
  gridActions: DataGridActions<any, any>;
  actionsRequiringRequest?: ActionCreator<string>[];
}

// region internal
const resetPaginationEpic: Epic<any, any, DataGridState> = action$ =>
  action$.pipe(
    filter(isActionOf([setSearch, setSorting, setFilters])),
    map(() => setPage(0))
  );

export const resetSelectionEpic: Epic<any, any, DataGridState> = action$ =>
  action$.pipe(
    filter(
      isActionOf([setSearch, setSorting, setPage, setPageSize, setFilters])
    ),
    map(() => setSelection([]))
  );
// endregion

export const getRequestGridEpic = <TResponse extends GridDataResponse<any>>(
  gridStateSelector: GridEpicsParams["gridStateSelector"],
  endpoint: GridEpicsParams["gridEndpoint"],
  gridActions: GridEpicsParams["gridActions"]
): Epic<any, any, RootState> => (action$, state$) =>
  action$.pipe(
    filter(isActionOf([gridActions.getData.request])),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const query = qs.stringify({
        ...getGridQuery(gridStateSelector(state))
      });

      return from(ajaxService.makeCall<TResponse>(`${endpoint}?${query}`)).pipe(
        flatMap(d =>
          merge(
            // TODO: update after backend fix
            // @ts-ignore
            of(gridActions.getData.success(d.content || d)),
            of(gridActions.setTotalCount(d.totalElements))
          )
        ),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(gridActions.getData.failure(e));
        })
      );
    })
  );

export const getRequestGridFiltersEpic = <TFiltersResponse>(
  endpoint: GridEpicsParams["filtersEndpoint"],
  gridActions: GridEpicsParams["gridActions"]
): Epic<any, any, RootState> => action$ =>
  action$.pipe(
    filter(isActionOf([gridActions.getFilters.request])),
    switchMap(() => {
      return from(ajaxService.makeCall<TFiltersResponse>(endpoint)).pipe(
        map(d => gridActions.getFilters.success(d)),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return EMPTY;
        })
      );
    })
  );

export const getReRequestOnGridActionsEpic = (
  gridStateSelector: GridEpicsParams["gridStateSelector"],
  gridActions: GridEpicsParams["gridActions"],
  targetActions: GridEpicsParams["actionsRequiringRequest"] = []
): Epic<any, any, RootState> => (action$, state$) =>
  action$.pipe(
    filter(
      isActionOf([
        ...dataGridActionsRequiringRequest(gridActions),
        ...targetActions
      ])
    ),
    withLatestFrom(state$),
    filter(([_, state]) => gridStateSelector(state).isMounted),
    map(() => gridActions.getData.request([]))
  );

export const getDataGridEpics = <
  TDataResponse extends GridDataResponse<any>,
  TFiltersResponse
>(
  namespace: string,
  selector: MapState<any, any, DataGridState>,
  {
    gridStateSelector,
    gridEndpoint,
    filtersEndpoint,
    gridActions,
    actionsRequiringRequest
  }: GridEpicsParams
) =>
  combineEpics(
    subspaced(selector, namespace)(resetPaginationEpic),
    subspaced(selector, namespace)(resetSelectionEpic),
    getRequestGridEpic<TDataResponse>(
      gridStateSelector,
      gridEndpoint,
      gridActions
    ),
    getRequestGridFiltersEpic<TFiltersResponse>(filtersEndpoint, gridActions),
    getReRequestOnGridActionsEpic(
      gridStateSelector,
      gridActions,
      actionsRequiringRequest
    )
  );
