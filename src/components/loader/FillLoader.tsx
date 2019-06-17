import { Spinner } from "reactstrap";
import React, { FC } from "react";

import "./FillLoader.scss";

const classBase = "fill-loader";

export const FillLoader: FC<{ fullPage?: boolean }> = ({ fullPage }) => (
  <div
    className={`${classBase} ${(fullPage && `${classBase}--full-page`) || ""}`}
  >
    <Spinner />
  </div>
);
