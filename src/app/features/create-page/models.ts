import { AnyAction } from "redux";
import { ReactNode } from "react";
import { Scope } from "../../../config/permissions";
import { FormValues } from "../../../components/common-bird/CommonBirdModels";
import { AsyncResource } from "../../../utils/createAsyncStateReducer";
import { BirdParams } from "../../../components/bird/Bird";
import { RootState } from "../../../store";

export interface ICreateScopeLabel {
  send?: string;
  title?: string;
  subTitle?: string;
  circumstancesTitle?: string;
  circumstancesSubtitle?: string;
  observationsTitle?: string;
  observationsSubtitle?: string;
}

export interface CreatePageProps {
  sendFn: (form: FormValues) => AnyAction;
  updateFn: (form: FormValues) => AnyAction;
  stateSelector: (state: RootState) => AsyncResource<FormValues>;
  // TODO: remove optional mark
  initials?: AsyncResource<IInitialData>;
  scope: Scope;
  // TODO: remove optional mark
  entity?: AsyncResource<FormValues>;
  header?: ReactNode;
  bird?: BirdParams;
}

export enum InitialData {
  age = "age",
  ageMentioned = "ageMentioned",
  sex = "sex",
  sexMentioned = "sexMentioned",
  status = "status",
  accuracyOfDate = "accuracyOfDate",
  species = "species",
  speciesMentioned = "speciesMentioned",
  primaryIdentificationMethod = "primaryIdentificationMethod",
  placeCode = "placeCode"
}

type InitialDataDescriptorMap = { [key in InitialData]?: string };
type InitialDataMap = { [key in InitialData]: IInitialDataDescriptor[] };

export interface IInitialDataDescriptor extends InitialDataDescriptorMap {
  id: string;
  value?: string;
  desc: string;
}

export interface IInitialData extends InitialDataMap {}
