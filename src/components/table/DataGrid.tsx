import {
  DragDropProvider,
  Grid,
  GridProps,
  PagingPanel,
  Table,
  TableColumnReordering,
  TableColumnResizing,
  TableColumnVisibility,
  TableFilterRow,
  TableFixedColumns,
  TableHeaderRow,
  TableSelection
} from "@devexpress/dx-react-grid-bootstrap4";
import React, { ReactNode } from "react";
import {
  Column,
  CustomPaging,
  CustomPagingProps,
  FilteringState,
  FilteringStateProps,
  IntegratedFiltering,
  IntegratedSelection,
  PagingState,
  PagingStateProps,
  SelectionState,
  SelectionStateProps,
  SortingState,
  SortingStateProps,
  TableColumnResizingProps
} from "@devexpress/dx-react-grid";
import { BaseCheckbox } from "../checkbox/BaseCheckbox";

export interface DataGridCol<TRow extends {}> extends Column {
  // make required and override with TRow generic for type safety
  getCellValue: (row: TRow, columnName: string) => any;
}

interface DataGridProps<TRow extends {}> extends GridProps {
  rows: Array<TRow>;
  columns: DataGridCol<TRow>[];
  getRowId?: (row: TRow) => number | string;

  sortingProps?: SortingStateProps;
  pagingProps?: PagingStateProps & CustomPagingProps;
  selectionProps?: SelectionStateProps;
  filterProps?: FilteringStateProps;
  resizingProps?: TableColumnResizingProps;

  defaultOrder?: Array<string>;
  fixedColumns: Array<symbol | string>;
  hiddenColumns?: Array<string>;

  children: ReactNode;
}

export const DataGrid = <TRow extends {}>(props: DataGridProps<TRow>) => {
  const {
    sortingProps,
    pagingProps,
    selectionProps,
    filterProps,
    resizingProps,
    defaultOrder,
    fixedColumns,
    hiddenColumns = [],
    ...gridProps
  } = props;

  return (
    <Grid {...gridProps}>
      <SortingState {...sortingProps} />
      <PagingState {...pagingProps} />
      <SelectionState {...selectionProps} />
      <FilteringState {...filterProps} />

      <DragDropProvider />

      <CustomPaging totalCount={pagingProps.totalCount} />
      <IntegratedSelection />
      <IntegratedFiltering />
      <Table />

      <TableColumnResizing {...resizingProps} />
      <TableHeaderRow showSortingControls />
      <TableFilterRow />

      <TableSelection
        showSelectAll
        cellComponent={({ tableColumn, tableRow, ...p }) => (
          <td {...p}>
            <BaseCheckbox
              checked={p.selected}
              onChange={p.onToggle}
              className="p-0"
            />
          </td>
        )}
        headerCellComponent={({
          tableColumn,
          tableRow,
          allSelected,
          someSelected,
          ...p
        }) => (
          <th {...p}>
            <BaseCheckbox
              checked={someSelected || allSelected}
              indeterminate={someSelected && !allSelected}
              onChange={() => p.onToggle()}
              className="p-0"
            />
          </th>
        )}
      />
      <PagingPanel pageSizes={[15, 30, 50]} />

      <TableColumnReordering defaultOrder={defaultOrder} />
      <TableFixedColumns
        leftColumns={[TableSelection.COLUMN_TYPE, ...fixedColumns]}
      />
      <TableColumnVisibility defaultHiddenColumnNames={hiddenColumns} />
    </Grid>
  );
};
