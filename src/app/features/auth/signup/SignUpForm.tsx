import React, { FC } from "react";
import { Form, Formik } from "formik";
import { Button, Col, Row } from "reactstrap";
import { object, string } from "yup";
import { FormControl } from "../../../../components/form/FormControl";
import { SignUpData } from "./SignUpData";

export const SignUpForm: FC<{
  onSubmit(d: SignUpData): void;
  error?: string;
}> = ({ onSubmit, error }) => (
  <Formik<SignUpData>
    initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
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
              formikProps={formikProps}
            />
          </Col>

          <Col md={6}>
            <FormControl
              label="Last name"
              name="lastName"
              formikProps={formikProps}
            />
          </Col>
        </Row>
        <FormControl
          label="Email"
          name="email"
          type="email"
          formikProps={formikProps}
        />
        <FormControl
          label="Password"
          name="password"
          type="password"
          formikProps={formikProps}
        />
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
