import { connect } from "react-redux";

import { getUser } from "../store/actions/authActions";
import { App } from "./App";
import { RootState } from "../store";

export const AppConnected = connect(
  (state: RootState) => ({
    ...state.auth
  }),
  {
    getUser
  }
)(App);
