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
  BIRDS_GRID_STATE_SELECTOR,
  BIRDS_LIST_NAMESPACE
} from "../../app/features/birds/conf";
import { BirdFilters, BirdsResponse } from "../../app/features/birds/models";
import { dataGridActionsRequiringRequest } from "../../components/table/dataGridActions";
import { getDataGridEpics } from "../../components/table/dataGridEpics";
import { BIRDS_ENDPOINT, BIRDS_FILTERS_ENDPOINT } from "../../config/endpoints";
import { ajaxService } from "../../services";
import { SecurityError } from "../../services/SecurutyService";
import { getGridQuery } from "../../utils/grid/getGridQuery";
import { getLangQuery } from "../../utils/lang/getLangQuery";
import { signOut } from "../actions/authActions";
import {
  birdGridActions,
  birdsData,
  birdsFiltersRequest
} from "../actions/birdsListActions";
import { selectLocale } from "../actions/userPreferencesActions";
import { RootState } from "../index";

const requestBirdsEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([birdsData.request])),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const query = qs.stringify({
        ...getGridQuery(BIRDS_GRID_STATE_SELECTOR(state)),
        ...getLangQuery(state)
      });

      return from(
        ajaxService.makeCall<BirdsResponse>(`${BIRDS_ENDPOINT}?${query}`)
      ).pipe(
        // TODO: update after backend fix
        // @ts-ignore
        map(d => birdsData.success(d)),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(birdsData.failure(e));
        })
      );
    })
  );

export const requestBirdFiltersEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf([birdsFiltersRequest])),
    switchMap(() => {
      return from(
        ajaxService.makeCall<BirdFilters>(BIRDS_FILTERS_ENDPOINT)
      ).pipe(
        map(d => birdGridActions.addFilters(d)),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return EMPTY;
        })
      );
    })
  );

const reRequestOnGridActionsEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(
      isActionOf([
        ...dataGridActionsRequiringRequest(birdGridActions),
        selectLocale
      ])
    ),
    map(() => birdsData.request())
  );

export const birdsListEpic = combineEpics(
  requestBirdsEpic,
  reRequestOnGridActionsEpic,
  requestBirdFiltersEpic,
  getDataGridEpics(BIRDS_LIST_NAMESPACE, BIRDS_GRID_STATE_SELECTOR)
);
