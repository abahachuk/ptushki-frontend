import React, { lazy, memo, Suspense } from "react";
import { FillLoader } from "../loader/FillLoader";
import DataGrid from "./DataGrid";

const LazyDataGrid = memo(lazy(() => import("./DataGrid")));

export const DataGridLazy: typeof DataGrid = props => (
  <Suspense fallback={<FillLoader />}>
    <LazyDataGrid {...props} />
  </Suspense>
);
