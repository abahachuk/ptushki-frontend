import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC } from "react";
import { ColumnFilterButtonConnected } from "./ColumnFilterToggleButton";

export const TableHeaderRowContent: FC<TableHeaderRow.ContentProps> = props => {
  const { column, children } = props;
  return (
    <TableHeaderRow.Content {...props}>
      <div className="d-flex align-items-center flex-grow-1 justify-content-between">
        {children}
        <ColumnFilterButtonConnected column={column} />
      </div>
    </TableHeaderRow.Content>
  );
};
