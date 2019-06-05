import { intersection, sum } from "ramda";
import { SELECTOR_COLUMN_WIDTH } from "../../components/table/customisations/TableSelectionComponent";

export enum GridColumn {
  id = "id",
  verified = "verified",
  sex = "sex",
  ring = "ring",
  species = "species",
  status = "status",
  condition = "condition",
  remarks = "remarks",
  placeName = "placeName",
  direction = "direction",
  distance = "distance",
  finder = "finder",
  elapsedTime = "elapsedTime",
  date = "date"
}

export interface GridColumnWidth {
  columnName: GridColumn;
  width: number;
}

export const defaultColumnWidths: { [key in GridColumn]: number } = {
  id: 100,
  verified: 180,
  sex: 100,
  ring: 220,
  species: 200,
  status: 170,
  condition: 300,
  remarks: 300,
  placeName: 300,
  direction: 300,
  distance: 300,
  finder: 300,
  elapsedTime: 300,
  date: 300
};

export const getColumnWidths = (cols: GridColumn[]): GridColumnWidth[] =>
  cols.map(c => ({
    columnName: c,
    width: defaultColumnWidths[c]
  }));

export const defaultFixedColumns = [
  GridColumn.id,
  GridColumn.species,
  GridColumn.verified
];

export const getFixedColumns = (cols: GridColumn[]) =>
  intersection(cols, defaultFixedColumns);

export const getFixedPartWidth = (
  columnWidths: GridColumnWidth[],
  fixedColumns: GridColumn[]
) => {
  return (
    sum(
      columnWidths
        .filter(cw => fixedColumns.includes(cw.columnName))
        .map(({ width }) => width)
    ) + SELECTOR_COLUMN_WIDTH
  );
};
