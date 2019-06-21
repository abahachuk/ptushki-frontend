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

export interface DataGridState<TFilters = Object> {
  fixedColumns: string[];
  hiddenColumns: string[];
  selection: string[];
  columnsOrder: string[];
  columnWidths: ColumnWidth[];
  pagination: PaginationState;
  filtering: FilteringRule[];
  sorting: Sorting[];
  search: string;
  availableFilters: TFilters;
  fixedPartWidth: number;
}

export interface GridSearch {
  search: string | undefined;
  pageNumber: number | undefined;
  pageSize: number | undefined;
  sortingColumn: string | undefined;
  sortingDirection: "ASC" | "DESC";
}

export type GridFilteringQuery<TData> = { [key in keyof TData]?: string };

export type GridQuery<TData> = GridSearch & GridFilteringQuery<TData>;

export interface GridDataResponse<TItem> {
  content: TItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}
