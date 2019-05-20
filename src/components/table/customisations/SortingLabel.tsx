import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import React, { FC } from "react";

export const SortingLabel: FC<TableHeaderRow.SortLabelProps> = p => (
  // there is no nice way to handle sort label clicks and make eslint feel good
  // eslint-disable-next-line
  <div onClick={() => p.onSort({ keepOther: false })}>
    <div>
      <span style={{ lineHeight: 1.8 }}>{p.column.title}</span>
      {p.direction === "asc" && <ArrowDropDown />}
      {p.direction === "desc" && <ArrowDropUp />}
    </div>
  </div>
);
