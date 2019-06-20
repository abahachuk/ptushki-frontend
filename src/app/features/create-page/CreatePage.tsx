import React, { useState, useCallback, FC, ReactNode } from "react";
import useMount from "react-use/esm/useMount";
import { goBack } from "connected-react-router";
import { DispatchProp } from "react-redux";
import { Button } from "reactstrap";

import { IChangeValue } from "../../../components/autosuggest/Autosuggest";
import { ICreateScopeLabel, CreatePageProps } from "./models";

import { initialData } from "../../../store/actions/initialDataActions";
import { labels } from "../../../config/i18n/labels";

import { CommonBird } from "../../../components/common-bird/CommonBird";
import { PageHeader } from "../../../components/page-header/PageHeader";
import { BackButton } from "../../../components/back-button/BackButton";
import { FillLoader } from "../../../components/loader/FillLoader";
import "./CreatePage.scss";

// TODO: remove
import {
  circumstancesConfig,
  observationConfig,
  birdConfig,
  birdValues
} from "./test.data";

const initialForm = {
  speciesMentioned: "",
  sexMentioned: "",
  ageMentioned: "",
  status: "",
  country: "",
  region: "",
  coordinates: "",
  date: "",
  accuracyOfDate: "",
  comment: ""
};

const blockName = "create-page";

export const CreatePage: FC<DispatchProp & CreatePageProps> = ({
  dispatch,
  scope,
  sendFn,
  updateFn,
  initials,
  header,
  entity,
  bird
}) => {
  useMount(() => {
    dispatch(initialData.request());
  });

  const [birdState, setBird] = useState(
    bird || {
      saddle: [],
      neck: [],
      leftWing: [],
      rightWing: [],
      leftBobbin: [],
      rightBobbin: [],
      leftLeg: [],
      rightLeg: []
    }
  );

  // @ts-ignore
  const scopeLabels: ICreateScopeLabel = labels.createPage[
    scope
  ] as ICreateScopeLabel;
  const circumstancesLabels = {
    title: scopeLabels.circumstancesTitle,
    subtitle: scopeLabels.circumstancesSubtitle
  };
  const observationsLabels = {
    title: scopeLabels.observationsTitle,
    subtitle: scopeLabels.observationsSubtitle
  };

  const onChangeValue = useCallback(
    ({ value, label, type }: IChangeValue) =>
      dispatch(updateFn({ ...entity.value, [type]: { value, label } })),
    [dispatch, entity.value, updateFn]
  );

  const onGoBack = useCallback(() => dispatch(goBack()), [dispatch]);

  const onClickSend = useCallback(() => dispatch(sendFn(entity.value)), [
    dispatch,
    entity,
    sendFn
  ]);

  return (
    <div className={blockName}>
      <BackButton
        className={`${blockName}__page-back-btn`}
        label={labels.buttons.back}
        onClick={onGoBack}
      />
      <div className={`${blockName}__header`}>
        {header || (
          <PageHeader
            title={scopeLabels.title}
            subtitle={scopeLabels.subTitle}
          />
        )}
        <Button className={`${blockName}__send-btn`} onClick={onClickSend}>
          {scopeLabels.send}
        </Button>
      </div>
      <CommonBird
        onChangeBirdValues={setBird}
        birdParams={birdState}
        onChangeFormValue={onChangeValue}
        formValues={entity.value}
        observationsLabels={observationsLabels}
        circumstancesLabels={circumstancesLabels}
        initialValues={initials.value}
        // TODO: remove mock data
        collection={birdValues}
      />
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`} onClick={onGoBack}>
          {labels.buttons.back}
        </Button>
        <Button className={`${blockName}__send-btn`} onClick={onClickSend}>
          {scopeLabels.send}
        </Button>
      </div>
      {initials.isLoading && <FillLoader fullPage />}
    </div>
  );
};
