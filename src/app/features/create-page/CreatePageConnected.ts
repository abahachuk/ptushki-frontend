import { connect } from "react-redux";
import { RootState } from "../../../store";
import { CreatePage } from "./CreatePage";

export const CreatePageConnected = connect((state: RootState) => ({
  initials: state.initialData
}))(CreatePage);
