import React, { FC } from "react";
import { Form, Formik } from "formik";
import { Button } from "reactstrap";
import { object, string } from "yup";
import { FormControl } from "../../../../components/form/FormControl";
import { ResetPasswordData } from "./ResetPasswordData";

export const ResetPasswordForm: FC<{
  onSubmit(d: ResetPasswordData): void;
  error?: string;
}> = ({ onSubmit, error }) => (
  <Formik<ResetPasswordData>
    initialValues={{ email: "", password: "" }}
    validationSchema={object({
      email: string()
        .email()
        .required()
    })}
    onSubmit={onSubmit}
  >
    {formikProps => (
      <Form noValidate>
        <FormControl
          label="Email"
          name="email"
          type="email"
          formikProps={formikProps}
          placeholder="user_name@mail.com"
        />
        <Button
          block
          color="primary"
          type="submit"
          disabled={formikProps.isSubmitting}
        >
          Send Link
        </Button>
        {error && <div className="text-danger">{error}</div>}
      </Form>
    )}
  </Formik>
);
