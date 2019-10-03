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
import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { labels } from "../../config/i18n/labels";
import { SubspaceProviderHacked } from "../../utils/subspace/SubspaceProviderHacked";
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
import { GridColumn, RootComponent } from "./customisations/GridRoot";
import { PagingPanelContentConnected } from "./customisations/PagingPanelContent";
import { SortingLabel } from "./customisations/SortingLabel";
import { TableComponentConnected } from "./customisations/TableComponent";
import { TableHeaderRowContentConnected } from "./customisations/TableHeaderRowContent";
import { TableRowConnected } from "./customisations/TableRow";
import { TableSelectionComponent } from "./customisations/TableSelectionComponent";
import {
  ColumnChooserButton,
  ColumnChooserContainer,
  ColumnChooserItem
} from "./customisations/toolbar/ColumnChooser";
import { ToolbarConnected } from "./customisations/toolbar/ToolbarComponent";
import { DataGridFilter, DataGridState, FilteringRule } from "./DataGridModels";
import { langSelector } from "../../store/selectors";

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
  initialFilters?: FilteringRule[];

  autoHeight?: boolean;
  isLoading?: boolean;
}

const DEFAULT_PAGE_SIZES = [10, 15, 30, 50];

const NoDataRowComponent: FC<{}> = () => null;

export const DataGrid = <TRow extends {}>(props: DataGridProps<TRow>) => {
  const {
    namespace,
    gridStateSelector,
    isLoading,
    getRowId = DefaultGetRowId,
    onRowClick,
    rows,
    autoHeight,
    initialFilters,
    ...gridProps
  } = props;

  const currentLang = useSelector(langSelector);

  const TableComponent = useCallback(
    (p: any) => (
      <TableComponentConnected
        autoHeight={autoHeight}
        initialFilters={initialFilters}
        {...p}
      />
    ),
    [autoHeight, initialFilters]
  );

  const RowComponent = useCallback(
    p => <TableRowConnected {...p} onRowClick={onRowClick} />,
    [onRowClick]
  );

  const HeaderRowComponent = useCallback(
    p => <TableHeaderRowContentConnected {...p} currentLang={currentLang} />,
    [currentLang]
  );

  return (
    <SubspaceProviderHacked namespace={namespace} mapState={gridStateSelector}>
      <div className="data-grid-wrapper">
        <Grid
          {...gridProps}
          rootComponent={RootComponent}
          columns={gridProps.columns.map(GridColumn)}
          getRowId={getRowId}
          rows={rows || []}
        >
          <SortingStateConnected />
          <PagingStateConnected />
          <SelectionStateConnected />
          <FilteringStateConnected />

          <DragDropProvider />

          <CustomPagingConnected />
          <IntegratedSelection />
          <Table
            tableComponent={TableComponent}
            rowComponent={RowComponent}
            noDataRowComponent={NoDataRowComponent}
          />

          <TableColumnResizingConnected />
          <TableHeaderRow
            showSortingControls
            sortLabelComponent={SortingLabel}
            contentComponent={HeaderRowComponent}
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
            containerComponent={ColumnChooserContainer}
            itemComponent={ColumnChooserItem}
            toggleButtonComponent={ColumnChooserButton}
          />
        </Grid>
        {isLoading && <FillLoader />}
        {!isLoading && (rows && !rows.length) && (
          <div className="data-grid-no-data">{labels.noData}</div>
        )}
      </div>
    </SubspaceProviderHacked>
  );
};

export default DataGrid;
