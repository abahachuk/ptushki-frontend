import qs from "qs";
import { combineEpics, Epic } from "redux-observable";
import { EMPTY, from, of } from "rxjs";
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import {
  OBSERVATIONS_GRID_STATE_SELECTOR,
  OBSERVATIONS_LIST_NAMESPACE
} from "../../app/features/observations/conf";
import {
  ObservationFilters,
  ObservationsResponse
} from "../../app/features/observations/models";
import { ROUTE_OBSERVATIONS } from "../../app/features/routing/routes";
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
  observationsData,
  observationsFiltersRequest
} from "../actions/observationListActions";
import { selectLocale } from "../actions/userPreferencesActions";
import { setObservationVerificationStatus } from "../actions/verificationActions";
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
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(observationsData.failure(e));
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
        ajaxService.makeCall<ObservationFilters>(OBSERVATIONS_FILTERS_ENDPOINT)
      ).pipe(
        map(d => observationGridActions.addFilters(d)),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return EMPTY;
        })
      );
    })
  );

const reRequestOnGridActionsEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(
      isActionOf([
        ...dataGridActionsRequiringRequest(observationGridActions),
        selectLocale,
        setObservationVerificationStatus.success
      ])
    ),
    withLatestFrom(state$),
    filter(
      ([_, state]) => state.router.location.pathname === ROUTE_OBSERVATIONS.path
    ),
    map(() => observationsData.request())
  );

export const observationListEpic = combineEpics(
  requestObservationsEpic,
  reRequestOnGridActionsEpic,
  requestObservationFiltersEpic,
  getDataGridEpics(
    OBSERVATIONS_LIST_NAMESPACE,
    OBSERVATIONS_GRID_STATE_SELECTOR
  )
);
