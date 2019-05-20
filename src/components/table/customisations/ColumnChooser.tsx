import { ColumnChooser as ColumnChooserBase } from "@devexpress/dx-react-grid";
import React, { FC } from "react";
import { labels } from "../../../config/i18n/labels";
import { BaseCheckbox } from "../../checkbox/BaseCheckbox";
import { GridSettingsDropdownButton } from "../../gridSettingsDropdownButton/GridSettingsDropdownButton";

export const ColumnChooserButton: FC<
  ColumnChooserBase.ToggleButtonProps
> = p => (
  <GridSettingsDropdownButton onClick={p.onToggle} innerRef={p.buttonRef}>
    <span>{labels.columns}</span>
  </GridSettingsDropdownButton>
);

export const ColumnChooserItem: FC<ColumnChooserBase.ItemProps> = p => (
  <button type="button" className="dropdown-item pl-3" onClick={p.onToggle}>
    <BaseCheckbox checked={!p.item.hidden} className="p-0 pr-2" />
    {p.item.column.title}
  </button>
);
