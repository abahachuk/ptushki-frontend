import React, { ComponentProps, ReactNode } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { ErrorMessage, Field, FormikProps } from "formik";

interface Props<
  TFormValues extends {},
  TFormikProps extends FormikProps<TFormValues> = FormikProps<TFormValues>
> {
  formikProps: TFormikProps;
  name: keyof TFormValues & string;
  label: ReactNode;
  type?: ComponentProps<typeof Input>["type"];
  autoComplete?: ComponentProps<typeof Input>["autoComplete"];
}

export const FormControl = <TFormValues extends {}>({
  formikProps,
  name,
  label,
  type = "text",
  autoComplete
}: Props<TFormValues>) => (
  <FormGroup>
    <Label for={`formControl_${name}`}>{label}</Label>
    <Input
      type={type}
      name={name}
      tag={Field}
      id={`formControl_${name}`}
      invalid={!!(formikProps.touched[name] && formikProps.errors[name])}
      autoComplete={autoComplete}
    />
    <ErrorMessage name={name} component="div" className="invalid-feedback" />
  </FormGroup>
);
