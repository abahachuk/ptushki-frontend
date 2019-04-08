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
    <Layout title="Восстановление пароля">
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
              Мы вышлем письмо на Вашу почту со ссылкой, которая поможет Вам
              создать новый пароль
            </p>
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
              {isSuccess ? "Отправить ссылку еще раз" : "Отправить ссылку"}
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
