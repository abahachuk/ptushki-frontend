import React, { FC, useState, useCallback } from "react";
import { Button } from "reactstrap";

import { CommonBird } from "../../../components/common-bird/CommonBird";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { IChangeValue } from "../../../components/autosuggest/Autosuggest";
import { ActionButton } from "../../../components/action-button/ActionButton";
import { BirdObservationsListConnected } from "./BirdObservationsList";

import { BirdInfo } from "./BirdInfoModel";
import { labels } from "../../../config/i18n/labels";

import {
  circumstancesConfig,
  observationConfig,
  birdConfig
} from "../add-observation/test.data";

import { birdData, formValues } from "./test-data";

import "./BirdInfo.scss";
import { Scope, UserAction } from "../../../config/permissions";
import { CanConnected } from "../auth/CanConnected";

const blockName = "bird-info";

export const BirdInfoForm: FC<{
  birdInfo: BirdInfo;
}> = () => {
  const [form, setFormValues] = useState<FormValues>(formValues);
  const [bird, setBird] = useState(birdData.params);

  const onChangeValue = useCallback(
    ({ value, type }: IChangeValue) =>
      setFormValues({ ...form, [type]: value }),
    [form]
  );

  return (
    <div className={blockName}>
      <div className={`${blockName}__header`}>
        <h1 className={`${blockName}__title`}>{birdData.name}</h1>
        <div className={`${blockName}__header-buttons`}>
          <ActionButton icon="edit" label={labels.birdInfo.edit} />
          <ActionButton icon="delete" label={labels.birdInfo.delete} />
          <CanConnected I={UserAction.export} a={Scope.observations}>
            <Button outline className={`${blockName}__btn`}>
              {labels.birdInfo.export}
            </Button>
          </CanConnected>
        </div>
      </div>
      <p className={`${blockName}__subtitle`}>{birdData.code}</p>
      <p className={`${blockName}__euring-title`}>{labels.birdInfo.euring}</p>
      <span className={`${blockName}__euring`}>{birdData.euring}</span>
      <CommonBird
        birdConfig={birdConfig}
        circumstancesConfig={circumstancesConfig}
        observationConfig={observationConfig}
        onChangeBirdValues={setBird}
        birdParams={bird}
        onChangeFormValue={onChangeValue}
        formValues={form}
        observationsLabels={{ title: labels.birdInfo.observationsTitle }}
        circumstancesLabels={{ title: labels.birdInfo.circumstancesTitle }}
        viewMode
      />
      <p className={`${blockName}__obs-history-title`}>
        {labels.birdInfo.observationsHistory}
      </p>
      <BirdObservationsListConnected />
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`}>
          {labels.birdInfo.back}
        </Button>
        <Button className={`${blockName}__edit-btn`}>
          {labels.birdInfo.edit}
        </Button>
      </div>
    </div>
  );
};
