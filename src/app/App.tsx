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

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootNavConnected />

      <Container>
        <Switch>
          <Route exact path="/">
            [Landing here]
          </Route>

          <Route exact path={ROUTE_SIGN_UP}>
            <SignUpFormConnected />
          </Route>

          <Route exact path={ROUTE_SIGN_IN}>
            <SignInFormConnected />
          </Route>

          <Route exact path={ROUTE_RESET_PASSWORD}>
            <ResetPasswordFormConnected />
          </Route>
        </Switch>
      </Container>
    </ConnectedRouter>
  </Provider>
);
