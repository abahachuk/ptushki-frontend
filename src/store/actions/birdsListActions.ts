import { BIRDS_LIST_NAMESPACE } from "../../app/features/birds/conf";
import { BirdData, BirdFilters } from "../../app/features/birds/models";
import { dataGridActions } from "../../components/table/dataGridActions";

export const birdGridActions = dataGridActions<BirdData[], BirdFilters>(
  BIRDS_LIST_NAMESPACE
);
