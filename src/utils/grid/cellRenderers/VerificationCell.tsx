import { Ability } from "@casl/ability";
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
import {
  ObservationData,
  VerificationStatus
} from "../../../app/features/observations/models";
import { Scope, UserAction } from "../../../config/permissions";
import { RootState } from "../../../store";
import { setObservationVerificationStatus } from "../../../store/actions/verificationActions";
import "./VerificationCell.scss";

// actions emitted through dispatch provided by connect are not passed to redux-observable.
// probably a bug in redux-subspace observable.
// TODO investigate. and replace those strange fragments
// import("../../../store").then(({ store }) => {
//   store.dispatch
// });

export const VerificationCell = connect((state: RootState) => ({
  ability: state.auth.permissions
}))(
  ({
    dispatch,
    observation,
    ability
  }: DispatchProp & { observation: ObservationData; ability: Ability }) => {
    const { id, verified } = observation;
    const { pending, approved, rejected } = VerificationStatus;
    const isDisabled = ability.cannot(UserAction.moderate, Scope.observations);

    return (
      <>
        {verified === pending ? (
          <IconButton
            disabled={isDisabled}
            className="p-0 mr-2 verification-pending"
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
                    import("../../../store").then(({ store }) => {
                      store.dispatch(
                        setObservationVerificationStatus.request({
                          id,
                          status: pending
                        })
                      );
                    });
                  }
            }
          >
            <RadioButtonUnchecked />
          </IconButton>
        )}

        {verified === rejected ? (
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
                    import("../../../store").then(({ store }) => {
                      store.dispatch(
                        setObservationVerificationStatus.request({
                          id,
                          status: rejected
                        })
                      );
                    });
                  }
            }
          >
            <Clear />
          </IconButton>
        )}

        {verified === approved ? (
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
                    import("../../../store").then(({ store }) => {
                      store.dispatch(
                        setObservationVerificationStatus.request({
                          id,
                          status: approved
                        })
                      );
                    });
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
