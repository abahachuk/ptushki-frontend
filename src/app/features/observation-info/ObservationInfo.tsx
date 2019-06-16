import React, { useState, useCallback } from "react";
import { Button } from "reactstrap";

import { CommonBird } from "../../../components/common-bird/CommonBird";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { IChangeValue } from "../../../components/autosuggest/Autosuggest";
import { PageHeader } from "../../../components/page-header/PageHeader";
import { ActionButton } from "../../../components/action-button/ActionButton";

import { birdData, formValues } from "../bird-info/test-data";

import { labels } from "../../../config/i18n/labels";

import {
  circumstancesConfig,
  observationConfig,
  birdConfig
} from "../add-observation/test.data";

import "./ObservationInfo.scss";

const OBSERVATION_LABELS = {
  title: labels.observationInfo.observations
};

const CIRCUMSTANCES_LABELS = {
  title: labels.observationInfo.circumstances
};

const blockName = "observation-info";

export const ObservationInfoForm = () => {
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
        <PageHeader
          title={labels.observationInfo.title}
          subtitle={labels.observationInfo.subtitle}
          className={`${blockName}__page-header`}
        />
        <div className={`${blockName}__header-buttons`}>
          <ActionButton icon="edit" label={labels.observationInfo.edit} />
          <ActionButton icon="delete" label={labels.observationInfo.delete} />
        </div>
      </div>
      <CommonBird
        birdConfig={birdConfig}
        circumstancesConfig={circumstancesConfig}
        observationConfig={observationConfig}
        onChangeBirdValues={setBird}
        birdParams={bird}
        onChangeFormValue={onChangeValue}
        formValues={form}
        viewMode
        observationsLabels={OBSERVATION_LABELS}
        circumstancesLabels={CIRCUMSTANCES_LABELS}
      />
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`}>
          {labels.observationInfo.back}
        </Button>
        <Button className={`${blockName}__edit-btn`}>
          {labels.observationInfo.editObservation}
        </Button>
      </div>
    </div>
  );
};
