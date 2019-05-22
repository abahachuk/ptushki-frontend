import qs from "qs";
import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { ObservationsResponse } from "../../app/features/observations/models";
import { OBSERVATIONS_ENDPOINT } from "../../config/endpoints";
import { ajaxService } from "../../services";
import { getGridQuery } from "../../utils/grid/getGridQuery";
import {
  observationGridActions,
  observationsData,
  verifyObservation
} from "../actions/observationListActions";
import { selectLocale } from "../actions/userPreferencesActions";
import { RootState } from "../index";

export const requestObservationEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf([observationsData.request])),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const query = qs.stringify({
        ...getGridQuery(state.observationList.gridState),
        lang: state.userPreferences.selectedLocale
      });

      return from(
        ajaxService.makeCall<ObservationsResponse>(
          `${OBSERVATIONS_ENDPOINT}?${query}`
        )
      ).pipe(
        map(d => observationsData.success(d.content)),
        catchError(e => of(observationsData.failure(e)))
      );
    })
  );

export const reRequestOnGridActionsEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(
      isActionOf([
        observationGridActions.setPage,
        observationGridActions.setPageSize,
        observationGridActions.setSearch,
        observationGridActions.setSorting,
        observationGridActions.setFilters,
        selectLocale,
        verifyObservation
      ])
    ),
    map(() => observationsData.request())
  );

export const resetPaginationEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(
      isActionOf([
        observationGridActions.setSearch,
        observationGridActions.setSorting,
        observationGridActions.setFilters
      ])
    ),
    map(() => observationGridActions.setPage(0))
  );

export const resetSelectionEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(
      isActionOf([
        observationGridActions.setSearch,
        observationGridActions.setSorting,
        observationGridActions.setPage,
        observationGridActions.setPageSize,
        observationGridActions.setFilters
      ])
    ),
    map(() => observationGridActions.setSelection([]))
  );

export const observationListEpic = combineEpics(
  requestObservationEpic,
  reRequestOnGridActionsEpic,
  resetPaginationEpic,
  resetSelectionEpic
);
