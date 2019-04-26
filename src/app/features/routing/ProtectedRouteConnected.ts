import { connect } from "react-redux";

import { RootState } from "../../../store";

import { ProtectedRoute } from "./ProtectedRoute";

export const ProtectedRouteConnected = connect((state: RootState) => ({
  ...state.auth
}))(ProtectedRoute);
