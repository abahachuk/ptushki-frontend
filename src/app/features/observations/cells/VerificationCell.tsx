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
  }: DispatchProp & { observation: ObservationData }) => {
    const { id, verificationStatus } = observation;
    const { Pending, Verified, Rejected } = VerificationStatus;

    return (
      <>
        {verificationStatus === Pending ? (
          <IconButton className="p-0 mr-2 text-primary" disableRipple>
            <RadioButtonChecked />
          </IconButton>
        ) : (
          <IconButton
            className="p-0 mr-2"
            disableRipple
            onClick={e => {
              e.stopPropagation();
              dispatch(
                setObservationVerificationStatus.request({
                  id,
                  verificationStatus: Pending
                })
              );
            }}
          >
            <RadioButtonUnchecked />
          </IconButton>
        )}

        {verificationStatus === Rejected ? (
          <IconButton className="p-0 mr-2 text-danger" disableRipple>
            <AddCircle style={{ transform: "rotate(45deg)" }} />
          </IconButton>
        ) : (
          <IconButton
            className="p-0 mr-2"
            disableRipple
            onClick={e => {
              e.stopPropagation();
              dispatch(
                setObservationVerificationStatus.request({
                  id,
                  verificationStatus: Rejected
                })
              );
            }}
          >
            <Clear />
          </IconButton>
        )}

        {verificationStatus === Verified ? (
          <IconButton className="p-0 mr-2 text-success" disableRipple>
            <CheckCircle />
          </IconButton>
        ) : (
          <IconButton
            className="p-0 mr-2"
            disableRipple
            onClick={e => {
              e.stopPropagation();
              dispatch(
                setObservationVerificationStatus.request({
                  id,
                  verificationStatus: Verified
                })
              );
            }}
          >
            <Check />
          </IconButton>
        )}
      </>
    );
  }
);
