import { AnyAction } from "redux";
import { ReactNode } from "react";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { Scope } from "../../../config/permissions";
import { CreatePageProps } from "../create-page/models";

export interface IInfoScopeLabel {
  edit?: string;
  title?: string;
  subTitle?: string;
  circumstancesTitle?: string;
  circumstancesSubtitle?: string;
  observationsTitle?: string;
  observationsSubtitle?: string;
  history?: string;
}

export interface InfoPageProps extends CreatePageProps {
  removeFn: (form: FormValues) => AnyAction;
  historyComponent?: ReactNode;
}
