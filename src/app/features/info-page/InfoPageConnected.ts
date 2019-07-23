import { connect } from "react-redux";
import { RootState } from "../../../store";
import { InfoPage } from "./InfoPage";
import { InfoPageProps } from "./models";

export const InfoPageConnected = connect(
  (state: RootState, ownProps: InfoPageProps) => ({
    entity: ownProps.stateSelector(state)
  })
)(InfoPage);
