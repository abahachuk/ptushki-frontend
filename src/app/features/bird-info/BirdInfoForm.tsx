import React, { FC, useState, useCallback, Fragment } from "react";
import { goBack } from "connected-react-router";
import { DispatchProp } from "react-redux";
import { Button } from "reactstrap";

import { CommonBird } from "../../../components/common-bird/CommonBird";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { IChangeValue } from "../../../components/autosuggest/Autosuggest";
import { ActionButton } from "../../../components/action-button/ActionButton";
import { BirdObservationsListConnected } from "./BirdObservationsList";
import { BackButton } from "../../../components/back-button/BackButton";

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

interface IBirdInfoForm extends DispatchProp {
  birdInfo: BirdInfo;
  scope: Scope;
}

export const BirdInfoForm: FC<IBirdInfoForm> = ({ scope, dispatch }) => {
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
        <h1 className={`${blockName}__title`}>{birdData.name}</h1>
        {!editMode ? (
          <div className={`${blockName}__header-buttons`}>
            <CanConnected I={UserAction.edit} a={scope}>
              <ActionButton
                icon="edit"
                label={labels.birdInfo.edit}
                onClick={onClickEdit}
              />
            </CanConnected>
            <CanConnected I={UserAction.remove} a={scope}>
              <ActionButton icon="delete" label={labels.birdInfo.delete} />
            </CanConnected>
            <CanConnected I={UserAction.export} a={Scope.observations}>
              <Button outline className={`${blockName}__btn`}>
                {labels.birdInfo.export}
              </Button>
            </CanConnected>
          </div>
        ) : (
          <Button className={`${blockName}__edit-btn`}>
            {labels.createBird.saveBird}
          </Button>
        )}
      </div>
      <p className={`${blockName}__subtitle`}>{birdData.code}</p>
      <p className={`${blockName}__euring-title`}>{labels.birdInfo.euring}</p>
      <span className={`${blockName}__euring`}>{birdData.euring}</span>
      <CommonBird
        circumstancesConfig={circumstancesConfig}
        onChangeBirdValues={setBird}
        birdParams={bird}
        onChangeFormValue={onChangeValue}
        formValues={form}
        observationsLabels={{ title: labels.birdInfo.observationsTitle }}
        circumstancesLabels={{ title: labels.birdInfo.circumstancesTitle }}
        viewMode={!editMode}
      />
      {!editMode && (
        <Fragment>
          <p className={`${blockName}__obs-history-title`}>
            {labels.birdInfo.observationsHistory}
          </p>
          <BirdObservationsListConnected />
        </Fragment>
      )}
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`}>
          {labels.birdInfo.back}
        </Button>
        {!editMode ? (
          <Button onClick={onClickEdit} className={`${blockName}__edit-btn`}>
            {labels.birdInfo.edit}
          </Button>
        ) : (
          <Button onClick={onClickSave} className={`${blockName}__edit-btn`}>
            {labels.createBird.saveBird}
          </Button>
        )}
      </div>
    </div>
  );
};
