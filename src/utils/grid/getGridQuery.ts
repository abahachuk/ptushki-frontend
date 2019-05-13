import { DataGridState } from "../../components/table/DataGridModels";
import { GridFilteringQuery, GridQuery, GridSearch } from "./models";

export const getGridQuery = <TItem>(
  gridState: DataGridState
): GridQuery<TItem> => {
  const { sorting, pagination, search, filtering } = gridState;

  const sortingProps =
    sorting && sorting[0]
      ? {
          sortingColumn: sorting[0].columnName,
          sortingDirection: sorting[0].direction.toUpperCase() as GridSearch["sortingDirection"]
        }
      : { sortingColumn: undefined, sortingDirection: undefined };

  const paginationProps = {
    pageNumber: pagination.currentPage,
    pageSize: pagination.pageSize
  };

  const searchProps = {
    search
  };

  const filterProps = filtering.reduce(
    (acc, f) => ({
      ...acc,
      [f.columnName]: f.value
    }),
    {}
  ) as GridFilteringQuery<TItem>;

  return {
    ...searchProps,
    ...paginationProps,
    ...sortingProps,
    ...filterProps
  };
};
