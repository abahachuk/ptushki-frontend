import { connect } from "react-redux";

import { ObservationInfoForm } from "./ObservationInfo";

export { ObservationInfoForm } from "./ObservationInfo";

export const ObservationInfoFormConnected = connect(() => ({}))(
  ObservationInfoForm
);
