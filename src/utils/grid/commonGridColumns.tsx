import * as React from "react";
import { DataGridCol } from "../../components/table/DataGrid";
import { labels } from "../../config/i18n/labels";
import { IndexCell } from "./cellRenderers/IndexCell";
import { VerificationCell } from "./cellRenderers/VerificationCell";
import { GridColumn } from "./columnsConfig";

export const COMMON_GRID_COLUMNS: { [key in GridColumn]: DataGridCol<any> } = {
  [GridColumn.id]: {
    name: GridColumn.id,
    title: labels.idx,
    getCellValue: IndexCell
  },
  [GridColumn.species]: {
    name: GridColumn.species,
    title: labels.species,
    getCellValue: r => r.colorRing
  },
  [GridColumn.verified]: {
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
      }
    }
  },
  [GridColumn.sex]: {
    name: GridColumn.sex,
    title: labels.sex,
    getCellValue: () => null
  },
  [GridColumn.ring]: {
    name: GridColumn.ring,
    title: labels.generalIdentificationMethod,
    getCellValue: () => null
  },
  [GridColumn.status]: {
    name: GridColumn.status,
    title: labels.status,
    getCellValue: r => r.note
  },
  [GridColumn.condition]: {
    name: GridColumn.condition,
    title: labels.condition,
    getCellValue: r => r.note
  },
  [GridColumn.placeName]: {
    name: GridColumn.placeName,
    title: labels.placeName,
    getCellValue: r => r.placeName
  },
  [GridColumn.date]: {
    name: GridColumn.date,
    title: labels.date,
    getCellValue: r => new Date(r.date).toLocaleString()
  },
  [GridColumn.direction]: {
    name: GridColumn.direction,
    title: labels.direction,
    getCellValue: r => r.direction
  },
  [GridColumn.distance]: {
    name: GridColumn.distance,
    title: labels.distance,
    getCellValue: r => r.distance
  },
  [GridColumn.finder]: {
    name: GridColumn.finder,
    title: labels.finder,
    getCellValue: r => (
      <>
        {r.finder.firstName}
        {r.finder.lastName}
      </>
    ),
    filter: {
      getLabel: ({ value }) =>
        // @ts-ignore
        `${value.firstName || ""}${
          // @ts-ignore
          value.firstName ? " " : ""
          // @ts-ignore
        }${value.lastName || ""}`,
      // @ts-ignore
      getValue: ({ value }) => value.id
    }
  },
  [GridColumn.elapsedTime]: {
    name: GridColumn.elapsedTime,
    title: labels.elapsedTime,
    getCellValue: r => r.elapsedTime
  },
  [GridColumn.remarks]: {
    name: GridColumn.remarks,
    title: labels.remark,
    getCellValue: r => r.remarks
  }
};
