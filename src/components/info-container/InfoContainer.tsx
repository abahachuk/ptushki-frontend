import React, { FC, ReactNode } from "react";
import sn from "classnames";

import "./InfoContainer.scss";

const blockName = "info-container";

export const InfoContainer: FC<{
  title?: String;
  children: ReactNode;
  className?: string;
  renderButton?: ReactNode;
  renderHeader?: ReactNode;
}> = ({ renderHeader, children, className, renderButton }) => (
  <div className={sn(blockName, className)}>
    <div
      className={sn(
        `${blockName}__header-container`,
        renderButton && `${blockName}__header-container--with-btn`
      )}
    >
      {renderHeader}
      {renderButton}
    </div>
    <div
      className={sn(
        `${blockName}__content-container`,
        className && `${className}-content-container`
      )}
    >
      {children}
    </div>
  </div>
);
