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
  BIRD_OBSERVATIONS_GRID_STATE_SELECTOR,
  BIRD_OBSERVATIONS_LIST_NAMESPACE
} from "../../app/features/bird-info/conf";
import {
  BirdObservationFilters,
  BirdObservationsResponse
} from "../../app/features/bird-info/models";
import { dataGridActionsRequiringRequest } from "../../components/table/dataGridActions";
import { getDataGridEpics } from "../../components/table/dataGridEpics";
import {
  OBSERVATIONS_ENDPOINT,
  OBSERVATIONS_FILTERS_ENDPOINT
} from "../../config/endpoints";
import { ajaxService } from "../../services";
import { SecurityError } from "../../services/SecurutyService";
import { getGridQuery } from "../../utils/grid/getGridQuery";
import { getLangQuery } from "../../utils/lang/getLangQuery";
import { signOut } from "../actions/authActions";
import {
  observationGridActions,
  birdObservationsData,
  observationsFiltersRequest,
  setObservationVerificationStatus
} from "../actions/birdObservationsListActions";
import { selectLocale } from "../actions/userPreferencesActions";
import { RootState } from "../index";

const requestObservationsEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([birdObservationsData.request])),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const query = qs.stringify({
        ...getGridQuery(BIRD_OBSERVATIONS_GRID_STATE_SELECTOR(state)),
        ...getLangQuery(state)
      });

      return from(
        ajaxService.makeCall<BirdObservationsResponse>(
          `${OBSERVATIONS_ENDPOINT}?${query}`
        )
      ).pipe(
        map(d => birdObservationsData.success(d.content)),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(birdObservationsData.failure(e));
        })
      );
    })
  );

export const requestObservationFiltersEpic: Epic<
  any,
  any,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf([observationsFiltersRequest])),
    switchMap(() => {
      return from(
        ajaxService.makeCall<BirdObservationFilters>(
          OBSERVATIONS_FILTERS_ENDPOINT
        )
      ).pipe(
        map(d => observationGridActions.addFilters(d)),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return EMPTY;
        })
      );
    })
  );

const verifyObservationEpic: Epic<any, any, RootState> = action$ =>
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
        ...dataGridActionsRequiringRequest(observationGridActions),
        selectLocale,
        setObservationVerificationStatus.success
      ])
    ),
    map(() => birdObservationsData.request())
  );

export const birdObnservationsListEpic = combineEpics(
  requestObservationsEpic,
  verifyObservationEpic,
  reRequestOnGridActionsEpic,
  requestObservationFiltersEpic,
  getDataGridEpics(
    BIRD_OBSERVATIONS_LIST_NAMESPACE,
    BIRD_OBSERVATIONS_GRID_STATE_SELECTOR
  )
);
