import { ArrowDropDown } from "@material-ui/icons";
import React, { FC } from "react";
import { Button, ButtonProps } from "reactstrap";

export const GridSettingsDropdownButton: FC<ButtonProps> = p => (
  <Button
    outline
    size="sm"
    className="my-2 btn border-0 d-flex text-dark bg-transparent shadow-none"
    {...p}
  >
    {p.children}
    <ArrowDropDown className="pl-1" />
  </Button>
);
