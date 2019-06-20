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
import {
  addObservation,
  deleteObservation,
  getObservation,
  putObservation
} from "../actions/observationActions";
import { putBird } from "../actions/birdActions";

export const getFormValues = (data: FormValues) =>
  Object.entries(data).reduce((acc: any, item: any) => {
    acc[item[0]] = item[1].value;
    return acc;
  }, {});

export const transformToFormValues = (data: any) =>
  Object.entries(data).reduce((acc: any, item: any) => {
    const isPrimitive =
      typeof item[1] === "string" || typeof item[1] === "number";
    acc[item[0]] = {
      value: item[1] && (isPrimitive ? item[1] : item[1].id),
      label:
        item[1] &&
        (isPrimitive
          ? item[1]
          : item[1].desc_rus ||
            item[1].desc_eng ||
            item[1].desc_byn ||
            item[1][item[0]])
    };
    return acc;
  }, {});

export const addObservationEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf([addObservation.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormData>(
          OBSERVATIONS_ENDPOINT,
          getFormValues(action.payload)
        )
      ).pipe(
        map(d => addObservation.success(transformToFormValues(d))),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(addObservation.failure(e));
        })
      );
    })
  );

export const getObservationEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf([getObservation.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormData>(
          `${OBSERVATIONS_ENDPOINT}/${action.payload}`
        )
      ).pipe(
        map(d => getObservation.success(transformToFormValues(d))),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(getObservation.failure(e));
        })
      );
    })
  );

export const deleteObservationEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf([deleteObservation.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormData>(
          `${OBSERVATIONS_ENDPOINT}/${action.payload}`,
          null,
          "delete"
        )
      ).pipe(
        map(d => deleteObservation.success()),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(deleteObservation.failure(e));
        })
      );
    })
  );

export const putObservationEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf([putObservation.request])),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(
        ajaxService.makeCall<FormData>(
          // @ts-ignore
          `${OBSERVATIONS_ENDPOINT}/${action.payload.id.value}`,
          getFormValues(action.payload),
          "put"
        )
      ).pipe(
        map(d => putObservation.success(transformToFormValues(d))),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(putObservation.failure(e));
        })
      );
    })
  );

export const observationEpic = combineEpics(
  addObservationEpic,
  getObservationEpic,
  deleteObservationEpic,
  putObservationEpic
);
