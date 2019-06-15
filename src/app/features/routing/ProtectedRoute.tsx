import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { UserAction } from "../../../config/permissions";
import { CanConnected } from "../auth/CanConnected";
import { HOME, RouteDescription } from "./routes";

export const ProtectedRoute: FC<
  RouteDescription & RouteProps & { action?: UserAction; fallback?: string }
> = ({ scope, action = UserAction.observe, fallback = HOME, ...props }) => (
  <CanConnected I={action} a={scope} passThrough>
    {can => (can ? <Route {...props} /> : <Redirect to={fallback} />)}
  </CanConnected>
);
