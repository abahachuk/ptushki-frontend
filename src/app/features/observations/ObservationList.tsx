import React, { FC } from "react";
import { connect, DispatchProp } from "react-redux";
import useMount from "react-use/esm/useMount";
import { DataGrid } from "../../../components/table/DataGrid";
import { RootState } from "../../../store";
import {
  ColumnWidth,
  FilteringRule,
  PaginationState,
  Sorting,
  TmpObservation
} from "../../../store/reducers/observationListReducer";
import {
  observationsData,
  setFilters,
  setPage,
  setPageSize,
  setSorting
} from "../../../store/actions/observationListActions";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { VerificationCell } from "./cells/VerificationCell";
import { labels } from "../../../config/i18n/labels";
import { IndexCell } from "./cells/IndexCell";
import { GridColumn } from "../../../utils/grid/columnsConfig";

interface ObservationListProps extends DispatchProp {
  observations: AsyncResource<TmpObservation[]>;
  sorting: Sorting[];
  pagination: PaginationState;
  filtering: FilteringRule[];
  hiddenColumns: string[];
  fixedColumns: string[];
  columnWidths: ColumnWidth[];
  columnsOrder: string[];
}

export const ObservationList: FC<ObservationListProps> = ({
  observations,
  sorting,
  pagination,
  filtering,
  hiddenColumns,
  fixedColumns,
  columnWidths,
  columnsOrder,
  dispatch
}) => {
  useMount(() => {
    dispatch(observationsData.request());
  });

  return (
    <DataGrid<TmpObservation>
      rows={observations.value}
      columns={[
        { name: GridColumn.id, title: labels.idx, getCellValue: IndexCell },
        {
          name: GridColumn.verified,
          title: labels.verification,
          getCellValue: r => <VerificationCell observation={r} />
        },
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
      hiddenColumns={hiddenColumns}
      filterProps={{
        filters: filtering,
        onFiltersChange: filters => dispatch(setFilters(filters))
      }}
      isLoading={observations.isLoading}
    />
  );
};

export const ObservationListConnected = connect((state: RootState) => {
  const observationsState = state.observationList;
  const {
    observations,
    sorting,
    pagination,
    filtering,
    hiddenColumns,
    fixedColumns,
    columnWidths,
    columnsOrder
  } = observationsState;

  return {
    observations,
    sorting,
    filtering,
    columnWidths,
    pagination,
    hiddenColumns,
    fixedColumns,
    columnsOrder
  };
})(ObservationList);
