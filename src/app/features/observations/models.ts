import { GridDataResponse, GridQuery } from "../../../utils/grid/models";

export interface ObservationData {
  id: string;
  verified: boolean;
  colorRing: string;
  note: string;
}

export interface ObservationsResponse
  extends GridDataResponse<ObservationData> {}

export interface ObservationsQuery extends GridQuery<ObservationData> {}
