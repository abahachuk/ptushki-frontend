import React, { FC } from "react";
import sn from "classnames";

import "./PageHeader.scss";

interface PageHeader {
  title: string;
  subtitle?: string;
  className?: string;
}

const blockName = "page-header";

export const PageHeader: FC<PageHeader> = ({ title, subtitle, className }) => (
  <div className={sn(blockName, className)}>
    <h1 className={`${blockName}__title`}>{title}</h1>
    <p className={`${blockName}__subtitle`}>{subtitle}</p>
  </div>
);
