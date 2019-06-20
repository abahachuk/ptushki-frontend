import { combineEpics, Epic } from "redux-observable";
import {
  catchError,
  filter,
  flatMap,
  map,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, merge, of } from "rxjs";
import { push } from "connected-react-router";
import { RootState } from "../index";
import { ajaxService } from "../../services";
import { BIRDS_ENDPOINT } from "../../config/endpoints";
import { SecurityError } from "../../services/SecurutyService";
import { signOut } from "../actions/authActions";
import { addBird, deleteBird, getBird, putBird } from "../actions/birdActions";
import { getFormValues, transformToFormValues } from "./observationEpics";
import { ROUTE_BIRDS } from "../../app/features/routing/routes";

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
        flatMap(d =>
          merge(
            // @ts-ignore
            of(push(`${ROUTE_BIRDS.path}/${d.id}`)),
            of(addBird.success(transformToFormValues(d)))
          )
        ),
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
          return of(push(ROUTE_BIRDS.path));
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
          undefined,
          "delete"
        )
      ).pipe(
        map(() => push(ROUTE_BIRDS.path)),
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
        flatMap(d =>
          merge(
            // @ts-ignore
            of(push(`${ROUTE_BIRDS.path}/${d.id}`)),
            of(putBird.success(transformToFormValues(d)))
          )
        ),
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
