import { combineEpics, Epic } from "redux-observable";
import { MapState } from "redux-subspace";
import { subspaced } from "redux-subspace-observable";
import { filter, map } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import {
  setFilters,
  setPage,
  setPageSize,
  setSearch,
  setSelection,
  setSorting
} from "./dataGridActions";
import { DataGridState } from "./DataGridModels";

// region internal
const resetPaginationEpic: Epic<any, any, DataGridState> = action$ =>
  action$.pipe(
    filter(isActionOf([setSearch, setSorting, setFilters])),
    map(() => setPage(0))
  );

export const resetSelectionEpic: Epic<any, any, DataGridState> = action$ =>
  action$.pipe(
    filter(
      isActionOf([setSearch, setSorting, setPage, setPageSize, setFilters])
    ),
    map(() => setSelection([]))
  );
// endregion

export const getDataGridEpics = (
  namespace: string,
  selector: MapState<any, any, DataGridState>
) =>
  combineEpics(
    subspaced(selector, namespace)(resetPaginationEpic),
    subspaced(selector, namespace)(resetSelectionEpic)
  );
