import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC } from "react";
import { ColumnFilterButtonConnected } from "./ColumnFilterToggleButton";

export const TableHeaderRowContent: FC<TableHeaderRow.ContentProps> = p => (
  <TableHeaderRow.Content {...p}>
    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
      {p.children}
      <ColumnFilterButtonConnected column={p.column} />
    </div>
  </TableHeaderRow.Content>
);
