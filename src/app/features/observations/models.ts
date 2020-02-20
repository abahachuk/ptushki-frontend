import {
  DataGridFilter,
  DataGridFiltersObj,
  GridDataResponse,
  GridQuery
} from "../../../components/table/DataGridModels";
import { UserInfo, PersonInfo } from "../auth/models";

export enum VerificationStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected"
}

export interface DescriptedField {
  id: string;
  desc_rus: string;
  desc_eng: string;
  desc_byn: string;
}

export interface ObservationData {
  id: string;
  verified: VerificationStatus;
  colorRing: string;
  note: string;
  placeName: string;
  latitude: number;
  longitude: number;
  date: string;
  direction: number; // deg
  distance: number; // km
  finder: UserInfo | null;
  offlineFinder: PersonInfo | null;
  offlineFinderNote: string | null;
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
