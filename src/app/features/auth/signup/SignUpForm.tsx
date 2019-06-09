import React, { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import { AuthFormLayout } from "../../../../components/layout/AuthFormLayout";
import { FormControl } from "../../../../components/form/FormControl";
import { SignUpData } from "../models";
import { CheckboxField } from "../../../../components/checkbox/CheckboxField";
import { ROUTE_SIGN_IN } from "../../routing/routes";
import {
  booleanSchema,
  objectSchema,
  stringSchema
} from "../../../../utils/form/localisedYup";
import { labels } from "../../../../config/i18n/labels";

export const SignUpForm: FC<{
  onSubmit(d: SignUpData): void;
  authExit(): void;
  error?: string;
  isPending: boolean;
}> = ({ authExit, onSubmit, error, isPending }) => {
  useEffect(() => {
    return () => {
      authExit();
    };
  }, [authExit]);

  return (
    <AuthFormLayout title={labels.signUp.title}>
      <Formik<SignUpData>
        initialValues={{
          phone: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          rememberPassword: true
        }}
        validationSchema={objectSchema().shape({
          phone: stringSchema().required(),
          email: stringSchema()
            .email()
            .required(),
          password: stringSchema().required(),
          firstName: stringSchema().required(),
          lastName: stringSchema().required(),
          rememberPassword: booleanSchema()
        })}
        onSubmit={onSubmit}
      >
        {formikProps => (
          <Form noValidate>
            <Row>
              <Col md={6}>
                <FormControl
                  label={labels.form.firstName.label}
                  name="firstName"
                  autoComplete="given-name"
                  formikProps={formikProps}
                  placeholder={labels.form.firstName.placeholder}
                />
              </Col>

              <Col md={6}>
                <FormControl
                  label={labels.form.lastName.label}
                  name="lastName"
                  autoComplete="family-name"
                  formikProps={formikProps}
                  placeholder={labels.form.lastName.placeholder}
                />
              </Col>
            </Row>
            <FormControl
              label={labels.form.phone.label}
              name="phone"
              autoComplete="username phone"
              formikProps={formikProps}
              placeholder={labels.form.phone.placeholder}
            />
            <FormControl
              label={labels.form.email.label}
              name="email"
              type="email"
              autoComplete="username email"
              formikProps={formikProps}
              placeholder={labels.form.email.placeholder}
            />
            <FormControl
              label={labels.form.password.label}
              name="password"
              type="password"
              autoComplete="new-password"
              formikProps={formikProps}
              placeholder={labels.form.password.newPasswordPlaceholder}
            />
            <CheckboxField
              formikProps={formikProps}
              name="rememberPassword"
              label={labels.signUp.rememberPassword}
            />
            <Button
              className="mt-3 button primary-button"
              size="sm"
              block
              type="submit"
              disabled={isPending}
            >
              {labels.signUp.title}
            </Button>

            {error && <div className="error text-danger">{error}</div>}

            <div className="form-text-content mt-2">
              {labels.signUp.alreadyHavePassword}{" "}
              <Link to={ROUTE_SIGN_IN.path}>{labels.signIn.title}</Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthFormLayout>
  );
};
