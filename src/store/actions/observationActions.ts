import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { FormValues } from "../../components/common-bird/CommonBirdModels";

export const addObservation = createAsyncAction(
  "SEND_OBSERVATION_REQUEST",
  "SEND_OBSERVATION_SUCCESS",
  "SEND_OBSERVATION_FAILURE"
)<FormValues, FormValues, string>();

export const getObservation = createAsyncAction(
  "GET_OBSERVATION_REQUEST",
  "GET_OBSERVATION_SUCCESS",
  "GET_OBSERVATION_FAILURE"
)<string, FormValues, string>();

export const deleteObservation = createAsyncAction(
  "DELETE_OBSERVATION_REQUEST",
  "DELETE_OBSERVATION_SUCCESS",
  "DELETE_OBSERVATION_FAILURE"
)<string, {}, string>();

export const putObservation = createAsyncAction(
  "PUT_OBSERVATION_REQUEST",
  "PUT_OBSERVATION_SUCCESS",
  "PUT_OBSERVATION_FAILURE"
)<FormValues, FormValues, string>();

export const updateObservation = createStandardAction("UPDATE_OBSERVATION")<
  FormValues
>();

export const flushObservation = createStandardAction("FLUSH_OBSERVATION")<
  void
>();
