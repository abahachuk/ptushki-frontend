import React, { useState, useCallback } from "react";
import { Button } from "reactstrap";

import { IChangeValue } from "../../../components/autosuggest/Autosuggest";

import {
  circumstancesConfig,
  observationConfig,
  birdConfig
} from "./test.data";

import { labels } from "../../../config/i18n/labels";

import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { CommonBird } from "../../../components/common-bird/CommonBird";
import { PageHeader } from "../../../components/page-header/PageHeader";

import "./AddObservation.scss";

const OBSERVATION_LABELS = {
  title: labels.addObservation.observationsTitle,
  subtitle: labels.addObservation.observationsSubtitle
};

const CIRCUMSTANCES_LABELS = {
  title: labels.addObservation.circumstancesTitle,
  subtitle: labels.addObservation.circumstancesSubtitle
};

const blockName = "add-observation";

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
    ({ value, type }: IChangeValue) =>
      setFormValues({ ...form, [type]: value }),
    [form]
  );

  return (
    <div className={blockName}>
      <div className={`${blockName}__header`}>
        <PageHeader
          title={labels.addObservation.title}
          subtitle={labels.addObservation.subTitle}
        />
        <Button className={`${blockName}__send-btn`}>
          {labels.addObservation.sendObservation}
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
        observationsLabels={OBSERVATION_LABELS}
        circumstancesLabels={CIRCUMSTANCES_LABELS}
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
