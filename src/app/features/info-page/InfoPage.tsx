import React, { useState, useCallback, FC, Fragment } from "react";
import useMount from "react-use/esm/useMount";
import { goBack } from "connected-react-router";
import { DispatchProp } from "react-redux";
import { Button } from "reactstrap";
import { birdData, formValues } from "../bird-info/test-data";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";

import { labels } from "../../../config/i18n/labels";

import { CommonBird } from "../../../components/common-bird/CommonBird";
import { PageHeader } from "../../../components/page-header/PageHeader";
import { BackButton } from "../../../components/back-button/BackButton";
import { ActionButton } from "../../../components/action-button/ActionButton";
import { CreatePageConnected } from "../create-page/CreatePageConnected";
import { IInfoScopeLabel, InfoPageProps } from "./models";
import "./InfoPage.scss";
import { UserAction } from "../../../config/permissions";
import { CanConnected } from "../auth/CanConnected";

const initialForm = {
  species: "",
  sexMentioned: "",
  ageMentioned: "",
  status: "",
  country: "",
  region: "",
  coordinates: "",
  accuracyOfDate: "",
  comment: ""
};

const blockName = "info-page";

export const InfoPage: FC<DispatchProp & InfoPageProps> = ({
  dispatch,
  removeFn,
  scope,
  sendFn,
  updateFn,
  entity,
  historyComponent
}) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setFormValues] = useState<FormValues>(formValues);
  const [bird, setBird] = useState(birdData);

  // @ts-ignore
  const scopeLabels: IInfoScopeLabel = labels.infoPage[
    scope
  ] as IInfoScopeLabel;
  const circumstancesLabels = {
    title: scopeLabels.circumstancesTitle,
    subtitle: scopeLabels.circumstancesSubtitle
  };
  const observationsLabels = {
    title: scopeLabels.observationsTitle,
    subtitle: scopeLabels.observationsSubtitle
  };

  const onGoBack = useCallback(() => dispatch(goBack()), [dispatch]);
  const onClickEdit = useCallback(() => setEditMode(true), [setEditMode]);
  const onClickDelete = useCallback(() => dispatch(removeFn(form)), [
    dispatch,
    form,
    removeFn
  ]);

  const header = (
    <PageHeader
      title={scopeLabels.title}
      subtitle={scopeLabels.subTitle}
      className={`${blockName}__page-header`}
    />
  );

  return editMode ? (
    <CreatePageConnected
      header={header}
      scope={scope}
      sendFn={sendFn}
      updateFn={updateFn}
    />
  ) : (
    <div className={blockName}>
      <BackButton
        className={`${blockName}__page-back-btn`}
        label={labels.buttons.back}
        onClick={onGoBack}
      />
      <div className={`${blockName}__header`}>
        {header}
        <div className={`${blockName}__header-buttons`}>
          <CanConnected I={UserAction.edit} a={scope}>
            <ActionButton
              icon="edit"
              label={labels.buttons.edit}
              onClick={onClickEdit}
            />
          </CanConnected>
          <CanConnected I={UserAction.remove} a={scope}>
            <ActionButton
              icon="delete"
              label={labels.buttons.delete}
              onClick={onClickDelete}
            />
          </CanConnected>
          <CanConnected I={UserAction.export} a={scope}>
            <Button outline className={`${blockName}__btn`}>
              {labels.buttons.export}
            </Button>
          </CanConnected>
        </div>
      </div>
      {birdData.euring && (
        <Fragment>
          <p className={`${blockName}__euring-title`}>
            {labels.birdInfo.euring}
          </p>
          <span className={`${blockName}__euring`}>{birdData.euring}</span>
        </Fragment>
      )}
      <CommonBird
        birdParams={bird.params}
        formValues={form}
        observationsLabels={observationsLabels}
        circumstancesLabels={circumstancesLabels}
        viewMode
      />
      {historyComponent && (
        <Fragment>
          <p className={`${blockName}__obs-history-title`}>
            {scopeLabels.history}
          </p>
          {historyComponent}
        </Fragment>
      )}
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`} onClick={onGoBack}>
          {labels.buttons.back}
        </Button>
        <Button className={`${blockName}__edit-btn`} onClick={onClickEdit}>
          {scopeLabels.edit}
        </Button>
      </div>
    </div>
  );
};
