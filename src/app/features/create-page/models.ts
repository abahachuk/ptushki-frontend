import { AnyAction } from "redux";
import { ReactNode } from "react";
import { Scope } from "../../../config/permissions";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";

export interface ICreateScopeLabel {
  send: string;
  title: string;
  circumstancesTitle: string;
  circumstancesSubtitle: string;
  observationsTitle: string;
  observationsSubtitle: string;
}

export interface CreatePageProps {
  scope: Scope;
  requestFn: (form: FormValues) => AnyAction;
  circumstancesConfig: any;
  initials: AsyncResource<IInitialData>;
  header?: ReactNode;
}

export enum InitialData {
  age = "age",
  sex = "sex",
  status = "status",
  accuracyOfDate = "accuracyOfDate",
  species = "species",
  primaryIdentificationMethod = "primaryIdentificationMethod"
}

type InitialDataDescriptorMap = { [key in InitialData]?: string };
type InitialDataMap = { [key in InitialData]: IInitialDataDescriptor[] };

export interface IInitialDataDescriptor extends InitialDataDescriptorMap {
  id: string;
  value?: string;
  desc_eng: string;
  desc_rus?: string;
}

export interface IInitialData extends InitialDataMap {}
