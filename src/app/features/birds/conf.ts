import { RootState } from "../../../store";

export const BIRDS_LIST_NAMESPACE = "BIRDS_GRID";
export const BIRDS_GRID_STATE_SELECTOR = (state: RootState) => state.birdsList;

export const BIRD_OBSERVATIONS_LIST_NAMESPACE = "BIRD_OBSERVATIONS_GRID";
export const BIRD_OBSERVATIONS_GRID_STATE_SELECTOR = (state: RootState) =>
  state.birdObservationsList;
