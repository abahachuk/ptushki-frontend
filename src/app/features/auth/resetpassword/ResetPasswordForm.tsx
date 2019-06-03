import React, { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { Button } from "reactstrap";

import { AuthFormLayout } from "../../../../components/layout/AuthFormLayout";
import { FormControl } from "../../../../components/form/FormControl";
import {
  objectSchema,
  stringSchema
} from "../../../../utils/form/localisedYup";
import { ResetPasswordData } from "../models";

import { labels } from "../../../../config/i18n/labels";

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
    <AuthFormLayout title={labels.resetPassword.title}>
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
            <p className="form-text-content mt-2">
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
            <Button
              block
              className="mt-3 button primary-button"
              type="submit"
              disabled={isPending}
            >
              {isSuccess
                ? labels.resetPassword.sendLinkAgain
                : labels.resetPassword.sendLink}
            </Button>
            {error && <div className="error text-danger">{error}</div>}
          </Form>
        )}
      </Formik>
    </AuthFormLayout>
  );
};
