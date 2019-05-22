import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import React, { FC } from "react";

export const SortingLabel: FC<TableHeaderRow.SortLabelProps> = ({
  onSort,
  column,
  direction
}) => (
  // there is no nice way to handle sort label clicks and make eslint feel good
  // eslint-disable-next-line
  <div
    onClick={() => onSort({ keepOther: false })}
    className="d-flex align-items-center"
  >
    <span style={{ whiteSpace: "normal", lineHeight: 1 }}>{column.title}</span>
    {direction === "asc" && <ArrowDropDown />}
    {direction === "desc" && <ArrowDropUp />}
  </div>
);
