import { combineEpics, Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { filter, map, switchMap } from "rxjs/operators";
import { take } from "ramda";
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
    switchMap(() => ajaxService.makeCall<TmpObservation[]>("/observations")),
    map(d => observationsData.success(take(10, d)))
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
