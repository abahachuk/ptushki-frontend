import React, { useState, useCallback } from "react";
import { Button } from "reactstrap";

import {
  CommonBird,
  FormValues
} from "../../../components/common-bird/CommonBird";
import { IChangeValue } from "../../../components/autosuggest/Autosuggest";

import { labels } from "../../../config/i18n/labels";

import {
  circumstancesConfig,
  observationConfig,
  birdConfig
} from "../add-observation/test.data";

import "./CreateBird.scss";

const blockName = "create-bird";

export const CreateBirdForm = () => {
  const [form, setFormValues] = useState<FormValues>({
    species: "",
    sex: "",
    age: "",
    state: "",
    country: "",
    region: "",
    coordinates: "",
    timeError: "",
    comment: ""
  });
  const [bird, setBird] = useState({
    saddle: [],
    neck: [],
    leftWing: [],
    rightWing: [],
    leftBobbin: [],
    rightBobbin: [],
    leftLeg: [],
    rightLeg: []
  });

  const onChangeValue = useCallback(
    ({ value, type }: IChangeValue) => {
      setFormValues({ ...form, [type]: value });
      console.log(form);
    },
    [form]
  );

  const onSave = () => {};

  return (
    <div className={blockName}>
      <div className={`${blockName}__header`}>
        <div className={`${blockName}__title-container`}>
          <h1 className={`${blockName}__title`}>{labels.createBird.title}</h1>
          <p className={`${blockName}__subtitle`}>
            {labels.createBird.subtitle}
          </p>
        </div>
        <Button className={`${blockName}__save-btn`}>
          {labels.createBird.saveBird}
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
      />
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`}>
          {labels.createBird.back}
        </Button>
        <Button className={`${blockName}__save-btn`} onClick={onSave}>
          {labels.createBird.saveBird}
        </Button>
      </div>
    </div>
  );
};
