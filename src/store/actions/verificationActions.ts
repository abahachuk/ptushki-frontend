import { createAsyncAction } from "typesafe-actions";
import { VerificationStatus } from "../../app/features/observations/models";

export const setObservationVerificationStatus = createAsyncAction(
  "SET_VERIFICATION_STATUS_REQUEST",
  "SET_VERIFICATION_STATUS_SUCCESS",
  "SET_VERIFICATION_STATUS_FAILURE"
)<
  {
    id: string;
    status: VerificationStatus;
  },
  void,
  string
>();
