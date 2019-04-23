import { createAction } from "redux-actions";
import { Sorting } from "../reducers/observationListReducer";

export const setSorting = createAction<Sorting[]>("SET_SORTING");
export const setPage = createAction<number>("SET_PAGE");
export const setPageSize = createAction<number>("SET_PAGE_SIZE");
