import {
  CustomPaging,
  CustomPagingProps,
  FilteringState,
  FilteringStateProps,
  PagingState,
  PagingStateProps,
  SelectionState,
  SelectionStateProps,
  SortingState,
  SortingStateProps
} from "@devexpress/dx-react-grid";
import {
  TableColumnReordering,
  TableColumnReorderingProps,
  TableColumnResizing,
  TableColumnResizingProps,
  TableColumnVisibility,
  TableColumnVisibilityProps,
  TableFixedColumns,
  TableFixedColumnsProps,
  TableSelection
} from "@devexpress/dx-react-grid-bootstrap4";
import { connect } from "react-redux";
import {
  onColumnWidthsChangeThunk,
  setFilters,
  setPage,
  setPageSize,
  setSelection,
  setSorting
} from "../dataGridActions";
import { ColumnWidth, DataGridState } from "../DataGridModels";

export const SortingStateConnected = connect(
  (state: DataGridState): SortingStateProps => ({
    defaultSorting: state.sorting
  }),
  (dispatch): SortingStateProps => ({
    onSortingChange: d => dispatch(setSorting(d))
  })
)(SortingState);

export const PagingStateConnected = connect(
  (state: DataGridState): PagingStateProps => ({
    ...state.pagination
  }),
  (dispatch): PagingStateProps => ({
    onPageSizeChange: d => dispatch(setPageSize(d)),
    onCurrentPageChange: d => dispatch(setPage(d))
  })
)(PagingState);

export const SelectionStateConnected = connect(
  (state: DataGridState): SelectionStateProps => ({
    selection: state.selection
  }),
  (dispatch): SelectionStateProps => ({
    onSelectionChange: s => dispatch(setSelection(s as string[]))
  })
)(SelectionState);

export const FilteringStateConnected = connect(
  (state: DataGridState): FilteringStateProps => ({
    filters: state.filtering
  }),
  (dispatch): FilteringStateProps => ({
    onFiltersChange: d => dispatch(setFilters(d))
  })
)(FilteringState);

export const CustomPagingConnected = connect(
  (state: DataGridState): CustomPagingProps => ({
    totalCount: state.pagination.totalCount
  })
)(CustomPaging);

export const TableColumnResizingConnected = connect<any, any, any>(
  (state: DataGridState): TableColumnResizingProps => ({
    defaultColumnWidths: state.columnWidths
  }),
  {
    onColumnWidthsChange: (
      columnWidths: ColumnWidth[]
    ): TableColumnResizingProps =>
      onColumnWidthsChangeThunk(columnWidths) as any
  }
)(TableColumnResizing);

export const TableColumnReorderingConnected = connect(
  (state: DataGridState): TableColumnReorderingProps => ({
    defaultOrder: state.columnsOrder
  })
)(TableColumnReordering);

export const TableFixedColumnsConnected = connect(
  (state: DataGridState): TableFixedColumnsProps => ({
    leftColumns: [TableSelection.COLUMN_TYPE, ...state.fixedColumns]
  })
)(TableFixedColumns);

export const TableColumnVisibilityConnected = connect(
  (state: DataGridState): TableColumnVisibilityProps => ({
    defaultHiddenColumnNames: state.hiddenColumns
  })
)(TableColumnVisibility);

export const DefaultGetRowId = ({ id }: { id: string }) => id;
