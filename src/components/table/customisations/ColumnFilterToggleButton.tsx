import { Column } from "@devexpress/dx-react-grid";
import React, { FC } from "react";

const blockName = "filter-toggle-button";

export const ColumnFilterToggleButton: FC<{
  isFilterApplied: boolean;
}> = ({ isFilterApplied }) => (
  <span
    className={`${blockName} ${isFilterApplied && `${blockName}--active`}`}
  />
);
