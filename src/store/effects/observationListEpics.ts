import { combineEpics, Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { take } from "ramda";
import { from, of } from "rxjs";
import {
  observationsData,
  setFilters,
  setPage,
  setPageSize,
  setSorting,
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
    switchMap(() =>
      from(ajaxService.makeCall<TmpObservation[]>("/observations")).pipe(
        map(d => observationsData.success(take(10, d))),
        catchError(e => of(observationsData.failure(e)))
      )
    )
  );

export const requestTriggersEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(
      isActionOf([
        setPage,
        setPageSize,
        setSorting,
        setFilters,
        verifyObservation
      ])
    ),
    map(() => observationsData.request())
  );

export const observationListEpic = combineEpics(
  requestObservationEpic,
  requestTriggersEpic
);
