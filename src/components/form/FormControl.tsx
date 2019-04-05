import React, { ComponentProps, FC, ReactNode } from "react";
import { FormGroup, Input, Label, Col, Row, NavLink } from "reactstrap";
import { NavLink as Link } from "react-router-dom";
import { ErrorMessage, Field, FormikProps } from "formik";
import { FormControlLabel, FormControlLabelProps } from "./FormControlLabel";

import "./FormControl.scss";

interface Props<
  TFormValues extends {},
  TFormikProps extends FormikProps<TFormValues> = FormikProps<TFormValues>
> {
  formikProps: TFormikProps;
  name: keyof TFormValues & string;
  label: ReactNode;
  type?: ComponentProps<typeof Input>["type"];
  placeholder?: string;
  autoComplete?: ComponentProps<typeof Input>["autoComplete"];
  renderLabel?: FC<FormControlLabelProps>;
}

export const FormControl = <TFormValues extends {}>({
  formikProps,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  renderLabel = FormControlLabel
}: Props<TFormValues>) => (
  <FormGroup>
    {renderLabel({ name, label })}
    <Input
      type={type}
      name={name}
      tag={Field}
      id={`formControl_${name}`}
      invalid={!!(formikProps.touched[name] && formikProps.errors[name])}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
    <ErrorMessage name={name} component="div" className="invalid-feedback" />
  </FormGroup>
);