import { connect } from "react-redux";
import { RootState } from "../../../store";
import { ProtectedNavItem } from "./ProtectedNavItem";

export const ProtectedNavItemConnected = connect((state: RootState) => ({
  ...state.auth
}))(ProtectedNavItem);
