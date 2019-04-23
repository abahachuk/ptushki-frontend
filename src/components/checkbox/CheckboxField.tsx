import React from "react";
import { Label } from "reactstrap";
import { Field, FormikProps } from "formik";
import { Checkbox } from "formik-material-ui";
import "./CheckboxField.scss";
import { baseCheckboxClasses } from "./BaseCheckbox";

interface Props<
  TFormValues extends {},
  TFormikProps extends FormikProps<TFormValues> = FormikProps<TFormValues>
> {
  formikProps: TFormikProps;
  name: keyof TFormValues & string;
  label: string;
}

export const CheckboxField = <TFormValues extends {}>({
  formikProps,
  name,
  label
}: Props<TFormValues>) => (
  <Label className="checkbox-label" htmlFor={name}>
    <Field
      className="p-0"
      component={Checkbox}
      name={name}
      id={name}
      checked={!!formikProps.values[name]}
      classes={baseCheckboxClasses}
    />
    <span className="checkbox-label-text">{label}</span>
  </Label>
);
