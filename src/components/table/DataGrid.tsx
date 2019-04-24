import {
  ColumnChooser,
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
  TableSelection,
  Toolbar
} from "@devexpress/dx-react-grid-bootstrap4";
import React, { useMemo } from "react";
import {
  Column,
  CustomPaging,
  CustomPagingProps,
  FilteringState,
  FilteringStateProps,
  IntegratedSelection,
  PagingState,
  PagingStateProps,
  SelectionState,
  SelectionStateProps,
  SortingState,
  SortingStateProps,
  TableColumnResizingProps
} from "@devexpress/dx-react-grid";
import useToggle from "react-use/esm/useToggle";
import { FillLoader } from "../loader/FillLoader";
import { SelectorColumn, SelectorColumnHeader } from "./SelectorColumn";
import { ColumnChooserItem } from "./ColumnChooser";
import { ColumnFilterToggleButton } from "./ColumnFilterToggleButton";
import { labels } from "../../config/i18n/labels";

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

  isLoading?: boolean;
}

const DEFAULT_PAGE_SIZES = [10, 15, 30, 50];
const TABLE_LABELS = {
  noData: labels.noData
};

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
    isLoading,
    ...gridProps
  } = props;

  const [filterRowVisible, toggleFilterRow] = useToggle(false);

  return (
    <div className="position-relative">
      <Grid {...gridProps}>
        <SortingState {...sortingProps} />
        <PagingState {...pagingProps} />
        <SelectionState {...selectionProps} />
        <FilteringState {...filterProps} />

        <DragDropProvider />

        <CustomPaging totalCount={pagingProps.totalCount} />
        <IntegratedSelection />
        <Table messages={TABLE_LABELS} />

        <TableColumnResizing {...resizingProps} />
        <TableHeaderRow
          showSortingControls
          contentComponent={p => (
            <TableHeaderRow.Content {...p}>
              {p.children}
              <ColumnFilterToggleButton onToggle={toggleFilterRow} />
            </TableHeaderRow.Content>
          )}
        />
        {filterRowVisible && <TableFilterRow />}

        <TableSelection
          showSelectAll
          cellComponent={SelectorColumn}
          headerCellComponent={SelectorColumnHeader}
        />
        <PagingPanel pageSizes={DEFAULT_PAGE_SIZES} />

        <TableColumnReordering defaultOrder={defaultOrder} />
        <TableFixedColumns
          leftColumns={useMemo(
            () => [TableSelection.COLUMN_TYPE, ...fixedColumns],
            [fixedColumns]
          )}
        />
        <TableColumnVisibility defaultHiddenColumnNames={hiddenColumns} />
        <Toolbar />
        <ColumnChooser itemComponent={ColumnChooserItem} />
      </Grid>
      {isLoading && <FillLoader />}
    </div>
  );
};
