import React, { FC, ReactNode } from "react";
import { Label } from "reactstrap";

import "./FormControl.scss";

export interface FormControlLabelProps {
  blockName: string;
  name: string;
  label: ReactNode;
}

export const FormControlLabel: FC<FormControlLabelProps> = ({
  blockName,
  name,
  label
}) => (
  <Label className={`${blockName}__label`} for={`${blockName}__${name}`}>
    {label}
  </Label>
);
