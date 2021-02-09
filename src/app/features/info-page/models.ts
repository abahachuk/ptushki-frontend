import { ReactNode } from "react";
import { PayloadAC } from "typesafe-actions";
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
  marksTitle?: string;
  marksSubtitle?: string;
  manipulationsTitle?: string;
  manipulationsSubtitle?: string;
  ringsTitle?: string;
  ringsSubtitle?: string;
  observationsTitle?: string;
  observationsSubtitle?: string;
  history?: string;
}

export interface InfoPageProps extends CreatePageProps {
  removeFn: PayloadAC<string, string>;
  getFn: PayloadAC<string, string>;
  flushFn: PayloadAC<string, void>;
  historyComponent?: ReactNode;
}

type FormDataMap = { [key in InitialData]: IInitialDataDescriptor };

export interface FormData extends FormDataMap {}
