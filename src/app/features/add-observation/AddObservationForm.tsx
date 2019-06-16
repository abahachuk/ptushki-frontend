import React, { useState, useCallback } from "react";
import { Button } from "reactstrap";

import {
  Autosuggest,
  IAutosuggest,
  IChangeValue
} from "../../../components/autosuggest/Autosuggest";

import {
  circumstancesConfig,
  observationConfig,
  birdConfig
} from "./test.data";

import { labels } from "../../../config/i18n/labels";

import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { CommonBird } from "../../../components/common-bird/CommonBird";

import "./AddObservation.scss";

const blockName = "add-observation";

interface BlockHeader {
  title: string;
  subtitle: string;
}

interface Field extends IAutosuggest {
  label: string;
}

const BlockHeader = function({ title, subtitle }: BlockHeader) {
  return (
    <div className={`${blockName}__block-header-container`}>
      <p className={`${blockName}__block-header-title`}>{title}</p>
      <p className={`${blockName}__block-header-subtitle`}>{subtitle}</p>
    </div>
  );
};

const Field = function({ label, ...props }: Field) {
  return (
    <div className={`${blockName}__field-container`}>
      <p className={`${blockName}__field-label`}>{label}</p>
      <Autosuggest {...props} />
    </div>
  );
};

export const AddObservation = () => {
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

  return (
    <div className={blockName}>
      <h1 className={`${blockName}__title`}>{labels.addObservation.title}</h1>
      <p className={`${blockName}__subtitle`}>
        {labels.addObservation.subTitle}
      </p>
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
          {labels.addObservation.back}
        </Button>
        <Button className={`${blockName}__send-btn`}>
          {labels.addObservation.sendObservation}
        </Button>
      </div>
    </div>
  );
};
