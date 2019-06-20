import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { FormValues } from "../../components/common-bird/CommonBirdModels";

export const addBird = createAsyncAction(
  "SEND_BIRD_REQUEST",
  "SEND_BIRD_SUCCESS",
  "SEND_BIRD_FAILURE"
)<FormValues, FormValues, string>();

export const getBird = createAsyncAction(
  "GET_BIRD_REQUEST",
  "GET_BIRD_SUCCESS",
  "GET_BIRD_FAILURE"
)<string, FormValues, string>();

export const deleteBird = createAsyncAction(
  "DELETE_BIRD_REQUEST",
  "DELETE_BIRD_SUCCESS",
  "DELETE_BIRD_FAILURE"
)<string, {}, string>();

export const putBird = createAsyncAction(
  "PUT_BIRD_REQUEST",
  "PUT_BIRD_SUCCESS",
  "PUT_BIRD_FAILURE"
)<FormValues, FormValues, string>();

export const updateBird = createStandardAction("UPDATE_BIRD")<FormValues>();

export const flushBird = createStandardAction("FLUSH_BIRD")<void>();
