/* eslint-disable */
// / <reference types="react-scripts" />

declare module "react-table-hoc-fixed-columns" {
  import ReactTable, { Column, TableProps } from "react-table";
  import { ReactElement } from "react";

  interface TableWithFixedColumnsColumn<D> extends Column<D> {
    fixed?: "left" | "right";
  }

  interface TableWithFixedColumnsProps<D = any, ResolvedData = D>
    extends TableProps<D, ResolvedData> {
    columns: Array<TableWithFixedColumnsColumn<ResolvedData>>;
  }

  type TableWithFixedColumns = <D = {}>(
    props: Partial<TableWithFixedColumnsProps<D>>
  ) => ReactElement;

  export default function withFixedColumns(
    c: typeof ReactTable
  ): TableWithFixedColumns;
}
