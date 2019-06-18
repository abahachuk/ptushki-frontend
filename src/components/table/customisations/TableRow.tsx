import { Table } from "@devexpress/dx-react-grid-bootstrap4";
import classNames from "classnames";
import { noop } from "ramda-adjunct";
import React, { FC, useCallback } from "react";
import { connect } from "react-redux";
import { DataGridState } from "../DataGridModels";

export const TableRow: FC<
  Table.DataRowProps & {
    className?: string;
    selection: string[];
    onRowClick: (r: any) => void;
  }
> = ({ className, selection, onRowClick = noop, ...props }) => {
  const { row } = props;
  const { id } = row;
  return (
    <Table.Row
      {...props}
      onClick={useCallback(() => onRowClick(row), [onRowClick, row])}
      className={classNames(className, "clickable", {
        "table-active": selection && selection.includes(id)
      })}
    />
  );
};

export const TableRowConnected = connect(
  (state: DataGridState) => ({
    selection: state.selection
  }),
  () => ({})
)(TableRow);
