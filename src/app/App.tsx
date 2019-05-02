import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import useMount from "react-use/esm/useMount";
import { history } from "./features/routing/history";
import {
  ROUTE_OBSERVATIONS,
  ROUTE_RESET_PASSWORD,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP
} from "./features/routing/routes";
import { RootNav } from "./features/nav/RootNav";
import { SignUpFormConnected } from "./features/auth/signup/SignUpFormConnected";
import { SignInFormConnected } from "./features/auth/signin/SignInFormConnected";
import { ResetPasswordFormConnected } from "./features/auth/resetpassword/ResetPasswordFormConnected";
import { ProtectedRouteConnected } from "./features/routing/ProtectedRouteConnected";
import { ObservationsPage } from "./features/observations/ObservationsPage";
import { UserInfo } from "./features/auth/models";

export const App: FC<{
  getUser: () => void;
  user: UserInfo;
  isLoaded: boolean;
}> = ({ getUser, user, isLoaded }) => {
  useMount(getUser);

  if (!isLoaded) return null;

  return (
    <ConnectedRouter history={history}>
      {user && <RootNav />}

      <Switch>
        <Route exact path="/">
          {user ? <div /> : <Redirect to={ROUTE_SIGN_IN.path} />}
        </Route>

        <ProtectedRouteConnected
          exact
          {...ROUTE_SIGN_UP}
          component={SignUpFormConnected}
        />
        <ProtectedRouteConnected
          exact
          {...ROUTE_SIGN_IN}
          component={SignInFormConnected}
        />
        <ProtectedRouteConnected
          exact
          {...ROUTE_RESET_PASSWORD}
          component={ResetPasswordFormConnected}
        />
        <ProtectedRouteConnected
          exact
          {...ROUTE_OBSERVATIONS}
          component={ObservationsPage}
        />
      </Switch>
    </ConnectedRouter>
  );
};
