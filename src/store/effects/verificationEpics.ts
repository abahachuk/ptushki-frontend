import { Epic } from "redux-observable";
import { filter, flatMap, map } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { OBSERVATIONS_SET_VERIFICATION } from "../../config/endpoints";
import { ajaxService } from "../../services";
import { setObservationVerificationStatus } from "../actions/verificationActions";
import { RootState } from "../index";

export const verifyObservationEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf([setObservationVerificationStatus.request])),
    flatMap(action =>
      ajaxService.makeCall<any>(OBSERVATIONS_SET_VERIFICATION, action.payload)
    ),
    map(() => setObservationVerificationStatus.success())
  );
