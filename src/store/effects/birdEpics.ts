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
import { BIRDS_ENDPOINT, OBSERVATIONS_ENDPOINT } from "../../config/endpoints";
import { SecurityError } from "../../services/SecurutyService";
import { signOut } from "../actions/authActions";
import { FormValues } from "../../components/common-bird/CommonBirdModels";
import { addBird, deleteBird, getBird, putBird } from "../actions/birdActions";
import { getFormValues, transformToFormValues } from "./observationEpics";
import { deleteObservation } from "../actions/observationActions";

export const addBirdEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([addBird.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormData>(
          BIRDS_ENDPOINT,
          getFormValues(action.payload)
        )
      ).pipe(
        map(d => addBird.success(transformToFormValues(d))),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(addBird.failure(e));
        })
      );
    })
  );

export const getBirdEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([getBird.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormData>(`${BIRDS_ENDPOINT}/${action.payload}`)
      ).pipe(
        map(d => getBird.success(transformToFormValues(d))),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(getBird.failure(e));
        })
      );
    })
  );

export const deleteBirdEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([deleteBird.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormData>(
          `${BIRDS_ENDPOINT}/${action.payload}`,
          null,
          "delete"
        )
      ).pipe(
        map(d => deleteBird.success()),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(deleteBird.failure(e));
        })
      );
    })
  );

export const putBirdEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([putBird.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormData>(
          // @ts-ignore
          `${BIRDS_ENDPOINT}/${action.payload.id.value}`,
          getFormValues(action.payload),
          "put"
        )
      ).pipe(
        map(d => putBird.success(transformToFormValues(d))),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(putBird.failure(e));
        })
      );
    })
  );

export const birdEpic = combineEpics(
  addBirdEpic,
  getBirdEpic,
  deleteBirdEpic,
  putBirdEpic
);
