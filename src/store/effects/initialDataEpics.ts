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
import { INITIAL_DATA_ENDPOINT } from "../../config/endpoints";
import { SecurityError } from "../../services/SecurutyService";
import { signOut } from "../actions/authActions";
import { initialData } from "../actions/initialDataActions";
import { IInitialData } from "../../app/features/create-page/models";

export const requestInitialDataEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf([initialData.request])),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      return from(
        ajaxService.makeCall<IInitialData>(INITIAL_DATA_ENDPOINT)
      ).pipe(
        map(d => initialData.success(d)),
        catchError(e => {
          if (e instanceof SecurityError) return of(signOut());
          return of(initialData.failure(e));
        })
      );
    })
  );
