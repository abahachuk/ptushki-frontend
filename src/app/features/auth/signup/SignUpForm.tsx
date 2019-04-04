import React, { FC } from "react";
import { Form, Formik } from "formik";
import { Button, Col, FormGroup, Input, Row, Label } from "reactstrap";
import { object, string } from "yup";
import { FormControl } from "../../../../components/form/FormControl";
import { SignUpData } from "./SignUpData";

export const SignUpForm: FC<{
  onSubmit(d: SignUpData): void;
  error?: string;
}> = ({ onSubmit, error }) => (
  <Formik<SignUpData>
    initialValues={{
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      rememberPassword: false
    }}
    validationSchema={object({
      email: string()
        .email()
        .required(),
      password: string().required(),
      firstName: string().required(),
      lastName: string().required()
    })}
    onSubmit={onSubmit}
  >
    {formikProps => (
      <Form noValidate>
        <Row>
          <Col md={6}>
            <FormControl
              label="First name"
              name="firstName"
              autoComplete="given-name"
              formikProps={formikProps}
            />
          </Col>

          <Col md={6}>
            <FormControl
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              formikProps={formikProps}
            />
          </Col>
        </Row>
        <FormControl
          label="Email"
          name="email"
          type="email"
          autoComplete="username email"
          formikProps={formikProps}
        />
        <FormControl
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          formikProps={formikProps}
        />
        {/* TODO replace with new checkbox input when available to apply design and bind to formik data */}
        <FormGroup check>
          <Input
            type="checkbox"
            name="rememberPassword"
            id="rememberPassword"
          />
          <Label for="rememberPassword" check>
            Remember password
          </Label>
        </FormGroup>
        <Button
          block
          color="primary"
          type="submit"
          disabled={formikProps.isSubmitting}
        >
          Sign up
        </Button>
        {error && <div className="text-danger">{error}</div>}
      </Form>
    )}
  </Formik>
);
