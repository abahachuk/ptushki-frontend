import React, { FC } from "react";
import { Redirect, Route } from "react-router";

import { UserInfo } from "../auth/models";
import { securityService } from "../../../services";

export const ProtectedRoute: FC<{
  user: UserInfo;
  isLoaded: boolean;
  exact?: boolean;
  fallback: string;
  permissions: Array<string>;
  path: string;
  component: any;
}> = ({ permissions, fallback, user, isLoaded, ...props }) => {
  if (!isLoaded) return null;

  return securityService.checkPermissions(permissions, user) ? (
    <Route {...props} />
  ) : (
    <Redirect to={fallback} />
  );
};
