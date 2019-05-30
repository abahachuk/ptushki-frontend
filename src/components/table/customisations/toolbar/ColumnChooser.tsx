import { ColumnChooser as ColumnChooserBase } from "@devexpress/dx-react-grid";
import React, { FC } from "react";
import { labels } from "../../../../config/i18n/labels";
import { BaseCheckbox } from "../../../checkbox/BaseCheckbox";
import { GridSettingsDropdownButton } from "../../../gridSettingsDropdownButton/GridSettingsDropdownButton";

export const ColumnChooserButton: FC<ColumnChooserBase.ToggleButtonProps> = ({
  onToggle,
  buttonRef
}) => (
  <div className="dropdown">
    <GridSettingsDropdownButton onClick={onToggle} innerRef={buttonRef}>
      <span>{labels.columns}</span>
    </GridSettingsDropdownButton>
  </div>
);

export const ColumnChooserItem: FC<ColumnChooserBase.ItemProps> = ({
  onToggle,
  item
}) => (
  <button type="button" className="dropdown-item pl-3" onClick={onToggle}>
    <BaseCheckbox checked={!item.hidden} className="p-0 pr-2" />
    {item.column.title}
  </button>
);
