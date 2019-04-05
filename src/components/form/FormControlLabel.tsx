import React, { FC, ReactNode } from "react";
import { Label } from "reactstrap";

export interface FormControlLabelProps {
  name: string;
  label: ReactNode;
}

export const FormControlLabel: FC<FormControlLabelProps> = ({
  name,
  label
}) => <Label for={`formControl_${name}`}>{label}</Label>;
