import { intersection } from "ramda";

export enum GridColumn {
  id = "id",
  verified = "verified",
  firstName = "firstName",
  lastName = "lastName"
}

export const defaultColumnWidths: { [key in GridColumn]: number } = {
  id: 100,
  verified: 180,
  firstName: 200,
  lastName: 300
};

export const getColumnWidths = (cols: GridColumn[]) =>
  cols.map(c => ({
    columnName: c,
    width: defaultColumnWidths[c]
  }));

export const defaultFixedColumns = [GridColumn.id, GridColumn.verified];

export const getFixedColumns = (cols: GridColumn[]) =>
  intersection(cols, defaultFixedColumns);
