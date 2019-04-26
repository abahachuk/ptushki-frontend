import { connect } from "react-redux";

import { getUser } from "../store/actions/authActions";
import { App } from "./App";

export const AppConnected = connect(
  () => ({}),
  {
    getUser
  }
)(App);
