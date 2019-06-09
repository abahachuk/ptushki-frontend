import { DataGridCol } from "../../../components/table/DataGrid";
import { COMMON_GRID_COLUMNS } from "../../../utils/grid/commonGridColumns";
import { GridColumn } from "../../../utils/grid/GridColumn";
import { ObservationData } from "./models";

export const OBSERVATION_LIST_COLUMNS_CONFIG: DataGridCol<ObservationData>[] = [
  COMMON_GRID_COLUMNS[GridColumn.id],
  COMMON_GRID_COLUMNS[GridColumn.species],
  COMMON_GRID_COLUMNS[GridColumn.verified],
  COMMON_GRID_COLUMNS[GridColumn.sex],
  COMMON_GRID_COLUMNS[GridColumn.ring],
  COMMON_GRID_COLUMNS[GridColumn.status],
  COMMON_GRID_COLUMNS[GridColumn.condition],
  COMMON_GRID_COLUMNS[GridColumn.placeName],
  COMMON_GRID_COLUMNS[GridColumn.date],
  COMMON_GRID_COLUMNS[GridColumn.direction],
  COMMON_GRID_COLUMNS[GridColumn.distance],
  COMMON_GRID_COLUMNS[GridColumn.finder],
  COMMON_GRID_COLUMNS[GridColumn.elapsedTime],
  COMMON_GRID_COLUMNS[GridColumn.remarks]
];

export const OBSERVATION_GRID_COLUMN_NAMES = OBSERVATION_LIST_COLUMNS_CONFIG.map(
  column => column.name as GridColumn
);
