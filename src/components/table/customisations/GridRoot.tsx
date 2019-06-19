import React, { FC } from "react";
import { BreakOutOfSubspace } from "../../../utils/subspace/SubspaceProviderHacked";
import { DataGridCol } from "../DataGrid";

export const RootComponent: FC<{}> = ({ children }) => (
  <div className="data-grid-root">{children}</div>
);

export const GridColumn = (col: DataGridCol<any>): DataGridCol<any> => ({
  ...col,
  getCellValue: (...args) => (
    <BreakOutOfSubspace>
      <div className="table-cell-value">{col.getCellValue(...args)}</div>
    </BreakOutOfSubspace>
  )
});
