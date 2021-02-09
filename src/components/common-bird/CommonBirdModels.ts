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
  ringingScheme: FormValueDescriptor;
  ringInfo: FormValueDescriptor;
  verificationOfTheMetalRing: FormValueDescriptor;
  primaryMethod: FormValueDescriptor;
  statusOfRing: FormValueDescriptor;
  broodAge: FormValueDescriptor;
  broodAgeAccuracy: FormValueDescriptor;
  otherMarksInformation: FormValueDescriptor;
  manipulated: FormValueDescriptor;
  movedBeforeTheCapture: FormValueDescriptor;
  catchingMethod: FormValueDescriptor;
  catchingLures: FormValueDescriptor;
  bander: FormValueDescriptor;
  email: FormValueDescriptor;
  bandingPlace: FormValueDescriptor;
  day: FormValueDescriptor;
  month: FormValueDescriptor;
  year: FormValueDescriptor;
  hours: FormValueDescriptor;
  minutes: FormValueDescriptor;
  accuracyOfCoordinates: FormValueDescriptor;
  circumstances: FormValueDescriptor;
  accuracyOfCircumstances: FormValueDescriptor;
  placeCode: FormValueDescriptor;
  coordinates: FormValueDescriptor;
  accuracyOfDate: FormValueDescriptor;
  comment: FormValueDescriptor;
  // TODO: integrate date picker
  date: any;
  longitude: FormValueDescriptor;
  latitude: FormValueDescriptor;
  verified: FormValueDescriptor;
}

interface FormLabels {
  title: string;
  subtitle?: string;
}

export interface ICommonBird extends IBird {
  initialValues?: IInitialData;
  onChangeFormValue?: ({ value, type }: IChangeValue) => void;
  formValues?: FormValues;
  observationsLabels: FormLabels;
  circumstancesLabels: FormLabels;
  manipulationsLabels: FormLabels;
  marksLabels: FormLabels;
  ringsLabels: FormLabels;
  isExtendedForm?: Boolean;
}

export interface IBlockHeader {
  title: string;
  subtitle?: string;
}

export interface IField extends IAutosuggest {
  label: string;
}
