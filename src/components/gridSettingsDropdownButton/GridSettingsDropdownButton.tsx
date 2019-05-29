import { ArrowDropDown } from "@material-ui/icons";
import React, { FC } from "react";
import { Button, ButtonProps } from "reactstrap";

export const GridSettingsDropdownButton: FC<ButtonProps> = props => {
  const { children } = props;
  return (
    <Button
      outline
      size="sm"
      className="my-2 btn border-0 d-flex align-items-center text-dark bg-transparent shadow-none"
      {...props}
    >
      {children}
      <ArrowDropDown className="pl-1" />
    </Button>
  );
};
