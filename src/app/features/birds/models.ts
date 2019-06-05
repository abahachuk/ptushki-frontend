import {
  DataGridFilter,
  DataGridFiltersObj,
  GridDataResponse,
  GridQuery
} from "../../../components/table/DataGridModels";
import { UserInfo } from "../auth/models";
import { ObservationData } from "../observations/models";

// TODO extract common type between bird and observation, when api is available
export interface BirdData extends ObservationData {}

export interface BirdFilters extends DataGridFiltersObj<BirdData> {
  finder?: (DataGridFilter & { value: UserInfo })[];
}

export interface BirdsResponse extends GridDataResponse<BirdData> {}

export interface BirdsQuery extends GridQuery<BirdData> {}
