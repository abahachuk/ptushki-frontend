import { intersection } from "ramda";

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
  date = "date"
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
  date: 300
};

export const getColumnWidths = (cols: GridColumn[]) =>
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
