import * as React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "./CheckboxField.scss";

export const baseCheckboxClasses = {
  root: "checkbox-root",
  checked: "checkbox-checked"
};

export const BaseCheckbox: typeof Checkbox = props => (
  <Checkbox classes={baseCheckboxClasses} {...props} />
);
