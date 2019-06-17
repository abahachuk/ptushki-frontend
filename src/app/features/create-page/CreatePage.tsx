import React, { useState, useCallback, FC, ReactNode } from "react";
import useMount from "react-use/esm/useMount";
import { goBack } from "connected-react-router";
import { DispatchProp } from "react-redux";
import { Button } from "reactstrap";

import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { IChangeValue } from "../../../components/autosuggest/Autosuggest";
import { ICreateScopeLabel, CreatePageProps } from "./models";

import { initialData } from "../../../store/actions/initialDataActions";
import { labels } from "../../../config/i18n/labels";

import { CommonBird } from "../../../components/common-bird/CommonBird";
import { PageHeader } from "../../../components/page-header/PageHeader";
import { BackButton } from "../../../components/back-button/BackButton";
import { FillLoader } from "../../../components/loader/FillLoader";
import "./CreatePage.scss";

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

const blockName = "create-page";

export const CreatePage: FC<DispatchProp & CreatePageProps> = ({
  dispatch,
  scope,
  requestFn,
  circumstancesConfig,
  initials,
  header
}) => {
  useMount(() => {
    dispatch(initialData.request());
  });

  const [form, setFormValues] = useState<FormValues>(initialForm);
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
    ({ value, type }: IChangeValue) =>
      setFormValues({ ...form, [type]: value }),
    [form]
  );

  const onGoBack = useCallback(() => dispatch(goBack()), [dispatch]);

  const onClickSend = useCallback(() => dispatch(requestFn(form)), [
    dispatch,
    form,
    requestFn
  ]);

  return (
    <div className={blockName}>
      <BackButton
        className={`${blockName}__page-back-btn`}
        label={labels.back}
        onClick={onGoBack}
      />
      <div className={`${blockName}__header`}>
        {header || (
          <PageHeader
            title={scopeLabels.title}
            subtitle={labels.createPage.subTitle}
          />
        )}
        <Button className={`${blockName}__send-btn`} onClick={onClickSend}>
          {scopeLabels.send}
        </Button>
      </div>
      <CommonBird
        circumstancesConfig={circumstancesConfig}
        onChangeBirdValues={setBird}
        birdParams={bird}
        onChangeFormValue={onChangeValue}
        formValues={form}
        observationsLabels={observationsLabels}
        circumstancesLabels={circumstancesLabels}
        initialValues={initials.value}
      />
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`}>
          {labels.createPage.back}
        </Button>
        <Button className={`${blockName}__send-btn`} onClick={onClickSend}>
          {scopeLabels.send}
        </Button>
      </div>
      {initials.isLoading && <FillLoader fullPage />}
    </div>
  );
};
