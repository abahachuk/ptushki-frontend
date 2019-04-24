import { createAsyncAction, createStandardAction } from "typesafe-actions";
import {
  FilteringRule,
  Sorting,
  TmpObservation
} from "../reducers/observationListReducer";

// TODO when implementing other tables, reuse table-related actions and reducers
//  https://redux.js.org/recipes/structuring-reducers/reusing-reducer-logic
export const setSorting = createStandardAction("SET_SORTING")<Sorting[]>();
export const setPage = createStandardAction("SET_PAGE")<number>();
export const setPageSize = createStandardAction("SET_PAGE_SIZE")<number>();
export const setFilters = createStandardAction("SET_FILTERS")<
  FilteringRule[]
>();

export const observationsData = createAsyncAction(
  "OBSERVATIONS_REQUEST",
  "OBSERVATIONS_SUCCESS",
  "OBSERVATIONS_FAILURE"
)<void, TmpObservation[], string>();

export const verifyObservation = createStandardAction("VERIFY_OBSERVATION")<{
  id: string;
  approved: boolean;
}>();
