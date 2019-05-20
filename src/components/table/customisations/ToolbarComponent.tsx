import { Toolbar } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC } from "react";

export const ToolbarComponent: FC<Toolbar.RootProps> = p => (
  <div {...p} className="d-flex flex-wrap justify-content-end my-2" />
);
