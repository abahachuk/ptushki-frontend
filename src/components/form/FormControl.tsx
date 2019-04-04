import React, { ComponentProps, ReactNode } from "react";
import { FormGroup, Input, Label, Col, Row, NavLink } from "reactstrap";
import { NavLink as Link } from "react-router-dom";
import { ErrorMessage, Field, FormikProps } from "formik";

import "./FormControl.scss";

interface Props<
  TFormValues extends {},
  TFormikProps extends FormikProps<TFormValues> = FormikProps<TFormValues>
> {
  formikProps: TFormikProps;
  name: keyof TFormValues & string;
  label: ReactNode;
  type?: ComponentProps<typeof Input>["type"];
  link?: {
    label: string;
    url: string;
  } | null;
  placeholder?: string;
}

export const FormControl = <TFormValues extends {}>({
  formikProps,
  name,
  label,
  type = "text",
  link = null,
  placeholder
}: Props<TFormValues>) => (
  <FormGroup>
    <Row>
      <Col md={9}>
        <Label for={`formControl_${name}`}>{label}</Label>
      </Col>
      {!!link && (
        <Col md={3}>
          <NavLink tag={Link} to={link.url} className="form-control__link">
            {link.label}
          </NavLink>
        </Col>
      )}
    </Row>
    <Input
      type={type}
      name={name}
      tag={Field}
      id={`formControl_${name}`}
      invalid={!!(formikProps.touched[name] && formikProps.errors[name])}
      placeholder={placeholder}
    />
    <ErrorMessage name={name} component="div" className="invalid-feedback" />
  </FormGroup>
);
