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
import { Ability } from "@casl/ability";
import {
  ObservationData,
  VerificationStatus
} from "../../../app/features/observations/models";
import { setObservationVerificationStatus } from "../../../store/actions/observationListActions";
import { RootState } from "../../../store";
import { Scope, UserAction } from "../../../config/permissions";

export const VerificationCell = connect((state: RootState) => ({
  ability: state.auth.permissions
}))(
  ({
    dispatch,
    observation,
    ability
  }: DispatchProp & { observation: ObservationData; ability: Ability }) => {
    const { id, verificationStatus } = observation;
    const { Pending, Verified, Rejected } = VerificationStatus;
    const isDisabled = ability.cannot(UserAction.moderate, Scope.observations);

    return (
      <>
        {verificationStatus === Pending ? (
          <IconButton
            disabled={isDisabled}
            className="p-0 mr-2 text-primary"
            disableRipple
          >
            <RadioButtonChecked />
          </IconButton>
        ) : (
          <IconButton
            disabled={isDisabled}
            className="p-0 mr-2"
            disableRipple
            onClick={
              isDisabled
                ? undefined
                : e => {
                    e.stopPropagation();
                    dispatch(
                      setObservationVerificationStatus.request({
                        id,
                        verificationStatus: Pending
                      })
                    );
                  }
            }
          >
            <RadioButtonUnchecked />
          </IconButton>
        )}

        {verificationStatus === Rejected ? (
          <IconButton
            disabled={isDisabled}
            className="p-0 mr-2 text-danger"
            disableRipple
          >
            <AddCircle style={{ transform: "rotate(45deg)" }} />
          </IconButton>
        ) : (
          <IconButton
            className="p-0 mr-2"
            disableRipple
            disabled={isDisabled}
            onClick={
              isDisabled
                ? undefined
                : e => {
                    e.stopPropagation();
                    dispatch(
                      setObservationVerificationStatus.request({
                        id,
                        verificationStatus: Rejected
                      })
                    );
                  }
            }
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
            disabled={isDisabled}
            className="p-0 mr-2"
            disableRipple
            onClick={
              isDisabled
                ? undefined
                : e => {
                    e.stopPropagation();
                    dispatch(
                      setObservationVerificationStatus.request({
                        id,
                        verificationStatus: Verified
                      })
                    );
                  }
            }
          >
            <Check />
          </IconButton>
        )}
      </>
    );
  }
);
