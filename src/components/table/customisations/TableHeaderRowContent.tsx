import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC, Fragment } from "react";
import { ColumnFilterButtonConnected } from "./ColumnFilterToggleButton";
import { Autosuggest } from "../../autosuggest/Autosuggest";

export const TableHeaderRowContent: FC<TableHeaderRow.ContentProps> = props => {
  const { column, children } = props;
  return (
    <TableHeaderRow.Content {...props}>
      <div className="d-flex align-items-center align-self-center flex-grow-1 justify-content-between">
        {children}
      </div>
      <Autosuggest
        collection={[]}
        withSearch
        toggleButton={<ColumnFilterButtonConnected column={column} />}
      />
    </TableHeaderRow.Content>
  );
};
