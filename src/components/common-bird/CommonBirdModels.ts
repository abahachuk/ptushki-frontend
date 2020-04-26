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

export interface FormValueDescriptor {
  value: string;
  label: string;
}

export interface FormValues {
  euringCodeIdentifier: FormValueDescriptor;
  species?: FormValueDescriptor;
  speciesMentioned?: FormValueDescriptor;
  sexMentioned: FormValueDescriptor;
  ageMentioned: FormValueDescriptor;
  status: FormValueDescriptor;
  placeCode: FormValueDescriptor;
  coordinates: FormValueDescriptor;
  accuracyOfDate: FormValueDescriptor;
  comment: FormValueDescriptor;
  // TODO: integrate date picker
  date: any;
  longitude: FormValueDescriptor;
  latitude: FormValueDescriptor;
  verified: FormValueDescriptor;
  catchingMethod: FormValueDescriptor;
  catchingLures: FormValueDescriptor;
  manipulated: FormValueDescriptor;
  movedBeforeTheCapture: FormValueDescriptor;
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
  photos?: Array<string>;
}

export interface IBlockHeader {
  title: string;
  subtitle?: string;
}

export interface IField extends IAutosuggest {
  label: string;
}
