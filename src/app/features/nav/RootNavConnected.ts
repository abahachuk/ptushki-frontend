import { connect } from "react-redux";
import { RootState } from "../../../store";
import { RootNav } from "./RootNav";

export const RootNavConnected = connect((state: RootState) => ({
  ...state.auth
}))(RootNav);
