import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { UserAction } from "../../../config/permissions";
import { CanConnected } from "../auth/CanConnected";
import { HOME, RouteDescription } from "./routes";

export const ProtectedRoute: FC<RouteDescription & RouteProps> = ({
  scope,
  ...props
}) => (
  // @ts-ignore
  <CanConnected I={UserAction.observe} a={scope} passThrough>
    {(can: any) => (can ? <Route {...props} /> : <Redirect to={HOME} />)}
  </CanConnected>
);
