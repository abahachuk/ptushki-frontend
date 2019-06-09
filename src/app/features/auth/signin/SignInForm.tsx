import React, { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { AuthFormLayout } from "../../../../components/layout/AuthFormLayout";
import { FormControl } from "../../../../components/form/FormControl";
import { CheckboxField } from "../../../../components/checkbox/CheckboxField";
import { FormControlLabel } from "../../../../components/form/FormControlLabel";
import { SignInData } from "../models";
import { ROUTE_RESET_PASSWORD, ROUTE_SIGN_UP } from "../../routing/routes";

import {
  booleanSchema,
  objectSchema,
  stringSchema
} from "../../../../utils/form/localisedYup";
import { labels } from "../../../../config/i18n/labels";

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
    <AuthFormLayout title={labels.signIn.title}>
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
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px"
                  }}
                >
                  <FormControlLabel {...labelProps} />
                  <Link
                    className="form-text-content"
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
            <Button
              block
              className="mt-3 button primary-button"
              type="submit"
              disabled={isPending}
            >
              {labels.signIn.title}
            </Button>
            <Button
              tag={Link}
              to={ROUTE_SIGN_UP.path}
              block
              outline
              className="mt-3 button"
              size="sm"
              disabled={isPending}
            >
              {labels.signUp.title}
            </Button>
            {error && <div className="error text-danger">{error}</div>}
          </Form>
        )}
      </Formik>
    </AuthFormLayout>
  );
};
