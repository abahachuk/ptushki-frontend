import { BIRDS_GRID_COLUMN_NAMES } from "../../app/features/birds/columns";
import { BIRDS_LIST_NAMESPACE } from "../../app/features/birds/conf";
import { BirdData, BirdFilters } from "../../app/features/birds/models";
import { createDataGridReducer } from "../../components/table/dataGridReducer";
import { getDefaultDataGridState } from "../../components/table/defaultGridState";

const initialState = getDefaultDataGridState<BirdData[], BirdFilters>(
  BIRDS_GRID_COLUMN_NAMES
);

export const birdsListReducer = createDataGridReducer<BirdData[], BirdFilters>(
  initialState,
  BIRDS_LIST_NAMESPACE
);
