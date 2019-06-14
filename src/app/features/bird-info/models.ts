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

export interface BirdObservationData {
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
}

export interface BirdObservationFilters
  extends DataGridFiltersObj<BirdObservationData> {
  verificationStatus?: (DataGridFilter & { value: boolean })[];
  finder?: (DataGridFilter & { value: UserInfo })[];
}

export interface BirdObservationsResponse
  extends GridDataResponse<BirdObservationData> {}

export interface BirdObservationsQuery extends GridQuery<BirdObservationData> {}
