import React, { FC } from "react";
import { Redirect, Route } from "react-router";

import { UserInfo } from "../auth/models";
import { securityService } from "../../../services";

export const ProtectedRoute: FC<{
  user: UserInfo;
  exact?: boolean;
  fallback: string;
  permissions: Array<string>;
  path: string;
  component: any;
}> = ({ permissions, fallback, user, ...props }) => {
  return securityService.checkPermissions(permissions, user) ? (
    <Route {...props} />
  ) : (
    <Redirect to={fallback} />
  );
};
