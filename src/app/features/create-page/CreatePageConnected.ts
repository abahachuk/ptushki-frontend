import { connect } from "react-redux";
import { RootState } from "../../../store";
import { CreatePage } from "./CreatePage";
import { CreatePageProps } from "./models";

export const CreatePageConnected = connect(
  (state: RootState, ownProps: CreatePageProps) => ({
    initials: state.initialData,
    entity: ownProps.stateSelector(state)
  })
)(CreatePage);
