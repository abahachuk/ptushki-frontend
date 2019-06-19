import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { FormValues } from "../../components/common-bird/CommonBirdModels";

export const addObservation = createAsyncAction(
  "SEND_OBSERVATION_REQUEST",
  "SEND_OBSERVATION_SUCCESS",
  "SEND_OBSERVATION_FAILURE"
)<FormValues, FormValues, string>();

export const updateObservation = createStandardAction("UPDATE_OBSERVATION")<
  FormValues
>();
