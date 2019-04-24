import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { TmpObservation } from "../reducers/observationListReducer";
import { dataGridActions } from "../../components/table/dataGridActions";
import { OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/observations/conf";

// TODO when implementing other tables, reuse table-related actions and reducers
//  https://redux.js.org/recipes/structuring-reducers/reusing-reducer-logic

export const observationsData = createAsyncAction(
  "OBSERVATIONS_REQUEST",
  "OBSERVATIONS_SUCCESS",
  "OBSERVATIONS_FAILURE"
)<void, TmpObservation[], string>();

export const verifyObservation = createStandardAction("VERIFY_OBSERVATION")<{
  id: string;
  approved: boolean;
}>();

export const observationGridActions = dataGridActions(
  OBSERVATIONS_LIST_NAMESPACE
);
