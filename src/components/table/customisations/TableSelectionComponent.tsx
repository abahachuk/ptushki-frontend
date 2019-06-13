import { TableSelection as TableSelectionBase } from "@devexpress/dx-react-grid";
import { TableSelection } from "@devexpress/dx-react-grid-bootstrap4";
import classNames from "classnames";
import React, { FC } from "react";
import { BaseCheckbox } from "../../checkbox/BaseCheckbox";

export const SELECTOR_COLUMN_WIDTH = 50;

export const SelectorColumn: FC<TableSelectionBase.CellProps> = ({
  tableColumn,
  tableRow,
  ...p
}) => (
  <td {...p}>
    <BaseCheckbox
      checked={p.selected}
      onChange={p.onToggle}
      className="p-0"
      onClick={e => e.stopPropagation()}
    />
  </td>
);

export const SelectorColumnHeader: FC<TableSelectionBase.HeaderCellProps> = ({
  tableColumn,
  tableRow,
  allSelected,
  someSelected,
  ...p
}) => (
  <th {...p} className={classNames("pl-3", (p as any).className)}>
    <BaseCheckbox
      checked={someSelected || allSelected}
      indeterminate={someSelected && !allSelected}
      onChange={() => p.onToggle()}
      className="p-0"
    />
  </th>
);

export const TableSelectionComponent = () => (
  <TableSelection
    showSelectAll
    cellComponent={SelectorColumn}
    headerCellComponent={SelectorColumnHeader}
    selectionColumnWidth={SELECTOR_COLUMN_WIDTH}
  />
);
