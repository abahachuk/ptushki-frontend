import { GridDataResponse, GridQuery } from "../../../utils/grid/models";
import { UserInfo } from "../auth/models";
import { DataGridFilter } from "../../../components/table/DataGrid";

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

export interface ObservationFilters {
  id?: DataGridFilter[];
  verificationStatus?: (DataGridFilter & { value: boolean })[];
  colorRing?: DataGridFilter[];
  note?: DataGridFilter[];
  placeName?: DataGridFilter[];
  date?: DataGridFilter[];
  direction?: DataGridFilter[];
  distance?: DataGridFilter[];
  finder?: (DataGridFilter & { value: UserInfo })[];
  elapsedTime?: DataGridFilter[];
  remarks?: DataGridFilter[];
}

export interface ObservationsResponse
  extends GridDataResponse<ObservationData> {}

export interface ObservationsQuery extends GridQuery<ObservationData> {}
