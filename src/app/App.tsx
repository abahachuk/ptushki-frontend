import React from "react";
import "./App.scss";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { store } from "../store";
import { history } from "./features/routing/history";
import { ROUTES } from "./features/routing/routes";
import { RootNav } from "./features/nav/RootNav";

import { SignInFormConnected } from "./features/auth/signin/SignInFormConnected";
import { ResetPasswordFormConnected } from "./features/auth/resetpassword/ResetPasswordFormConnected";

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootNav />

      <Container>
        <Switch>
          <Route exact path="/">
            [Landing here]
          </Route>

          <Route exact path={ROUTES.signUp}>
            [Sign up page here]
          </Route>

          <Route exact path={ROUTES.signIn}>
            <SignInFormConnected />
          </Route>

          <Route exact path={ROUTES.resetPassword}>
            <ResetPasswordFormConnected />
          </Route>
        </Switch>
      </Container>
    </ConnectedRouter>
  </Provider>
);
