import React, { ButtonHTMLAttributes, FC } from "react";
import { Button, ButtonGroup } from "reactstrap";

import "./TabsGroup.scss";

const blockName = "tabs-group";

interface ICustomTabsGroup {
  className?: string;
}

export const TabsGroup: FC<ICustomTabsGroup> = ({
  className = "",
  children,
  ...restProps
}) => (
  <ButtonGroup className={`${blockName} ${className}`}>{children}</ButtonGroup>
);
