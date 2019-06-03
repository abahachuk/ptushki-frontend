import { connect } from "react-redux";
import { RootState } from "../../../store";
import { ProtectedNavItem } from "./ProtectedNavItem";

// TODO better be split into two components
//  one connected component decides whether to render it's content based on user info
//  other one is just nav link
export const ProtectedNavItemConnected = connect((state: RootState) => ({
  ...state.auth
}))(ProtectedNavItem);
