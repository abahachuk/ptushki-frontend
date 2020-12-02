import { ExpandMore, ExpandLess } from "@material-ui/icons";
import classNames from "classnames";
import React, { FC } from "react";
import { Button, ButtonProps } from "reactstrap";
import "./GridSettingsDropdownButton.scss";

export const GridSettingsDropdownButton: FC<ButtonProps> = props => {
  const { children, active, className } = props;
  return (
    <Button
      {...props}
      outline
      size="sm"
      className={classNames(className, "grid-settings-dropdown-btn")}
    >
      {children}
      {active ? (
        <ExpandLess className="pl-1" />
      ) : (
        <ExpandMore className="pl-1" />
      )}
    </Button>
  );
};
