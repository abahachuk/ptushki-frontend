import { Column, IntegratedSelection } from "@devexpress/dx-react-grid";
import {
  ColumnChooser,
  DragDropProvider,
  Grid,
  GridProps,
  PagingPanel,
  Table,
  TableHeaderRow,
  Toolbar
} from "@devexpress/dx-react-grid-bootstrap4";
import React from "react";
import { labels } from "../../config/i18n/labels";
import {
  BreakOutOfSubspace,
  SubspaceProviderHacked
} from "../../utils/subspace/SubspaceProviderHacked";
import { FillLoader } from "../loader/FillLoader";
import {
  CustomPagingConnected,
  DefaultGetRowId,
  FilteringStateConnected,
  PagingStateConnected,
  SelectionStateConnected,
  SortingStateConnected,
  TableColumnReorderingConnected,
  TableColumnResizingConnected,
  TableColumnVisibilityConnected,
  TableFixedColumnsConnected
} from "./behaviors/DataGridBehaviors";
import { PagingPanelContentConnected } from "./customisations/PagingPanelContent";
import { SortingLabel } from "./customisations/SortingLabel";
import { TableComponentConnected } from "./customisations/TableComponent";
import { TableHeaderRowContentConnected } from "./customisations/TableHeaderRowContent";
import { TableRowConnected } from "./customisations/TableRow";
import { TableSelectionComponent } from "./customisations/TableSelectionComponent";
import {
  ColumnChooserButton,
  ColumnChooserItem
} from "./customisations/toolbar/ColumnChooser";
import { ToolbarConnected } from "./customisations/toolbar/ToolbarComponent";
import { DataGridFilter, DataGridState } from "./DataGridModels";

export interface DataGridCol<TRow extends {}> extends Column {
  name: string;
  // make required and override with TRow generic for type safety
  getCellValue: (row: TRow, columnName: string) => any;
  filter?: {
    getValue?: (filter: DataGridFilter) => string;
    getLabel?: (filter: DataGridFilter) => string;
  };
}

export interface DataGridProps<TRow extends {}> extends GridProps {
  rows: Array<TRow>;
  columns: DataGridCol<TRow>[];
  getRowId?: (row: TRow) => number | string;
  onRowClick?: (row: TRow) => void;

  namespace: string;
  gridStateSelector: (s: unknown) => DataGridState;

  autoHeight?: boolean;
  isLoading?: boolean;
}

const DEFAULT_PAGE_SIZES = [10, 15, 30, 50];

export const DataGrid = <TRow extends {}>(props: DataGridProps<TRow>) => {
  const {
    namespace,
    gridStateSelector,
    isLoading,
    getRowId = DefaultGetRowId,
    onRowClick,
    rows,
    autoHeight,
    ...gridProps
  } = props;

  return (
    <SubspaceProviderHacked namespace={namespace} mapState={gridStateSelector}>
      <div className="data-grid-wrapper">
        <Grid
          {...gridProps}
          rootComponent={({ children }) => (
            <div className="data-grid-root">{children}</div>
          )}
          columns={gridProps.columns.map(col => ({
            ...col,
            getCellValue: (...args) => (
              <BreakOutOfSubspace>
                <div className="table-cell-value">
                  {col.getCellValue(...args)}
                </div>
              </BreakOutOfSubspace>
            )
          }))}
          getRowId={getRowId}
          rows={rows}
        >
          <SortingStateConnected />
          <PagingStateConnected />
          <SelectionStateConnected />
          <FilteringStateConnected />

          <DragDropProvider />

          <CustomPagingConnected />
          <IntegratedSelection />
          <Table
            tableComponent={p => (
              <TableComponentConnected autoHeight={autoHeight} {...p} />
            )}
            rowComponent={p => (
              <TableRowConnected {...p} onRowClick={onRowClick} />
            )}
            noDataRowComponent={() => null}
          />

          <TableColumnResizingConnected />
          <TableHeaderRow
            showSortingControls
            sortLabelComponent={SortingLabel}
            contentComponent={TableHeaderRowContentConnected}
          />

          <TableSelectionComponent />
          <PagingPanel
            pageSizes={DEFAULT_PAGE_SIZES}
            containerComponent={PagingPanelContentConnected}
          />

          <TableColumnReorderingConnected />
          <TableFixedColumnsConnected />
          <TableColumnVisibilityConnected />
          <Toolbar rootComponent={ToolbarConnected} />
          <ColumnChooser
            itemComponent={ColumnChooserItem}
            toggleButtonComponent={ColumnChooserButton}
          />
        </Grid>
        {isLoading && <FillLoader />}
        {!isLoading && !rows.length && (
          <div className="data-grid-no-data">{labels.noData}</div>
        )}
      </div>
    </SubspaceProviderHacked>
  );
};

export default DataGrid;
