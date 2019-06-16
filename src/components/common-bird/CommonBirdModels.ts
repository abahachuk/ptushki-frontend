import { IAutosuggest, IChangeValue } from "../autosuggest/Autosuggest";

import { IBird } from "../bird/Bird";

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
  sex: string;
  age: string;
  state: string;
  country: string;
  region: string;
  coordinates: string;
  timeError: string;
  comment: string;
}

interface FormLabels {
  title: string;
  subtitle?: string;
}

export interface ICommonBird extends IBird {
  observationConfig: {
    birdSpecies: Array<CollectionItem>;
    sex: Array<CollectionItem>;
    age: Array<CollectionItem>;
    birdState: Array<CollectionItem>;
    photos: Array<PhotoItem>;
    comment: string;
  };
  circumstancesConfig: {
    country: Array<CollectionItem>;
    region: Array<CollectionItem>;
    coordinates: string;
    timeDate: string;
    timeError: Array<CollectionItem>;
  };
  birdConfig: {
    neck: Array<CollectionItem>;
    saddle: Array<CollectionItem>;
    leftWing: Array<CollectionItem>;
    rightWing: Array<CollectionItem>;
    leftBobbin: Array<CollectionItem>;
    rightBobbin: Array<CollectionItem>;
    leftLeg: Array<CollectionItem>;
    rightLeg: Array<CollectionItem>;
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
