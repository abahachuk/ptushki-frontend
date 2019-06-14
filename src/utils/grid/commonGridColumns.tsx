import * as React from "react";
import { ObservationData } from "../../app/features/observations/models";
import { EuringAndDescriptionCell } from "../../components/grid/EuringAndDescriptionCell";
import { DataGridCol } from "../../components/table/DataGrid";
import { labels } from "../../config/i18n/labels";
import { IndexCell } from "./cellRenderers/IndexCell";
import { VerificationCell } from "./cellRenderers/VerificationCell";
import { GridColumn } from "./GridColumn";

export const COMMON_GRID_COLUMNS: {
  [key in GridColumn]: DataGridCol<ObservationData>
} = {
  id: {
    name: GridColumn.id,
    title: labels.idx,
    getCellValue: IndexCell
  },
  species: {
    name: GridColumn.species,
    title: labels.species,
    getCellValue: r => <EuringAndDescriptionCell {...r.speciesConcluded} />
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
    getCellValue: r => <EuringAndDescriptionCell {...r.sexConcluded} />
  },
  ring: {
    name: GridColumn.primaryIdentificationMethod,
    title: labels.generalIdentificationMethod,
    getCellValue: r => (
      <EuringAndDescriptionCell {...r.ring.primaryIdentificationMethod} />
    )
  },
  status: {
    name: GridColumn.status,
    title: labels.status,
    getCellValue: r => <EuringAndDescriptionCell {...r.status} />
  },
  condition: {
    name: GridColumn.condition,
    title: labels.condition,
    getCellValue: r => <EuringAndDescriptionCell {...r.condition} />
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
        {r.finder.firstName} {r.finder.lastName}
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
