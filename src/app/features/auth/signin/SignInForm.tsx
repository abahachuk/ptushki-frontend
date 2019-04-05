import React, { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { boolean, object, string } from "yup";
import { FormControl } from "../../../../components/form/FormControl";
import { Checkbox } from "../../../../components/checkbox/Checkbox";
import { SignInData } from "../models";
import { FormControlLabel } from "../../../../components/form/FormControlLabel";
import { ROUTE_RESET_PASSWORD, ROUTE_SIGN_UP } from "../../routing/routes";

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
    <Formik<SignInData>
      initialValues={{ email: "", password: "", rememberPassword: true }}
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
                <Link to={ROUTE_RESET_PASSWORD.path}>
                  Forgot your password?
                </Link>
              </div>
            )}
            placeholder="Password"
          />
          <Checkbox
            label="Remember password"
            name="rememberPassword"
            formikProps={formikProps}
          />
          <Button block color="primary" type="submit" disabled={isPending}>
            Sign in
          </Button>
          <Button
            tag={Link}
            to={ROUTE_SIGN_UP.path}
            block
            outline
            color="primary"
            disabled={isPending}
          >
            Register
          </Button>
          {error && <div className="text-danger">{error}</div>}
        </Form>
      )}
    </Formik>
  );
};
