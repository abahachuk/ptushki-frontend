import React from "react";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { store } from "../store";
import { history } from "./features/routing/history";
import {
  ROUTE_OBSERVATIONS,
  ROUTE_RESET_PASSWORD,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP
} from "./features/routing/routes";
import { RootNavConnected } from "./features/nav/RootNavConnected";
import { SignUpFormConnected } from "./features/auth/signup/SignUpFormConnected";
import { SignInFormConnected } from "./features/auth/signin/SignInFormConnected";
import { ResetPasswordFormConnected } from "./features/auth/resetpassword/ResetPasswordFormConnected";
import { ProtectedRouteConnected } from "./features/routing/ProtectedRouteConnected";
import "./App.scss";
import { ObservationsPage } from "./features/observations/ObservationsPage";

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
          <ProtectedRouteConnected
            exact
            {...ROUTE_OBSERVATIONS}
            component={ObservationsPage}
          />
        </Switch>
      </Container>
    </ConnectedRouter>
  </Provider>
);
