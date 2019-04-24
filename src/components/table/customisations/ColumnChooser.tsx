import React, { FC } from "react";
import { ColumnChooser as ColumnChooserBase } from "@devexpress/dx-react-grid";
import { BaseCheckbox } from "../../checkbox/BaseCheckbox";

export const ColumnChooserItem: FC<ColumnChooserBase.ItemProps> = p => (
  <button type="button" className="dropdown-item pl-3" onClick={p.onToggle}>
    <BaseCheckbox checked={!p.item.hidden} className="p-0 pr-2" />
    {p.item.column.title}
  </button>
);
