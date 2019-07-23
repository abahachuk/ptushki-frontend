import React, { useState, useCallback, FC, Fragment } from "react";
import useMount from "react-use/esm/useMount";
import useUnmount from "react-use/esm/useUnmount";
import { goBack } from "connected-react-router";
import { DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button } from "reactstrap";
import { birdData } from "./test-data";

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
import { FillLoader } from "../../../components/loader/FillLoader";
import { VerificationStatus } from "../observations/models";

const blockName = "info-page";

export const InfoPage: FC<
  DispatchProp & RouteComponentProps<{ id: string }> & InfoPageProps
> = ({
  dispatch,
  removeFn,
  scope,
  entity,
  match,
  getFn,
  flushFn,
  sendFn,
  historyComponent,
  ...props
}) => {
  const { id } = match.params;
  useMount(() => dispatch(getFn(id)));
  useUnmount(() => dispatch(flushFn()));
  const [editMode, setEditMode] = useState(false);
  const [bird, setBird] = useState(birdData.params);

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
  const onClickDelete = useCallback(() => dispatch(removeFn(id)), [
    dispatch,
    id,
    removeFn
  ]);

  const isApproved =
    entity &&
    entity.value &&
    entity.value.verified &&
    entity.value.verified.value === VerificationStatus.approved;

  const actionButtonTitle = isApproved && labels.actionButtonTitle;

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
      {...props}
      bird={bird}
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
              disabled={isApproved}
              title={actionButtonTitle}
            />
          </CanConnected>
          <CanConnected I={UserAction.remove} a={scope}>
            <ActionButton
              icon="delete"
              label={labels.buttons.delete}
              onClick={onClickDelete}
              disabled={isApproved}
              title={actionButtonTitle}
            />
          </CanConnected>
          <CanConnected I={UserAction.export} a={scope}>
            <Button outline className={`${blockName}__btn`}>
              {labels.buttons.export}
            </Button>
          </CanConnected>
        </div>
      </div>
      {entity.value.euringCodeIdentifier && (
        <Fragment>
          <p className={`${blockName}__euring-title`}>
            {labels.birdInfo.euring}
          </p>
          <span className={`${blockName}__euring`}>
            {/* {entity.value.euringCodeIdentifier.label} */}
            {birdData.euring}
          </span>
        </Fragment>
      )}
      <CommonBird
        birdParams={bird}
        formValues={entity.value}
        observationsLabels={observationsLabels}
        circumstancesLabels={circumstancesLabels}
        onChangeBirdValues={setBird}
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
      {entity.isLoading && <FillLoader fullPage />}
    </div>
  );
};
