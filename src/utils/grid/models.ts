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
  totalPages: number;
}
