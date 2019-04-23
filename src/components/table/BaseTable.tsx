import * as React from "react";
import ReactTable from "react-table";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "./BaseTable.scss";
import { labels } from "../../config/i18n/labels";
import { BaseTablePagination } from "./BaseTablePagination";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

export const BaseTable: typeof ReactTableFixedColumns = props => (
  <ReactTableFixedColumns
    className="-highlight"
    showPaginationTop
    showPaginationBottom={false}
    resizable={false}
    manual
    loadingText={labels.loading}
    PaginationComponent={BaseTablePagination}
    {...props}
  />
);
