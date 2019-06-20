import { AnyAction } from "redux";
import { ReactNode } from "react";
import {
  CreatePageProps,
  IInitialDataDescriptor,
  InitialData
} from "../create-page/models";

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
  removeFn: (id: string) => AnyAction;
  getFn: (id: string) => AnyAction;
  flushFn: () => AnyAction;
  historyComponent?: ReactNode;
}

type FormDataMap = { [key in InitialData]: IInitialDataDescriptor };

export interface FormData extends FormDataMap {}
