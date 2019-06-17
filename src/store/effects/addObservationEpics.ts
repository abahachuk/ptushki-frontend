import { Epic } from "redux-observable";
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { RootState } from "../index";
import { ajaxService } from "../../services";
import { OBSERVATIONS_ENDPOINT } from "../../config/endpoints";
import { SecurityError } from "../../services/SecurutyService";
import { signOut } from "../actions/authActions";
import { FormValues } from "../../components/common-bird/CommonBirdModels";
import { addObservation } from "../actions/addObservationsActions";

export const requestAddObservationEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf([addObservation.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormValues>(OBSERVATIONS_ENDPOINT, action.payload)
      ).pipe(
        map(d => addObservation.success(d)),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(addObservation.failure(e));
        })
      );
    })
  );
