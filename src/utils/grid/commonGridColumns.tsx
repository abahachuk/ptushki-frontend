import * as React from "react";
import { DataGridCol } from "../../components/table/DataGrid";
import { labels } from "../../config/i18n/labels";
import { IndexCell } from "./cellRenderers/IndexCell";
import { VerificationCell } from "./cellRenderers/VerificationCell";
import { GridColumn } from "./GridColumn";

export const COMMON_GRID_COLUMNS: { [key in GridColumn]: DataGridCol<any> } = {
  id: {
    name: GridColumn.id,
    title: labels.idx,
    getCellValue: IndexCell
  },
  species: {
    name: GridColumn.species,
    title: labels.species,
    getCellValue: r => r.colorRing
  },
  verified: {
    name: GridColumn.verified,
    title: labels.verification.title,
    getCellValue: r => <VerificationCell observation={r} />,
    filter: {
      getLabel: ({ value }) => {
        if (value === true) {
          return labels.verification.verified;
        }
        if (value === false) {
          return labels.verification.rejected;
        }
        return labels.verification.pending;
      },
      getValue: ({ value }) => value.toString()
    }
  },
  sex: {
    name: GridColumn.sex,
    title: labels.sex,
    getCellValue: () => null
  },
  ring: {
    name: GridColumn.ring,
    title: labels.generalIdentificationMethod,
    getCellValue: () => null
  },
  status: {
    name: GridColumn.status,
    title: labels.status,
    getCellValue: r => r.note
  },
  condition: {
    name: GridColumn.condition,
    title: labels.condition,
    getCellValue: r => r.note
  },
  placeName: {
    name: GridColumn.placeName,
    title: labels.placeName,
    getCellValue: r => r.placeName
  },
  date: {
    name: GridColumn.date,
    title: labels.date,
    getCellValue: r => new Date(r.date).toLocaleString()
  },
  direction: {
    name: GridColumn.direction,
    title: labels.direction,
    getCellValue: r => r.direction
  },
  distance: {
    name: GridColumn.distance,
    title: labels.distance,
    getCellValue: r => r.distance
  },
  finder: {
    name: GridColumn.finder,
    title: labels.finder,
    getCellValue: r => (
      <>
        {r.finder.firstName}
        {r.finder.lastName}
      </>
    ),
    filter: {
      // TODO type DataGridFilter to allow any or generic value as it actually does, instead of restricting it
      getLabel: ({ value }: any) =>
        `${value.firstName || ""}${
          value.firstName ? " " : ""
        }${value.lastName || ""}`,
      getValue: ({ value }: any) => value.id
    }
  },
  elapsedTime: {
    name: GridColumn.elapsedTime,
    title: labels.elapsedTime,
    getCellValue: r => r.elapsedTime
  },
  remarks: {
    name: GridColumn.remarks,
    title: labels.remark,
    getCellValue: r => r.remarks
  }
};
