import { Table, TableProps } from "@devexpress/dx-react-grid-bootstrap4";
import classNames from "classnames";
import React, { FC } from "react";

export const TableComponent: FC<TableProps> = p => (
  <Table.Table
    {...p}
    className={classNames(
      (p as any).className,
      "table-striped table-borderless"
    )}
  />
);
