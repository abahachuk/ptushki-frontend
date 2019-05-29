import * as React from "react";
import { DataGridCol } from "../../../../components/table/DataGrid";
import { labels } from "../../../../config/i18n/labels";
import { GridColumn } from "../../../../utils/grid/columnsConfig";
import { ObservationData } from "../models";
import { IndexCell } from "./IndexCell";
import { VerificationCell } from "./VerificationCell";

export const OBSERVATION_LIST_COLUMNS_CONFIG: DataGridCol<ObservationData>[] = [
  { name: GridColumn.id, title: labels.idx, getCellValue: IndexCell },
  {
    name: GridColumn.species,
    title: labels.species,
    getCellValue: r => r.colorRing
  },
  {
    name: GridColumn.verified,
    title: labels.verification,
    getCellValue: r => <VerificationCell observation={r} />
  },
  {
    name: GridColumn.sex,
    title: labels.sex,
    getCellValue: () => null
  },
  {
    name: GridColumn.ring,
    title: labels.generalIdentificationMethod,
    getCellValue: () => null
  },
  {
    name: GridColumn.status,
    title: labels.status,
    getCellValue: r => r.note
  },
  {
    name: GridColumn.condition,
    title: labels.condition,
    getCellValue: r => r.note
  },
  {
    name: GridColumn.placeName,
    title: labels.placeName,
    getCellValue: r => r.placeName
  },
  {
    name: GridColumn.date,
    title: labels.date,
    getCellValue: r => new Date(r.date).toLocaleString()
  },
  {
    name: GridColumn.direction,
    title: labels.direction,
    getCellValue: r => r.direction
  },
  {
    name: GridColumn.distance,
    title: labels.distance,
    getCellValue: r => r.distance
  },
  {
    name: GridColumn.finder,
    title: labels.finder,
    getCellValue: r => (
      <>
        {r.finder.firstName} {r.finder.lastName}
      </>
    )
  },
  {
    name: GridColumn.elapsedTime,
    title: labels.elapsedTime,
    getCellValue: r => r.elapsedTime
  },
  {
    name: GridColumn.remarks,
    title: labels.remark,
    getCellValue: r => r.remarks
  }
];

export const OBSERVATION_GRID_COLUMN_NAMES = OBSERVATION_LIST_COLUMNS_CONFIG.map(
  column => column.name
);
