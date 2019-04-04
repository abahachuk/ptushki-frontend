import React, { FC } from "react";
import { Form, Formik } from "formik";
import { Button, Label, Input, FormGroup } from "reactstrap";
import { object, string } from "yup";
import { FormControl } from "../../../../components/form/FormControl";
import { SignInData } from "./SignInData";

import "./SignInForm.scss";
import { ROUTES } from "../../routing/routes";

export const SignInForm: FC<{
  onSubmit(d: SignInData): void;
  error?: string;
}> = ({ onSubmit, error }) => (
  <Formik<SignInData>
    initialValues={{ email: "", password: "" }}
    validationSchema={object({
      email: string()
        .email()
        .required(),
      password: string().required()
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
        <FormControl
          label="Password"
          name="password"
          type="password"
          formikProps={formikProps}
          link={{
            label: "Forgot your password?",
            url: ROUTES.resetPassword
          }}
          placeholder="******"
        />
        <FormGroup check inline>
          <Input type="checkbox" name="check" id="remember" />
          <Label for="remember" check>
            Remember password
          </Label>
        </FormGroup>
        <Button
          block
          color="primary"
          type="submit"
          disabled={formikProps.isSubmitting}
        >
          Sign in
        </Button>
        <Button
          block
          outline
          color="primary"
          className="sign-in-form__register-button"
        >
          Register
        </Button>
        {error && <div className="text-danger">{error}</div>}
      </Form>
    )}
  </Formik>
);
