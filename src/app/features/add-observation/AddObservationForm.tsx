import React, { FC } from "react";
import { Button } from "reactstrap";

import { Bird } from "../../../components/bird/Bird";
import {
  CustomDropdown,
  ICustomDropdown
} from "../../../components/dropdown/Dropdown";
import { DropZone } from "../../../components/drag-n-drop/DragAndDrop";

import { birdData } from "../bird-info/test-data";

import { InfoContainer } from "../../../components/info-container/InfoContainer";
import { labels } from "../../../config/i18n/labels";

import "./AddObservation.scss";

const blockName = "add-observation";

interface BlockHeader {
  title: string;
  subtitle: string;
}

interface Field extends ICustomDropdown {
  label: string;
}

const BlockHeader = function({ title, subtitle }: BlockHeader) {
  return (
    <div className={`${blockName}__block-header-container`}>
      <p className={`${blockName}__block-header-title`}>{title}</p>
      <p className={`${blockName}__block-header-subtitle`}>{subtitle}</p>
    </div>
  );
};

const Field = function({ label, ...props }: Field) {
  return (
    <div className={`${blockName}__field-container`}>
      <p className={`${blockName}__field-label`}>{label}</p>
      <CustomDropdown {...props} />
    </div>
  );
};

export const AddObservation: FC<{
  birdInfo: any;
}> = () => {
  return (
    <div className={blockName}>
      <h1 className={`${blockName}__title`}>{labels.addObservation.title}</h1>
      <p className={`${blockName}__subtitle`}>
        {labels.addObservation.subTitle}
      </p>
      <Bird isEdit birdParams={birdData.params} />
      <div className={`${blockName}__info-blocks-container`}>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={
            <BlockHeader
              title={labels.addObservation.observationsTitle}
              subtitle={labels.addObservation.observationsSubtitle}
            />
          }
        >
          <Field
            label={labels.addObservation.observationsFields.birdSpecies}
            placeholder={
              labels.addObservation.observationsFields.birdSpeciesPlaceholder
            }
          />
          <Field
            label={labels.addObservation.observationsFields.sex}
            placeholder={
              labels.addObservation.observationsFields.sexPlaceholder
            }
          />
          <Field
            label={labels.addObservation.observationsFields.age}
            placeholder={
              labels.addObservation.observationsFields.agePlaceholder
            }
          />
          <Field
            label={labels.addObservation.observationsFields.birdState}
            placeholder={
              labels.addObservation.observationsFields.birdStatePlaceholder
            }
          />
          <p className={`${blockName}__field-label`}>
            {labels.addObservation.observationsFields.photos}
          </p>
          <DropZone />
        </InfoContainer>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={
            <BlockHeader
              title={labels.addObservation.circumstancesTitle}
              subtitle={labels.addObservation.circumstancesSubtitle}
            />
          }
        >
          <Field
            label={labels.addObservation.circumstancesFields.country}
            placeholder={
              labels.addObservation.circumstancesFields.countryPlaceholder
            }
          />
          <Field
            label={labels.addObservation.circumstancesFields.region}
            placeholder={
              labels.addObservation.circumstancesFields.regionPlaceholder
            }
          />
          <Field
            label={labels.addObservation.circumstancesFields.coordinates}
            placeholder={
              labels.addObservation.circumstancesFields.coordinatesPlaceholder
            }
          />
          <Button outline color="primary" className={`${blockName}__find-btn`}>
            {labels.addObservation.circumstancesFields.findOnMap}
          </Button>
          <div className={`${blockName}__separator`} />
          <Field
            label={labels.addObservation.circumstancesFields.timeAndDate}
            placeholder={
              labels.addObservation.circumstancesFields.timeAndDatePlaceholder
            }
          />
          <Field
            label={labels.addObservation.circumstancesFields.timeDelta}
            placeholder={
              labels.addObservation.circumstancesFields.timeDeltaPlaceholder
            }
          />
        </InfoContainer>
      </div>
      <div className={`${blockName}__buttons`}>
        <Button className={`${blockName}__back-btn`}>
          {labels.addObservation.back}
        </Button>
        <Button className={`${blockName}__send-btn`}>
          {labels.addObservation.sendObservation}
        </Button>
      </div>
    </div>
  );
};
