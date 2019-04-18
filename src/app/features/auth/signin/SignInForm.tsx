import React, { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { FormControl } from "../../../../components/form/FormControl";
import { CheckboxField } from "../../../../components/checkbox/CheckboxField";
import { SignInData } from "../models";
import { FormControlLabel } from "../../../../components/form/FormControlLabel";
import { ROUTE_RESET_PASSWORD, ROUTE_SIGN_UP } from "../../routing/routes";
import { Layout } from "../../../../components/layout/Layout";

import "./SignInForm.scss";
import {
  booleanSchema,
  objectSchema,
  stringSchema
} from "../../../../utils/form/localisedYup";
import { labels } from "../../../../config/i18n/labels";

const blockName = "signin-form";

export const SignInForm: FC<{
  onSubmit(d: SignInData): void;
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
    <Layout title={labels.signIn.title}>
      <Formik<SignInData>
        initialValues={{ email: "", password: "", rememberPassword: true }}
        validationSchema={objectSchema().shape({
          email: stringSchema()
            .email()
            .required(),
          password: stringSchema().required(),
          rememberPassword: booleanSchema()
        })}
        onSubmit={onSubmit}
      >
        {formikProps => (
          <Form noValidate>
            <FormControl
              label={labels.form.email.label}
              name="email"
              type="email"
              formikProps={formikProps}
              placeholder={labels.form.email.placeholder}
            />
            <FormControl
              label={labels.form.password.label}
              name="password"
              type="password"
              formikProps={formikProps}
              renderLabel={labelProps => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FormControlLabel {...labelProps} />
                  <Link
                    className={`${blockName}__link`}
                    to={ROUTE_RESET_PASSWORD.path}
                  >
                    {labels.signIn.forgotPassword}
                  </Link>
                </div>
              )}
              placeholder={labels.form.password.placeholder}
            />
            <CheckboxField
              label={labels.signIn.rememberPassword}
              name="rememberPassword"
              formikProps={formikProps}
            />
            <Button block color="primary" type="submit" disabled={isPending}>
              {labels.signIn.title}
            </Button>
            <Button
              tag={Link}
              to={ROUTE_SIGN_UP.path}
              block
              outline
              color="primary"
              disabled={isPending}
            >
              {labels.signUp.title}
            </Button>
            {error && (
              <div className={`${blockName}__error text-danger`}>{error}</div>
            )}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
