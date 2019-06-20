import { IAutosuggest, IChangeValue } from "../autosuggest/Autosuggest";
import { IBird } from "../bird/Bird";
import { IInitialData } from "../../app/features/create-page/models";

export interface CollectionItem {
  value: string;
  id: number;
  label: string;
}

export interface PhotoItem {
  url: string;
  id: number;
}

export interface FormValues {
  species?: string;
  speciesMentioned?: string;
  sexMentioned: string;
  ageMentioned: string;
  status: string;
  country: string;
  region: string;
  coordinates: string;
  date: any;
  accuracyOfDate: string;
  comment: string;
}

interface FormLabels {
  title: string;
  subtitle?: string;
}

export interface ICommonBird extends IBird {
  initialValues?: IInitialData;
  onChangeBirdValues?: (birdParams: any) => void;
  onChangeFormValue?: ({ value, type }: IChangeValue) => void;
  formValues?: FormValues;
  observationsLabels: FormLabels;
  circumstancesLabels: FormLabels;
}

export interface IBlockHeader {
  title: string;
  subtitle?: string;
}

export interface IField extends IAutosuggest {
  label: string;
}
