import { DataGridCol } from "../../../components/table/DataGrid";
import { COMMON_GRID_COLUMNS } from "../../../utils/grid/commonGridColumns";
import { GridColumn } from "../../../utils/grid/GridColumn";
import { BirdData } from "./models";

export const BIRDS_LIST_COLUMNS_CONFIG: DataGridCol<BirdData>[] = [
  COMMON_GRID_COLUMNS[GridColumn.id],
  COMMON_GRID_COLUMNS[GridColumn.speciesConcluded],
  COMMON_GRID_COLUMNS[GridColumn.sexConcluded],
  COMMON_GRID_COLUMNS[GridColumn.sexMentioned],
  COMMON_GRID_COLUMNS[GridColumn.speciesMentioned],
  COMMON_GRID_COLUMNS[GridColumn.circumstances],
  COMMON_GRID_COLUMNS[GridColumn.circumstancesPresumed],
  COMMON_GRID_COLUMNS[GridColumn.ageConcluded],
  COMMON_GRID_COLUMNS[GridColumn.ageMentioned],
  COMMON_GRID_COLUMNS[GridColumn.manipulated],
  COMMON_GRID_COLUMNS[GridColumn.movedBeforeTheCapture],
  COMMON_GRID_COLUMNS[GridColumn.catchingMethod],
  COMMON_GRID_COLUMNS[GridColumn.catchingLures],
  COMMON_GRID_COLUMNS[GridColumn.accuracyOfDate],
  COMMON_GRID_COLUMNS[GridColumn.accuracyOfCoordinates],
  COMMON_GRID_COLUMNS[GridColumn.pullusAge],
  COMMON_GRID_COLUMNS[GridColumn.accuracyOfPullusAge],
  COMMON_GRID_COLUMNS[GridColumn.primaryIdentificationMethod],
  COMMON_GRID_COLUMNS[GridColumn.status],
  COMMON_GRID_COLUMNS[GridColumn.condition],
  COMMON_GRID_COLUMNS[GridColumn.placeName],
  COMMON_GRID_COLUMNS[GridColumn.date],
  COMMON_GRID_COLUMNS[GridColumn.direction],
  COMMON_GRID_COLUMNS[GridColumn.distance],
  COMMON_GRID_COLUMNS[GridColumn.elapsedTime],
  COMMON_GRID_COLUMNS[GridColumn.remarks]
];

export const BIRDS_GRID_COLUMN_NAMES = BIRDS_LIST_COLUMNS_CONFIG.map(
  column => column.name as GridColumn
);
