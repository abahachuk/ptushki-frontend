import React from "react";
import "./App.scss";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { store } from "../store";
import { history } from "./features/routing/history";
import {
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_RESET_PASSWORD
} from "./features/routing/routes";
import { RootNavConnected } from "./features/nav/RootNavConnected";
import { SignUpFormConnected } from "./features/auth/signup/SignUpFormConnected";
import { SignInFormConnected } from "./features/auth/signin/SignInFormConnected";
import { ResetPasswordFormConnected } from "./features/auth/resetpassword/ResetPasswordFormConnected";
import { ProtectedRouteConnected } from "./features/routing/ProtectedRouteConnected";

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootNavConnected />

      <Container>
        <Switch>
          <Route exact path="/">
            [Landing here]
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
        </Switch>
      </Container>
    </ConnectedRouter>
  </Provider>
);
