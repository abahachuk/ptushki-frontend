import { PayloadAC } from "typesafe-actions";
import { AsyncActionBuilderConstructor } from "typesafe-actions/dist/create-async-action";
import { AsyncResource } from "../../utils/createAsyncStateReducer";

export interface Sorting {
  columnName: string;
  direction: "asc" | "desc";
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

export interface ColumnWidth {
  columnName: string;
  width: number;
}

export interface FilteringRule {
  columnName: string;
  value?: string;
}

export interface DataGridFilter {
  count: number;
  value: string | boolean;
}

export type DataGridFiltersObj<TData> = {
  [key in keyof TData]?: DataGridFilter[];
};

export interface DataGridState<TData = Object[], TFilters = Object> {
  fixedColumns: string[];
  hiddenColumns: string[];
  selection: string[];
  columnsOrder: string[];
  columnWidths: ColumnWidth[];
  pagination: PaginationState;
  filtering: FilteringRule[];
  sorting: Sorting[];
  search: string;
  availableFilters: TFilters | {};
  fixedPartWidth: number;
  isMounted: boolean;
  data: AsyncResource<TData>;
}

export interface GridSearch {
  search: string | undefined;
  pageNumber: number | undefined;
  pageSize: number | undefined;
  sortingColumn: string | undefined;
  sortingDirection: "ASC" | "DESC";
}

export interface DataGridActions<TData, TFilters> {
  getData: AsyncActionBuilderConstructor<
    string,
    string,
    string,
    FilteringRule[],
    TData,
    string
  >;
  getFilters: AsyncActionBuilderConstructor<
    string,
    string,
    string,
    void,
    TFilters,
    string
  >;
  flush: PayloadAC<string, void>;
  setSorting: PayloadAC<string, Sorting[]>;
  setSearch: PayloadAC<string, string>;
  setPage: PayloadAC<string, number>;
  setPageSize: PayloadAC<string, number>;
  setSelection: PayloadAC<string, string[]>;
  setFilters: PayloadAC<string, FilteringRule[]>;
  setTotalCount: PayloadAC<string, number>;
  setMounted: PayloadAC<string, boolean>;
}

export type GridFilteringQuery<TData> = { [key in keyof TData]?: string };

export type GridQuery<TData> = GridSearch & GridFilteringQuery<TData>;

export interface GridDataResponse<TItem> {
  content: TItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}
