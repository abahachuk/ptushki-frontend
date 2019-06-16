import React, { useState, useCallback, FC } from "react";
import { goBack } from "connected-react-router";
import { DispatchProp } from "react-redux";
import { Button } from "reactstrap";

import { CommonBird } from "../../../components/common-bird/CommonBird";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { IChangeValue } from "../../../components/autosuggest/Autosuggest";
import { PageHeader } from "../../../components/page-header/PageHeader";
import { BackButton } from "../../../components/back-button/BackButton";

import { labels } from "../../../config/i18n/labels";

import {
  circumstancesConfig,
  observationConfig,
  birdConfig
} from "../add-observation/test.data";

import "./CreateBird.scss";

const blockName = "create-bird";

const OBSERVATION_LABELS = {
  title: labels.createBird.observations,
  subtitle: labels.createBird.observationsSubtitle
};

const CIRCUMSTANCES_LABELS = {
  title: labels.createBird.circumstances,
  subtitle: labels.createBird.circumstancesSubtitle
};

export const CreateBirdForm: FC<DispatchProp> = ({ dispatch }) => {
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

  const onSave = () => {};

  const onGoBack = useCallback(() => dispatch(goBack()), [dispatch]);

  return (
    <div className={blockName}>
      <BackButton
        className={`${blockName}__page-back-btn`}
        label={labels.back}
        onClick={onGoBack}
      />
      <div className={`${blockName}__header`}>
        <PageHeader
          title={labels.createBird.title}
          subtitle={labels.createBird.subtitle}
        />
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
        observationsLabels={OBSERVATION_LABELS}
        circumstancesLabels={CIRCUMSTANCES_LABELS}
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
