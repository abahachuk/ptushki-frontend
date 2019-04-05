import React, { FC } from "react";
import { Redirect, Route } from "react-router";
import { UserInfo } from "../auth/models";

export const ProtectedRoute: FC<{
  user: UserInfo;
  exact?: boolean;
  fallback: string;
  permissions: Array<string>;
  path: string;
  component: any;
}> = ({ permissions, fallback, user, ...props }) =>
  (!permissions.length && user) ||
  permissions.some(role => role === user.role) ? (
    <Redirect to={fallback} />
  ) : (
    <Route {...props} />
  );
