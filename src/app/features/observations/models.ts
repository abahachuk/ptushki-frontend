import {
  DataGridFilter,
  DataGridFiltersObj,
  GridDataResponse,
  GridQuery
} from "../../../components/table/DataGridModels";
import { UserInfo } from "../auth/models";

export enum VerificationStatus {
  Pending = "Pending",
  Verified = "Verified",
  Rejected = "Rejected"
}

// TODO when api is localised, change this
export interface DescriptedField {
  id: string;
  // eslint-disable-next-line camelcase
  desc_rus: string;
}

export interface ObservationData {
  id: string;
  verificationStatus: VerificationStatus;
  colorRing: string;
  note: string;
  placeName: string;
  latitude: number;
  longitude: number;
  date: string;
  direction: number; // deg
  distance: number; // km
  finder: UserInfo;
  elapsedTime: number; // days
  remarks: string;
  sexMentioned: DescriptedField;
  sexConcluded: DescriptedField;
  circumstances: DescriptedField;
  circumstancesPresumed: DescriptedField;
  condition: DescriptedField;
  status: DescriptedField;
  speciesMentioned: DescriptedField;
  speciesConcluded: DescriptedField;
  ageMentioned: DescriptedField;
  ageConcluded: DescriptedField;
  manipulated: DescriptedField;
  movedBeforeTheCapture: DescriptedField;
  catchingMethod: DescriptedField;
  catchingLures: DescriptedField;
  accuracyOfDate: DescriptedField;
  accuracyOfCoordinates: DescriptedField;
  pullusAge: DescriptedField;
  accuracyOfPullusAge: DescriptedField;

  // TODO: update
  primaryIdentificationMethod?: DescriptedField;
  ring: {
    primaryIdentificationMethod: DescriptedField;
  };
  ringMentioned: string;
}

export interface ObservationFilters
  extends DataGridFiltersObj<ObservationData> {
  verificationStatus?: (DataGridFilter & { value: boolean })[];
  finder?: (DataGridFilter & { value: UserInfo })[];
}

export interface ObservationsResponse
  extends GridDataResponse<ObservationData> {}

export interface ObservationsQuery extends GridQuery<ObservationData> {}
