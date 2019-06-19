import { combineEpics, Epic } from "redux-observable";
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
import { BIRDS_ENDPOINT } from "../../config/endpoints";
import { SecurityError } from "../../services/SecurutyService";
import { signOut } from "../actions/authActions";
import { FormValues } from "../../components/common-bird/CommonBirdModels";
import { addBird } from "../actions/birdActions";

export const addBirdEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([addBird.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormValues>(BIRDS_ENDPOINT, action.payload)
      ).pipe(
        map(d => addBird.success(d)),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(addBird.failure(e));
        })
      );
    })
  );

export const birdEpic = combineEpics(addBirdEpic);
