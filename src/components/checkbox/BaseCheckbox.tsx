import * as React from "react";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import "./CheckboxField.scss";

export const checkboxClass = "checkbox";

export const baseCheckboxClasses = {
  root: `${checkboxClass}-root`,
  checked: `${checkboxClass}-checked`
};

export interface BaseCheckboxProps extends CheckboxProps {}

export const BaseCheckbox: typeof Checkbox = props => (
  <Checkbox
    classes={baseCheckboxClasses}
    className={checkboxClass}
    {...props}
  />
);
