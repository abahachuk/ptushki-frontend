import { IconButton } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import React from "react";
import { connect, DispatchProp } from "react-redux";
import { TmpObservation } from "../../../../store/reducers/observationListReducer";

export const VerificationCell = connect()(
  ({
    dispatch,
    observation
  }: DispatchProp & { observation: TmpObservation }) => (
    // TODO update api and wire up
    <>
      <IconButton className="p-0 mx-1 text-primary" disableRipple>
        <CheckCircle />
      </IconButton>
      <IconButton className="p-0 mx-1 text-danger" disableRipple>
        <CheckCircle />
      </IconButton>
      <IconButton className="p-0 mx-1 text-success" disableRipple>
        <CheckCircle />
      </IconButton>
    </>
  )
);
