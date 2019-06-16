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
  species: string;
  sexMentioned: string;
  ageMentioned: string;
  status: string;
  country: string;
  region: string;
  coordinates: string;
  accuracyOfDate: string;
  comment: string;
}

interface FormLabels {
  title: string;
  subtitle?: string;
}

export interface ICommonBird extends IBird {
  initialValues?: IInitialData;
  circumstancesConfig: {
    country: Array<CollectionItem>;
    region: Array<CollectionItem>;
    coordinates: string;
    timeDate: string;
    timeError: Array<CollectionItem>;
  };
  onChangeBirdValues: (birdParams: any) => void;
  onChangeFormValue: ({ value, type }: IChangeValue) => void;
  formValues: FormValues;
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
