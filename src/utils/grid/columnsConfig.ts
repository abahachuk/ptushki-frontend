import { intersection, sum } from "ramda";
import { SELECTOR_COLUMN_WIDTH } from "../../components/table/customisations/TableSelectionComponent";
import { ColumnWidth } from "../../components/table/DataGridModels";
import { GridColumn } from "./GridColumn";

const DEFAULT_COL_WIDTH = 200;

const COL_WIDTH_OVERRIDES: { [key in GridColumn]?: number } = {
  id: 100,
  verified: 180,
  sexMentioned: 150,
  sexConcluded: 150,
  ringMentioned: 220,
  status: 170,
  condition: 300,
  remarks: 300,
  placeName: 300,
  direction: 150,
  distance: 200,
  elapsedTime: 180,
  finder: 300
};

export const getColumnWidths = (cols: GridColumn[]): ColumnWidth[] =>
  cols.map(c => ({
    columnName: c,
    width: COL_WIDTH_OVERRIDES[c] || DEFAULT_COL_WIDTH
  }));

export const defaultFixedColumns = [
  GridColumn.id,
  GridColumn.speciesConcluded,
  GridColumn.verified
];

export const getFixedColumns = (cols: GridColumn[]) =>
  intersection(cols, defaultFixedColumns);

export const getFixedPartWidth = (
  columnWidths: ColumnWidth[],
  fixedColumns: GridColumn[]
) => {
  return (
    sum(
      columnWidths
        .filter(cw => fixedColumns.includes(cw.columnName as GridColumn))
        .map(({ width }) => width)
    ) + SELECTOR_COLUMN_WIDTH
  );
};
