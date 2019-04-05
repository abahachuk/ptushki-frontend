import React, { FC } from "react";
import { Form, Formik } from "formik";
import { Button } from "reactstrap";
import { object, string } from "yup";
import { FormControl } from "../../../../components/form/FormControl";
import { ResetPasswordData } from "../models";

export const ResetPasswordForm: FC<{
  onSubmit(d: ResetPasswordData): void;
  error?: string;
  isPending: boolean;
  isSuccess: boolean;
}> = ({ onSubmit, error, isPending, isSuccess }) => (
  <Formik<ResetPasswordData>
    initialValues={{ email: "" }}
    validationSchema={object({
      email: string()
        .email()
        .required()
    })}
    onSubmit={onSubmit}
  >
    {formikProps => (
      <Form noValidate>
        <div hidden={isSuccess}>
          <FormControl
            label="Email"
            name="email"
            type="email"
            formikProps={formikProps}
            placeholder="user_name@mail.com"
          />
        </div>
        <Button block color="primary" type="submit" disabled={isPending}>
          {isSuccess ? "Send link again" : "Send link"}
        </Button>
        {error && <div className="text-danger">{error}</div>}
      </Form>
    )}
  </Formik>
);
