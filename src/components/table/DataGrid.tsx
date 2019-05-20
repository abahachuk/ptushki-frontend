import { Column, IntegratedSelection } from "@devexpress/dx-react-grid";
import {
  ColumnChooser,
  DragDropProvider,
  Grid,
  GridProps,
  PagingPanel,
  Table,
  TableHeaderRow,
  TableSelection,
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
  FilteringStateConnected,
  PagingStateConnected,
  SelectionStateConnected,
  SortingStateConnected,
  TableColumnReorderingConnected,
  TableColumnResizingConnected,
  TableColumnVisibilityConnected,
  TableFixedColumnsConnected
} from "./behaviors/DataGridBehaviors";
import {
  ColumnChooserButton,
  ColumnChooserItem
} from "./customisations/ColumnChooser";
import { PagingPanelContentConnected } from "./customisations/PagingPanelContent";
import {
  SelectorColumn,
  SelectorColumnHeader
} from "./customisations/SelectorColumn";
import { SortingLabel } from "./customisations/SortingLabel";
import { TableComponent } from "./customisations/TableComponent";
import { TableHeaderRowContent } from "./customisations/TableHeaderRowContent";
import { ToolbarConnected } from "./customisations/ToolbarComponent";
import { DataGridState } from "./DataGridModels";

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

  return (
    <SubspaceProviderHacked namespace={namespace} mapState={gridStateSelector}>
      <div className="position-relative">
        <Grid
          {...gridProps}
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
        >
          <SortingStateConnected />
          <PagingStateConnected />
          <SelectionStateConnected />
          <FilteringStateConnected />

          <DragDropProvider />

          <CustomPagingConnected />
          <IntegratedSelection />
          <Table messages={TABLE_LABELS} tableComponent={TableComponent} />

          <TableColumnResizingConnected />
          <TableHeaderRow
            showSortingControls
            sortLabelComponent={SortingLabel}
            contentComponent={TableHeaderRowContent}
          />

          <TableSelection
            showSelectAll
            cellComponent={SelectorColumn}
            headerCellComponent={SelectorColumnHeader}
          />
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
      </div>
    </SubspaceProviderHacked>
  );
};
