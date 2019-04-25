import {
  ColumnChooser,
  DragDropProvider,
  Grid,
  GridProps,
  PagingPanel,
  Table,
  TableFilterRow,
  TableHeaderRow,
  TableSelection,
  Toolbar
} from "@devexpress/dx-react-grid-bootstrap4";
import React from "react";
import { Column, IntegratedSelection } from "@devexpress/dx-react-grid";
import useToggle from "react-use/esm/useToggle";
import { FillLoader } from "../loader/FillLoader";
import {
  SelectorColumn,
  SelectorColumnHeader
} from "./customisations/SelectorColumn";
import { ColumnChooserItem } from "./customisations/ColumnChooser";
import { ColumnFilterToggleButton } from "./customisations/ColumnFilterToggleButton";
import { labels } from "../../config/i18n/labels";
import {
  BreakOutOfSubspace,
  SubspaceProviderHacked
} from "../../utils/subspace/SubspaceProviderHacked";
import { DataGridState } from "./DataGridModels";
import {
  CustomPagingConnected,
  FilteringStateConnected,
  PagingStateConnected,
  SelectionStateConnected,
  SortingStateConnected,
  TableColumnReorderingConnected,
  TableColumnResizingConnected,
  TableColumnVisibilityConnected,
  TableFixedColumnsConnected
} from "./behaviors/DataGridBehaviors";

export interface DataGridCol<TRow extends {}> extends Column {
  // make required and override with TRow generic for type safety
  getCellValue: (row: TRow, columnName: string) => any;
}

interface DataGridProps<TRow extends {}> extends GridProps {
  rows: Array<TRow>;
  columns: DataGridCol<TRow>[];
  getRowId?: (row: TRow) => number | string;

  namespace: string;
  gridStateSelector: (s: unknown) => DataGridState;

  isLoading?: boolean;
}

const DEFAULT_PAGE_SIZES = [10, 15, 30, 50];
const TABLE_LABELS = {
  noData: labels.noData
};

export const DataGrid = <TRow extends {}>(props: DataGridProps<TRow>) => {
  const { namespace, gridStateSelector, isLoading, ...gridProps } = props;

  const [filterRowVisible, toggleFilterRow] = useToggle(false);

  return (
    <SubspaceProviderHacked namespace={namespace} mapState={gridStateSelector}>
      <div className="position-relative">
        <Grid
          {...gridProps}
          columns={gridProps.columns.map(col => ({
            ...col,
            getCellValue: (...args) => (
              <BreakOutOfSubspace>
                {col.getCellValue(...args)}
              </BreakOutOfSubspace>
            )
          }))}
        >
          <SortingStateConnected />
          <PagingStateConnected />
          <SelectionStateConnected />
          <FilteringStateConnected />

          <DragDropProvider />

          <CustomPagingConnected />
          <IntegratedSelection />
          <Table messages={TABLE_LABELS} />

          <TableColumnResizingConnected />
          <TableHeaderRow
            showSortingControls
            contentComponent={p => (
              <TableHeaderRow.Content {...p}>
                {p.children}
                <ColumnFilterToggleButton onToggle={() => toggleFilterRow()} />
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

          <TableColumnReorderingConnected />
          <TableFixedColumnsConnected />
          <TableColumnVisibilityConnected />
          <Toolbar />
          <ColumnChooser itemComponent={ColumnChooserItem} />
        </Grid>
        {isLoading && <FillLoader />}
      </div>
    </SubspaceProviderHacked>
  );
};
