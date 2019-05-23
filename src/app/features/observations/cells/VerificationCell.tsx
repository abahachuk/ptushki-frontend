import { IconButton } from "@material-ui/core";
import {
  AddCircle,
  Check,
  CheckCircle,
  Clear,
  RadioButtonChecked,
  RadioButtonUnchecked
} from "@material-ui/icons";
import React from "react";
import { connect, DispatchProp } from "react-redux";
import { setObservationVerificationStatus } from "../../../../store/actions/observationListActions";
import { ObservationData, VerificationStatus } from "../models";

export const VerificationCell = connect()(
  ({
    dispatch,
    observation
  }: DispatchProp & { observation: ObservationData }) => (
    <>
      {observation.verificationStatus === "Pending" ? (
        <IconButton className="p-0 mr-2 text-primary" disableRipple>
          <RadioButtonChecked />
        </IconButton>
      ) : (
        <IconButton
          className="p-0 mr-2"
          disableRipple
          onClick={() =>
            dispatch(
              setObservationVerificationStatus.request({
                id: observation.id,
                verificationStatus: VerificationStatus.Pending
              })
            )
          }
        >
          <RadioButtonUnchecked />
        </IconButton>
      )}

      {observation.verificationStatus === "Rejected" ? (
        <IconButton className="p-0 mr-2 text-danger" disableRipple>
          <AddCircle style={{ transform: "rotate(45deg)" }} />
        </IconButton>
      ) : (
        <IconButton
          className="p-0 mr-2"
          disableRipple
          onClick={() =>
            dispatch(
              setObservationVerificationStatus.request({
                id: observation.id,
                verificationStatus: VerificationStatus.Rejected
              })
            )
          }
        >
          <Clear />
        </IconButton>
      )}

      {observation.verificationStatus === "Verified" ? (
        <IconButton className="p-0 mr-2 text-success" disableRipple>
          <CheckCircle />
        </IconButton>
      ) : (
        <IconButton
          className="p-0 mr-2"
          disableRipple
          onClick={() =>
            dispatch(
              setObservationVerificationStatus.request({
                id: observation.id,
                verificationStatus: VerificationStatus.Verified
              })
            )
          }
        >
          <Check />
        </IconButton>
      )}
    </>
  )
);
