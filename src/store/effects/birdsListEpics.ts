import {
  BIRDS_GRID_STATE_SELECTOR,
  BIRDS_LIST_NAMESPACE
} from "../../app/features/birds/conf";
import { BirdFilters, BirdsResponse } from "../../app/features/birds/models";
import { getDataGridEpics } from "../../components/table/dataGridEpics";
import { BIRDS_ENDPOINT, BIRDS_FILTERS_ENDPOINT } from "../../config/endpoints";
import { birdGridActions } from "../actions/birdsListActions";

export const birdsListEpic = getDataGridEpics<BirdsResponse, BirdFilters>(
  BIRDS_LIST_NAMESPACE,
  BIRDS_GRID_STATE_SELECTOR,
  {
    gridStateSelector: BIRDS_GRID_STATE_SELECTOR,
    gridEndpoint: BIRDS_ENDPOINT,
    filtersEndpoint: BIRDS_FILTERS_ENDPOINT,
    gridActions: birdGridActions
  }
);
