import React from "react";
import { Clear, Done } from "@material-ui/icons";
import { Button, ButtonGroup } from "reactstrap";
import { connect, DispatchProp } from "react-redux";
import { TmpObservation } from "../../../../store/reducers/observationListReducer";
import { labels } from "../../../../config/i18n/labels";
import { verifyObservation } from "../../../../store/actions/observationListActions";

export const VerificationCell = connect()(
  ({ dispatch, observation }: DispatchProp & { observation: TmpObservation }) =>
    observation.verified ? (
      <span>{labels.yes}</span>
    ) : (
      <>
        <span className="pr-3">{labels.no}</span>
        <ButtonGroup size="sm" className="m-n2">
          <Button
            outline
            color="success"
            className="border-0 border-light border-right"
            onClick={() =>
              dispatch(
                verifyObservation({ id: observation.id, approved: true })
              )
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
              dispatch(
                verifyObservation({ id: observation.id, approved: false })
              )
            }
          >
            <Clear />
          </Button>
        </ButtonGroup>
      </>
    )
);
