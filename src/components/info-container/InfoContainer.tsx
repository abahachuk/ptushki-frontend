import React, { FC, ReactNode } from "react";
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
    <div
      className={sn(
        `${blockName}__header-container`,
        renderButton && `${blockName}__header-container--with-btn`
      )}
    >
      <p className={`${blockName}__title`}>{title}</p>
      {renderButton}
    </div>
    {children}
  </div>
);
