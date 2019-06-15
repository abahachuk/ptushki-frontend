import React, { lazy, Suspense } from "react";
import { FillLoader } from "../loader/FillLoader";
import DataGrid from "./DataGrid";

const LazyDataGrid = lazy(() => import("./DataGrid"));

export const DataGridLazy: typeof DataGrid = props => (
  <Suspense fallback={<FillLoader />}>
    <LazyDataGrid {...props} />
  </Suspense>
);
