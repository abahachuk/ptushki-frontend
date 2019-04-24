import { createAction } from "redux-actions";
import { createAsyncAction } from "typesafe-actions";
import {
  FilteringRule,
  Sorting,
  TmpObservation
} from "../reducers/observationListReducer";

// TODO when implementing other tables, reuse table-related actions and reducers
//  https://redux.js.org/recipes/structuring-reducers/reusing-reducer-logic
export const setSorting = createAction<Sorting[]>("SET_SORTING");
export const setPage = createAction<number>("SET_PAGE");
export const setPageSize = createAction<number>("SET_PAGE_SIZE");
export const setFilters = createAction<FilteringRule[]>("SET_FILTERS");

export const observationsData = createAsyncAction(
  "OBSERVATIONS_REQUEST",
  "OBSERVATIONS_SUCCESS",
  "OBSERVATIONS_FAILURE"
)<void, TmpObservation[], string>();
