import React from "react";
import { Clear, Done } from "@material-ui/icons";
import { Button, ButtonGroup } from "reactstrap";
import { connect, DispatchProp } from "react-redux";
import { TmpObservation } from "../../../../store/reducers/observationListReducer";
import { labels } from "../../../../config/i18n/labels";

export const VerificationCell = connect()(
  ({
    dispatch,
    observation
  }: DispatchProp & { observation: TmpObservation }) => (
    <span>
      {observation.verified ? (
        labels.yes
      ) : (
        <span>
          {labels.no}{" "}
          <ButtonGroup size="sm">
            <Button outline color="success" className="border-0">
              <>
                <Done />
              </>
            </Button>
            <Button outline color="danger" className="border-0">
              <>
                <Clear />
              </>
            </Button>
          </ButtonGroup>
        </span>
      )}
    </span>
  )
);
