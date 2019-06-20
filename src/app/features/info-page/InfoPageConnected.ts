import { connect } from "react-redux";
import { RootState } from "../../../store";
import { InfoPage } from "./InfoPage";

export const InfoPageConnected = connect((state: RootState, ownProps) => ({
  // @ts-ignore
  entity: ownProps.stateSelector(state)
}))(InfoPage);
