import qs from "qs";
import { combineEpics, Epic } from "redux-observable";
import { EMPTY, from, of } from "rxjs";
import {
  catchError,
  filter,
  flatMap,
  map,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import {
  OBSERVATIONS_GRID_STATE_SELECTOR,
  OBSERVATIONS_LIST_NAMESPACE
} from "../../app/features/observations/conf";
import { ObservationsResponse } from "../../app/features/observations/models";
import { getDataGridEpics } from "../../components/table/dataGridEpics";
import { OBSERVATIONS_ENDPOINT } from "../../config/endpoints";
import { ajaxService } from "../../services";
import { getGridQuery } from "../../utils/grid/getGridQuery";
import { getLangQuery } from "../../utils/lang/getLangQuery";
import {
  observationGridActions,
  observationsData,
  setObservationVerificationStatus
} from "../actions/observationListActions";
import { selectLocale } from "../actions/userPreferencesActions";
import { RootState } from "../index";

const requestObservationsEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([observationsData.request])),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const query = qs.stringify({
        ...getGridQuery(OBSERVATIONS_GRID_STATE_SELECTOR(state)),
        ...getLangQuery(state)
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

const verifyObservationEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([setObservationVerificationStatus.request])),
    flatMap(action => {
      // TODO wire up
      return EMPTY;
    })
  );

const reRequestOnGridActionsEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(
      isActionOf([
        observationGridActions.setPage,
        observationGridActions.setPageSize,
        observationGridActions.setSearch,
        observationGridActions.setSorting,
        observationGridActions.setFilters,
        selectLocale,
        setObservationVerificationStatus.success
      ])
    ),
    map(() => observationsData.request())
  );

export const observationListEpic = combineEpics(
  requestObservationsEpic,
  verifyObservationEpic,
  reRequestOnGridActionsEpic,
  getDataGridEpics(
    OBSERVATIONS_LIST_NAMESPACE,
    OBSERVATIONS_GRID_STATE_SELECTOR
  )
);
