import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { FormValues } from "../../components/common-bird/CommonBirdModels";

export const addBird = createAsyncAction(
  "SEND_BIRD_REQUEST",
  "SEND_BIRD_SUCCESS",
  "SEND_BIRD_FAILURE"
)<FormValues, FormValues, string>();

export const updateBird = createStandardAction("UPDATE_BIRD")<FormValues>();
