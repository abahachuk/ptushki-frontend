import React, { FC } from "react";
import { Form, Formik } from "formik";
import { Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { FormControl } from "../../../../components/form/FormControl";
import { SignUpData } from "./SignUpData";
import { Checkbox } from "../../../../components/checkbox/Checkbox";
import { ROUTE_SIGN_IN } from "../../routing/routes";

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
      rememberPassword: true
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
        <Checkbox
          formikProps={formikProps}
          name="rememberPassword"
          label="Remember password"
        />
        <Button
          className="mt-3"
          block
          color="primary"
          type="submit"
          disabled={formikProps.isSubmitting}
        >
          Sign up
        </Button>

        {error && <div className="text-danger">{error}</div>}

        <div className="mt-2">
          Already have a password? <Link to={ROUTE_SIGN_IN}>Sign in</Link>
        </div>
      </Form>
    )}
  </Formik>
);
