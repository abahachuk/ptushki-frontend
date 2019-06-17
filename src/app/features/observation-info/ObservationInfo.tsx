import React, { useState, useCallback, FC } from "react";
import { goBack } from "connected-react-router";
import { DispatchProp } from "react-redux";
import { Button } from "reactstrap";

import { CommonBird } from "../../../components/common-bird/CommonBird";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { IChangeValue } from "../../../components/autosuggest/Autosuggest";
import { PageHeader } from "../../../components/page-header/PageHeader";
import { ActionButton } from "../../../components/action-button/ActionButton";
import { BackButton } from "../../../components/back-button/BackButton";

import { birdData, formValues } from "../bird-info/test-data";

import { labels } from "../../../config/i18n/labels";

import { circumstancesConfig } from "../add-observation/test.data";

import "./ObservationInfo.scss";

const OBSERVATION_LABELS = {
  title: labels.observationInfo.observations
};

const CIRCUMSTANCES_LABELS = {
  title: labels.observationInfo.circumstances
};

const blockName = "observation-info";

export const ObservationInfoForm: FC<
  DispatchProp & { match: { params: { id: string } } }
> = ({ dispatch, match }) => {
  const [form, setFormValues] = useState<FormValues>(formValues);
  const [bird, setBird] = useState(birdData.params);
  const [editMode, setEditMode] = useState(false);

  const onChangeValue = useCallback(
    ({ value, type }: IChangeValue) =>
      setFormValues({ ...form, [type]: value }),
    [form]
  );

  const onClickEdit = useCallback(() => setEditMode(true), [setEditMode]);

  const onClickSave = useCallback(() => {
    // TODO: logic for saving
    setEditMode(false);
  }, [setEditMode]);

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
          title={labels.observationInfo.title}
          subtitle={labels.observationInfo.subtitle}
          className={`${blockName}__page-header`}
        />
        {!editMode ? (
          <div className={`${blockName}__header-buttons`}>
            <ActionButton
              icon="edit"
              label={labels.observationInfo.edit}
              onClick={onClickEdit}
            />
            <ActionButton icon="delete" label={labels.observationInfo.delete} />
          </div>
        ) : (
          <Button className={`${blockName}__edit-btn`} onClick={onClickSave}>
            {labels.addObservation.sendObservation}
          </Button>
        )}
      </div>
      <CommonBird
        circumstancesConfig={circumstancesConfig}
        onChangeBirdValues={setBird}
        birdParams={bird}
        onChangeFormValue={onChangeValue}
        formValues={form}
        viewMode={!editMode}
        observationsLabels={OBSERVATION_LABELS}
        circumstancesLabels={CIRCUMSTANCES_LABELS}
      />
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`}>
          {labels.observationInfo.back}
        </Button>
        {!editMode ? (
          <Button className={`${blockName}__edit-btn`} onClick={onClickEdit}>
            {labels.observationInfo.editObservation}
          </Button>
        ) : (
          <Button className={`${blockName}__edit-btn`} onClick={onClickSave}>
            {labels.addObservation.sendObservation}
          </Button>
        )}
      </div>
    </div>
  );
};
