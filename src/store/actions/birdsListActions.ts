import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { BIRDS_LIST_NAMESPACE } from "../../app/features/birds/conf";
import { BirdData, BirdFilters } from "../../app/features/birds/models";
import { dataGridActions } from "../../components/table/dataGridActions";

export const birdsData = createAsyncAction(
  "BIRDS_REQUEST",
  "BIRDS_SUCCESS",
  "BIRDS_FAILURE"
)<void, BirdData[], string>();

export const birdsFiltersRequest = createStandardAction(
  "BIRDS_FILTERS_REQUEST"
)();

export const birdGridActions = dataGridActions<BirdFilters>(
  BIRDS_LIST_NAMESPACE
);
