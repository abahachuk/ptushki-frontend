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
  date: string;
  direction: string;
  distance: string;
  finder: UserInfo;
  elapsedTime: string;
  remarks: string;
  sexConcluded: DescriptedField;
  circumstances: DescriptedField;
  condition: DescriptedField;
  status: DescriptedField;
  speciesConcluded: DescriptedField;
  ring: {
    primaryIdentificationMethod: DescriptedField;
  };
}

export interface ObservationFilters
  extends DataGridFiltersObj<ObservationData> {
  verificationStatus?: (DataGridFilter & { value: boolean })[];
  finder?: (DataGridFilter & { value: UserInfo })[];
}

export interface ObservationsResponse
  extends GridDataResponse<ObservationData> {}

export interface ObservationsQuery extends GridQuery<ObservationData> {}
