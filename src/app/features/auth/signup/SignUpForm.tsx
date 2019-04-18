import React, { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FormControl } from "../../../../components/form/FormControl";
import { SignUpData } from "../models";
import { Checkbox } from "../../../../components/checkbox/Checkbox";
import { ROUTE_SIGN_IN } from "../../routing/routes";
import { Layout } from "../../../../components/layout/Layout";
import {
  booleanSchema,
  objectSchema,
  stringSchema
} from "../../../../utils/form/localisedYup";
import { labels } from "../../../../config/i18n/labels";

const blockName = "signup-form";

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
    <Layout title={labels.signUp.title}>
      <Formik<SignUpData>
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          rememberPassword: true
        }}
        validationSchema={objectSchema().shape({
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
            <Checkbox
              formikProps={formikProps}
              name="rememberPassword"
              label={labels.signUp.rememberPassword}
            />
            <Button
              className="mt-3"
              block
              color="primary"
              type="submit"
              disabled={isPending}
            >
              {labels.signUp.title}
            </Button>

            {error && (
              <div className={`${blockName}__error text-danger`}>{error}</div>
            )}

            <div className="mt-2">
              {labels.signUp.alreadyHavePassword}{" "}
              <Link to={ROUTE_SIGN_IN.path}>{labels.signIn.title}</Link>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
