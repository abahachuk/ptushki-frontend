import { createAsyncAction } from "typesafe-actions";
import { IInitialData } from "../../app/features/create-page/models";

export const initialData = createAsyncAction(
  "INITIAL_DATA_REQUEST",
  "INITIAL_DATA_SUCCESS",
  "INITIAL_DATA_FAILURE"
)<void, IInitialData, string>();
