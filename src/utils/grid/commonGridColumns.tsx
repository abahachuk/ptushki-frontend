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
  speciesMentioned: {
    name: GridColumn.speciesMentioned,
    title: labels.speciesMentioned,
    getCellValue: r => <EuringAndDescriptionCell {...r.speciesMentioned} />
  },
  speciesConcluded: {
    name: GridColumn.speciesConcluded,
    title: labels.species,
    getCellValue: r => <EuringAndDescriptionCell {...r.speciesConcluded} />
  },
  sexMentioned: {
    name: GridColumn.sexMentioned,
    title: labels.sexMentioned,
    getCellValue: r => <EuringAndDescriptionCell {...r.sexMentioned} />
  },
  sexConcluded: {
    name: GridColumn.sexConcluded,
    title: labels.sex,
    getCellValue: r => <EuringAndDescriptionCell {...r.sexConcluded} />
  },
  ageMentioned: {
    name: GridColumn.ageMentioned,
    title: labels.ageMentioned,
    getCellValue: r => <EuringAndDescriptionCell {...r.ageMentioned} />
  },
  ageConcluded: {
    name: GridColumn.ageConcluded,
    title: labels.age,
    getCellValue: r => <EuringAndDescriptionCell {...r.ageConcluded} />
  },
  circumstances: {
    name: GridColumn.circumstances,
    title: labels.circumstances,
    getCellValue: r => <EuringAndDescriptionCell {...r.circumstances} />
  },
  circumstancesPresumed: {
    name: GridColumn.circumstancesPresumed,
    title: labels.circumstancesPresumed,
    getCellValue: r => <EuringAndDescriptionCell {...r.circumstancesPresumed} />
  },
  manipulated: {
    name: GridColumn.manipulated,
    title: labels.manipulated,
    getCellValue: r => <EuringAndDescriptionCell {...r.manipulated} />
  },
  movedBeforeTheCapture: {
    name: GridColumn.movedBeforeTheCapture,
    title: labels.movedBeforeTheCapture,
    getCellValue: r => <EuringAndDescriptionCell {...r.movedBeforeTheCapture} />
  },
  catchingMethod: {
    name: GridColumn.catchingMethod,
    title: labels.catchingMethod,
    getCellValue: r => <EuringAndDescriptionCell {...r.catchingMethod} />
  },
  catchingLures: {
    name: GridColumn.catchingLures,
    title: labels.catchingLures,
    getCellValue: r => <EuringAndDescriptionCell {...r.catchingLures} />
  },
  pullusAge: {
    name: GridColumn.pullusAge,
    title: labels.pullusAge,
    getCellValue: r => <EuringAndDescriptionCell {...r.pullusAge} />
  },
  accuracyOfPullusAge: {
    name: GridColumn.accuracyOfPullusAge,
    title: labels.accuracyOfPullusAge,
    getCellValue: r => <EuringAndDescriptionCell {...r.accuracyOfPullusAge} />
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
  primaryIdentificationMethod: {
    name: GridColumn.primaryIdentificationMethod,
    title: labels.generalIdentificationMethod,
    getCellValue: r => (
      <EuringAndDescriptionCell {...r.ring.primaryIdentificationMethod} />
    )
  },
  ringMentioned: {
    name: GridColumn.ringMentioned,
    title: labels.ring,
    getCellValue: r => r.ringMentioned
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
  accuracyOfCoordinates: {
    name: GridColumn.accuracyOfCoordinates,
    title: labels.accuracyOfCoordinates,
    getCellValue: r => <EuringAndDescriptionCell {...r.accuracyOfCoordinates} />
  },
  date: {
    name: GridColumn.date,
    title: labels.date,
    getCellValue: r => new Date(r.date).toLocaleString()
  },
  accuracyOfDate: {
    name: GridColumn.accuracyOfDate,
    title: labels.accuracyOfDate,
    getCellValue: r => <EuringAndDescriptionCell {...r.accuracyOfDate} />
  },
  direction: {
    name: GridColumn.direction,
    title: labels.direction,
    getCellValue: r => (
      <>
        {r.direction} {labels.degreeSymbol}
      </>
    )
  },
  distance: {
    name: GridColumn.distance,
    title: labels.distance,
    getCellValue: r => (
      <>
        {r.distance} {labels.km}
      </>
    )
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
    getCellValue: r => (
      <>
        {r.elapsedTime} {labels.days}
      </>
    )
  },
  remarks: {
    name: GridColumn.remarks,
    title: labels.remark,
    getCellValue: r => r.remarks
  }
};
