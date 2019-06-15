import { Epic } from "redux-observable";
import { EMPTY } from "rxjs";
import { filter, flatMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootState } from "../index";
import { setObservationVerificationStatus } from "../actions/verificationActions";

export const verifyObservationEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf([setObservationVerificationStatus.request])),
    flatMap(action => {
      // TODO wire up
      return EMPTY;
    })
  );
