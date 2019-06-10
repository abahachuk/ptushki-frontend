import React, { FC } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { BaseCheckbox, BaseCheckboxProps, checkboxClass } from "./BaseCheckbox";
import "./CheckboxField.scss";

const labelClass = `${checkboxClass}-label`;

export const CheckboxField: FC<
  { label: string; className?: string } & BaseCheckboxProps
> = ({ label, className, ...props }) => (
  <FormControlLabel
    label={label}
    className={`${className || ""} ${labelClass}`}
    control={<BaseCheckbox {...props} />}
  />
);
