import React, { FC } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button, Label, Input, FormGroup } from "reactstrap";
import { object, string, boolean } from "yup";
import { FormControl } from "../../../../components/form/FormControl";
import { Checkbox } from "../../../../components/checkbox/Checkbox";
import { SignInData } from "./SignInData";
import { FormControlLabel } from "../../../../components/form/FormControlLabel";
import { ROUTE_RESET_PASSWORD } from "../../routing/routes";

export const SignInForm: FC<{
  onSubmit(d: SignInData): void;
  error?: string;
}> = ({ onSubmit, error }) => (
  <Formik<SignInData>
    initialValues={{ email: "", password: "", rememberPassword: false }}
    validationSchema={object({
      email: string()
        .email()
        .required(),
      password: string().required(),
      rememberPassword: boolean()
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
          renderLabel={labelProps => (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormControlLabel {...labelProps} />
              <Link to={ROUTE_RESET_PASSWORD}>Forgot your password?</Link>
            </div>
          )}
          placeholder="Password"
        />
        <Checkbox
          label="Remember password"
          name="rememberPassword"
          formikProps={formikProps}
        />
        <Button
          block
          color="primary"
          type="submit"
          disabled={formikProps.isSubmitting}
        >
          Sign in
        </Button>
        <Button type="button" block outline color="primary">
          Register
        </Button>
        {error && <div className="text-danger">{error}</div>}
      </Form>
    )}
  </Formik>
);
