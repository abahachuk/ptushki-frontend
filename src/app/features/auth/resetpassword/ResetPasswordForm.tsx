import React, { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { Button } from "reactstrap";
import {
  objectSchema,
  stringSchema
} from "../../../../utils/form/localisedYup";
import { FormControl } from "../../../../components/form/FormControl";
import { ResetPasswordData } from "../models";
import { Layout } from "../../../../components/layout/Layout";

import "./ResetPassword.scss";
import { labels } from "../../../../config/i18n/labels";

const blockName = "reset-password";

export const ResetPasswordForm: FC<{
  onSubmit(d: ResetPasswordData): void;
  resetPasswordExit(): void;
  error?: string;
  isPending: boolean;
  isSuccess: boolean;
}> = ({ resetPasswordExit, onSubmit, error, isPending, isSuccess }) => {
  useEffect(() => {
    return () => {
      resetPasswordExit();
    };
  }, [resetPasswordExit]);

  return (
    <Layout title={labels.resetPassword.title}>
      <Formik<ResetPasswordData>
        initialValues={{ email: "" }}
        validationSchema={objectSchema().shape({
          email: stringSchema()
            .email()
            .required()
        })}
        onSubmit={onSubmit}
      >
        {formikProps => (
          <Form noValidate>
            <p className={`${blockName}__text`}>
              {labels.resetPassword.explanation}
            </p>
            <div hidden={isSuccess}>
              <FormControl
                label={labels.form.email.label}
                name="email"
                type="email"
                formikProps={formikProps}
                placeholder={labels.form.email.placeholder}
              />
            </div>
            <Button block color="primary" type="submit" disabled={isPending}>
              {isSuccess
                ? labels.resetPassword.sendLinkAgain
                : labels.resetPassword.sendLink}
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
