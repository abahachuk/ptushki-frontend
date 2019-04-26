import { connect } from "react-redux";

import { RootState } from "../../../store";
import { RootNav } from "./RootNav";
import { getUser } from "../../../store/actions/authActions";

export const RootNavConnected = connect(
  (state: RootState) => ({
    ...state.auth
  }),
  {
    getUser
  }
)(RootNav);
