import React, { FC, ReactNode } from "react";
import { Button } from "reactstrap";
import sn from "classnames";

import "./InfoContainer.scss";

const blockName = "info-container";

export const InfoContainer: FC<{
  title: String;
  children: ReactNode;
  className?: string;
  renderButton?: ReactNode;
}> = ({ title, children, className, renderButton }) => (
  <div className={sn(blockName, className)}>
    <div className={`${blockName}__header-container`}>
      <p className={`${blockName}__title`}>{title}</p>
      {renderButton}
    </div>
    {children}
  </div>
);
