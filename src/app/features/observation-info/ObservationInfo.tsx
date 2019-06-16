import React, { useState, useCallback } from "react";
import { Button } from "reactstrap";

import { CommonBird } from "../../../components/common-bird/CommonBird";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { IChangeValue } from "../../../components/autosuggest/Autosuggest";

import { birdData, formValues } from "../bird-info/test-data";

import { labels } from "../../../config/i18n/labels";

import {
  circumstancesConfig,
  observationConfig,
  birdConfig
} from "../add-observation/test.data";

import "./ObservationInfo.scss";

const blockName = "observation-info";

export const ObservationInfoForm = () => {
  const [form, setFormValues] = useState<FormValues>(formValues);
  const [bird, setBird] = useState(birdData.params);
  const [viewMode, changeMode] = useState(true);

  const onChangeValue = useCallback(
    ({ value, type }: IChangeValue) => {
      setFormValues({ ...form, [type]: value });
      console.log(form);
    },
    [form]
  );

  const onClickEdit = useCallback(() => changeMode(false), [changeMode]);

  return (
    <div className={blockName}>
      <div className={`${blockName}__header`}>
        <div className={`${blockName}__title-container`}>
          <h1 className={`${blockName}__title`}>
            {labels.observationInfo.title}
          </h1>
          <p className={`${blockName}__subtitle`}>
            {labels.observationInfo.subtitle}
          </p>
        </div>
        <Button className={`${blockName}__edit-btn`} onClick={onClickEdit}>
          {labels.observationInfo.edit}
        </Button>
      </div>
      <CommonBird
        birdConfig={birdConfig}
        circumstancesConfig={circumstancesConfig}
        observationConfig={observationConfig}
        onChangeBirdValues={setBird}
        birdParams={bird}
        onChangeFormValue={onChangeValue}
        formValues={form}
        viewMode={viewMode}
      />
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`}>
          {labels.observationInfo.back}
        </Button>
        <Button className={`${blockName}__edit-btn`} onClick={onClickEdit}>
          {labels.observationInfo.editObservation}
        </Button>
      </div>
    </div>
  );
};
