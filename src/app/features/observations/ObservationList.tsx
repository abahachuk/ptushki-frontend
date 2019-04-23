import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import { DataGrid } from "../../../components/table/DataGrid";
import { RootState } from "../../../store";
import {
  ColumnWidth,
  PaginationState,
  Sorting,
  TmpObservation
} from "../../../store/reducers/observationListReducer";
import {
  setPage,
  setPageSize,
  setSorting
} from "../../../store/actions/observationListActions";

interface ObservationListProps extends DispatchProp {
  observations: TmpObservation[];
  loading: boolean;
  sorting: Sorting[];
  pagination: PaginationState;
  fixedColumns: string[];
  columnWidths: ColumnWidth[];
  columnsOrder: string[];
}

export const ObservationList: FC<ObservationListProps> = ({
  observations,
  loading,
  sorting,
  pagination,
  fixedColumns,
  columnWidths,
  columnsOrder,
  dispatch
}) => {
  return (
    <DataGrid<TmpObservation>
      rows={observations}
      columns={[
        { name: "id", title: "ID", getCellValue: r => r.id },
        {
          name: "firstName",
          title: "Вид",
          getCellValue: r => r.firstName
        },
        { name: "lastName", title: "Статус", getCellValue: r => r.lastName }
      ]}
      fixedColumns={fixedColumns}
      defaultOrder={columnsOrder}
      pagingProps={{
        ...pagination,
        onCurrentPageChange: p => dispatch(setPage(p)),
        onPageSizeChange: p => dispatch(setPageSize(p))
      }}
      sortingProps={{
        sorting,
        onSortingChange: d => dispatch(setSorting(d))
      }}
      resizingProps={{ defaultColumnWidths: columnWidths }}
    >
      {loading && <div>TODO loading component</div>}
    </DataGrid>
  );
};

export const ObservationListConnected = connect((state: RootState) => {
  const observationsState = state.observationList;

  return {
    observations: observationsState.observations,
    loading: false,
    sorting: observationsState.sorting,
    columnWidths: observationsState.columnWidths,
    pagination: observationsState.pagination,
    fixedColumns: observationsState.fixedColumns,
    columnsOrder: observationsState.columnsOrder
  };
})(ObservationList);
