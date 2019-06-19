import { connect } from "react-redux";
import { RootState } from "../../../store";
import { CreatePage } from "./CreatePage";

export const CreatePageConnected = connect((state: RootState, ownProps) => ({
  initials: state.initialData,
  // @ts-ignore
  entity: ownProps.stateSelector(state)
}))(CreatePage);
