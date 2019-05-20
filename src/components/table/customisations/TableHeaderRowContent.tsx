import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC } from "react";
import { ColumnFilterButtonConnected } from "./ColumnFilterToggleButton";

export const TableHeaderRowContent: FC<TableHeaderRow.ContentProps> = p => (
  <TableHeaderRow.Content {...p}>
    {p.children}
    <ColumnFilterButtonConnected column={p.column} />
  </TableHeaderRow.Content>
);
