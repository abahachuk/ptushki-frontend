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
    <Layout title="Регистрация">
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
                  label="Имя"
                  name="firstName"
                  autoComplete="given-name"
                  formikProps={formikProps}
                  placeholder="Введите имя"
                />
              </Col>

              <Col md={6}>
                <FormControl
                  label="Фамилия"
                  name="lastName"
                  autoComplete="family-name"
                  formikProps={formikProps}
                  placeholder="Введите фамилию"
                />
              </Col>
            </Row>
            <FormControl
              label="Email"
              name="email"
              type="email"
              autoComplete="username email"
              formikProps={formikProps}
              placeholder="user_name@mail.com"
            />
            <FormControl
              label="Пароль"
              name="password"
              type="password"
              autoComplete="new-password"
              formikProps={formikProps}
              placeholder="Придумайте пароль"
            />
            <Checkbox
              formikProps={formikProps}
              name="rememberPassword"
              label="Сохранить пароль"
            />
            <Button
              className="mt-3"
              block
              color="primary"
              type="submit"
              disabled={isPending}
            >
              Регистрация
            </Button>

            {error && (
              <div className={`${blockName}__error text-danger`}>{error}</div>
            )}

            <div className="mt-2">
              У вас уже есть пароль? <Link to={ROUTE_SIGN_IN.path}>Войти</Link>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
