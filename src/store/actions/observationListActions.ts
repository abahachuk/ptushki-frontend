import { createAction } from "redux-actions";
import { Sorting } from "../reducers/observationListReducer";

// TODO when implementing other tables, reuse table-related actions and reducers
//  https://redux.js.org/recipes/structuring-reducers/reusing-reducer-logic
export const setSorting = createAction<Sorting[]>("SET_SORTING");
export const setPage = createAction<number>("SET_PAGE");
export const setPageSize = createAction<number>("SET_PAGE_SIZE");
