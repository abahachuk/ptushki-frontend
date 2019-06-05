import { RootState } from "../../../store";

export const BIRDS_LIST_NAMESPACE = "BIRDS_GRID";
export const BIRDS_GRID_STATE_SELECTOR = (state: RootState) =>
  state.birdsList.gridState;
