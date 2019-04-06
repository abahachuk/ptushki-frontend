import React from "react";
import { Input, Label } from "reactstrap";
import { FormikProps, Field } from "formik";

import "./Checkbox.scss";

const blockName = "form-checkbox";
interface Props<
  TFormValues extends {},
  TFormikProps extends FormikProps<TFormValues> = FormikProps<TFormValues>
> {
  formikProps: TFormikProps;
  name: keyof TFormValues & string;
  label: string;
}

export const Checkbox = <TFormValues extends {}>({
  formikProps,
  name,
  label
}: Props<TFormValues>) => (
  <Label className={`${blockName}__label`} htmlFor={name}>
    <Input
      className={`${blockName}__input`}
      tag={Field}
      type="checkbox"
      name={name}
      id={name}
      checked={!!formikProps.values[name]}
    />
    <span className="label-text">{label}</span>
  </Label>
);
