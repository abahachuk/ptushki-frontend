import { connect } from "react-redux";

import { ObservationInfoForm } from "./ObservationInfo";
import { RootState } from "../../../store";

export const ObservationInfoFormConnected = connect(
  (state: RootState, ownProps: any) => {
    return {};
  }
)(ObservationInfoForm);
