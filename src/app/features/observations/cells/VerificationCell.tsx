import { Clear, Done } from "@material-ui/icons";
import React from "react";
import { connect, DispatchProp } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";
import { verifyObservation } from "../../../../store/actions/observationListActions";
import { TmpObservation } from "../../../../store/reducers/observationListReducer";

export const VerificationCell = connect()(
  ({ dispatch, observation }: DispatchProp & { observation: TmpObservation }) =>
    !observation.verified && (
      <ButtonGroup size="sm" className="m-n2">
        <Button
          outline
          color="success"
          className="border-0 border-light border-right"
          onClick={() =>
            dispatch(verifyObservation({ id: observation.id, approved: true }))
          }
        >
          <Done />
        </Button>
        <div className="border-right" />
        <Button
          outline
          color="danger"
          className="border-0"
          onClick={() =>
            dispatch(verifyObservation({ id: observation.id, approved: false }))
          }
        >
          <Clear />
        </Button>
      </ButtonGroup>
    )
);
