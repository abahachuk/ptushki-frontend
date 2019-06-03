import React, { useState, FC, useCallback } from "react";
import {
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { Bird } from "../../../components/bird/Bird";
import { Map } from "../../../components/map/Map";

import {
  Autosuggest,
  IAutosuggest,
  IChangeValue
} from "../../../components/autosuggest/Autosuggest";

import { DropZone } from "../../../components/drag-n-drop/DragAndDrop";

import { birdData } from "../bird-info/test-data";

import { InfoContainer } from "../../../components/info-container/InfoContainer";
import { labels } from "../../../config/i18n/labels";

import {
  birdSpecies,
  birdSex,
  birdAge,
  birdState,
  country,
  region,
  timeError
} from "./test.data";

import "./AddObservation.scss";

const blockName = "add-observation";

interface BlockHeader {
  title: string;
  subtitle: string;
}

interface Field extends IAutosuggest {
  label: string;
}

interface IBirdInfo {
  [s: string]: string;
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
      <Autosuggest {...props} />
    </div>
  );
};

export const AddObservation: FC<{
  birdInfo: any;
}> = () => {
  const [observation, seObservationInfo] = useState<IBirdInfo>({});
  const [isOpened, setIsOpen] = useState(false);

  const toggleModal = useCallback(() => setIsOpen(!isOpened), [isOpened]);

  const onChangeValue = useCallback(
    ({ value, type }: IChangeValue) =>
      seObservationInfo({ ...observation, [type]: value }),
    [observation]
  );

  return (
    <div className={blockName}>
      <Modal isOpen={isOpened} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {labels.addObservation.selectOnMap}
        </ModalHeader>
        <ModalBody>
          <Map
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            {labels.addObservation.setPlace}
          </Button>
        </ModalFooter>
      </Modal>
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
            collection={birdSpecies}
            onChangeValue={onChangeValue}
            type="species"
            value={observation.species}
          />
          <Field
            label={labels.addObservation.observationsFields.sex}
            placeholder={
              labels.addObservation.observationsFields.sexPlaceholder
            }
            collection={birdSex}
            onChangeValue={onChangeValue}
            type="sex"
            value={observation.sex}
          />
          <Field
            label={labels.addObservation.observationsFields.age}
            placeholder={
              labels.addObservation.observationsFields.agePlaceholder
            }
            collection={birdAge}
            onChangeValue={onChangeValue}
            type="age"
            value={observation.age}
          />
          <Field
            label={labels.addObservation.observationsFields.birdState}
            placeholder={
              labels.addObservation.observationsFields.birdStatePlaceholder
            }
            collection={birdState}
            onChangeValue={onChangeValue}
            type="state"
            value={observation.state}
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
            collection={country}
            onChangeValue={onChangeValue}
            type="country"
            value={observation.country}
          />
          <Field
            label={labels.addObservation.circumstancesFields.region}
            placeholder={
              labels.addObservation.circumstancesFields.regionPlaceholder
            }
            collection={region}
            onChangeValue={onChangeValue}
            type="region"
            value={observation.region}
          />
          <Label for="coordinates" className={`${blockName}__field-label`}>
            {labels.addObservation.circumstancesFields.coordinates}
          </Label>
          <Input
            id="coordinates"
            placeholder={
              labels.addObservation.circumstancesFields.coordinatesPlaceholder
            }
          />
          {/* <Field
            label={labels.addObservation.circumstancesFields.coordinates}
            placeholder={
              labels.addObservation.circumstancesFields.coordinatesPlaceholder
            }
          /> */}
          <Button
            outline
            color="primary"
            className={`${blockName}__find-btn`}
            onClick={toggleModal}
          >
            {labels.addObservation.circumstancesFields.findOnMap}
          </Button>
          <div className={`${blockName}__separator`} />
          {/* <Field
            label={labels.addObservation.circumstancesFields.timeAndDate}
            placeholder={
              labels.addObservation.circumstancesFields.timeAndDatePlaceholder
            }
          /> */}
          <Field
            label={labels.addObservation.circumstancesFields.timeDelta}
            placeholder={
              labels.addObservation.circumstancesFields.timeDeltaPlaceholder
            }
            collection={timeError}
            onChangeValue={onChangeValue}
            type="timeError"
            value={observation.timeError}
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
