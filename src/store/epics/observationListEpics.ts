import { Epic, ofType } from "redux-observable";
import { map, switchMap } from "rxjs/operators";
import { observationsData } from "../actions/observationListActions";
import { RootState } from "../index";
import { ajaxService } from "../../services";
import { TmpObservation } from "../reducers/observationListReducer";

export const observationListEpic: Epic<any, any, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType(observationsData.request),
    switchMap(() => ajaxService.makeCall<TmpObservation[]>("/observations")),
    map(d => observationsData.success(d))
  );
