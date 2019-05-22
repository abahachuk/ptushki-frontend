import { RootState } from "../../../store";

export const OBSERVATIONS_LIST_NAMESPACE = "OBSERVATIONS_GRID";
export const OBSERVATIONS_GRID_STATE_SELECTOR = (state: RootState) =>
  state.observationList.gridState;
