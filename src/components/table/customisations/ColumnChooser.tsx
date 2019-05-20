import { ColumnChooser as ColumnChooserBase } from "@devexpress/dx-react-grid";
import { ArrowDropDown } from "@material-ui/icons";
import React, { FC } from "react";
import { Button } from "reactstrap";
import { labels } from "../../../config/i18n/labels";
import { BaseCheckbox } from "../../checkbox/BaseCheckbox";

export const ColumnChooserButton: FC<
  ColumnChooserBase.ToggleButtonProps
> = p => (
  <Button
    outline
    size="sm"
    onClick={p.onToggle}
    className="my-2 btn border-0 d-flex align-items-center text-dark bg-transparent shadow-none"
  >
    <span ref={p.buttonRef}>{labels.columns}</span>
    <ArrowDropDown className="pl-1" />
  </Button>
);

export const ColumnChooserItem: FC<ColumnChooserBase.ItemProps> = p => (
  <button type="button" className="dropdown-item pl-3" onClick={p.onToggle}>
    <BaseCheckbox checked={!p.item.hidden} className="p-0 pr-2" />
    {p.item.column.title}
  </button>
);
