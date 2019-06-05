import {
  DataGridFilter,
  DataGridFiltersObj
} from "../../../components/table/DataGridModels";
import { GridDataResponse, GridQuery } from "../../../utils/grid/models";
import { UserInfo } from "../auth/models";

export enum VerificationStatus {
  Pending = "Pending",
  Verified = "Verified",
  Rejected = "Rejected"
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
}

export interface ObservationFilters
  extends DataGridFiltersObj<ObservationData> {
  verificationStatus?: (DataGridFilter & { value: boolean })[];
  finder?: (DataGridFilter & { value: UserInfo })[];
}

export interface ObservationsResponse
  extends GridDataResponse<ObservationData> {}

export interface ObservationsQuery extends GridQuery<ObservationData> {}
