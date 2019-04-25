import { combineEpics, Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { take } from "ramda";
import { from, of } from "rxjs";
import {
  observationGridActions,
  observationsData,
  verifyObservation
} from "../actions/observationListActions";
import { RootState } from "../index";
import { ajaxService } from "../../services";
import { TmpObservation } from "../reducers/observationListReducer";

export const requestObservationEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf([observationsData.request])),
    withLatestFrom(state$),
    switchMap(([, state]) =>
      from(ajaxService.makeCall<TmpObservation[]>("/observations")).pipe(
        map(d =>
          observationsData.success(
            take(state.observationList.gridState.pagination.pageSize, d)
          )
        ),
        catchError(e => of(observationsData.failure(e)))
      )
    )
  );

export const reRequestOnGridActionsEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(
      isActionOf([
        observationGridActions.setPage,
        observationGridActions.setPageSize,
        observationGridActions.setSorting,
        observationGridActions.setFilters,
        verifyObservation
      ])
    ),
    map(() => observationsData.request())
  );

export const observationListEpic = combineEpics(
  requestObservationEpic,
  reRequestOnGridActionsEpic
);
