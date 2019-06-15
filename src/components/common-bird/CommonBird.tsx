import React, { FC, useState, useCallback, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import {
  Autosuggest,
  IAutosuggest,
  IChangeValue
} from "../autosuggest/Autosuggest";

import { Map } from "../map/Map";

import { labels } from "../../config/i18n/labels";

import { Bird, IBird } from "../bird/Bird";
import { InfoContainer } from "../info-container/InfoContainer";
import { DropZone } from "../drag-n-drop/DragAndDrop";

import "./CommonBird.scss";

const blockName = "common-bird";

interface CollectionItem {
  value: string;
  id: number;
  label: string;
}

interface PhotoItem {
  url: string;
  id: number;
}

export interface FormValues {
  species: string;
  sex: string;
  age: string;
  state: string;
  country: string;
  region: string;
  coordinates: string;
  timeError: string;
  comment: string;
}

interface CommonBird extends IBird {
  observationConfig: {
    birdSpecies: Array<CollectionItem>;
    sex: Array<CollectionItem>;
    age: Array<CollectionItem>;
    birdState: Array<CollectionItem>;
    photos: Array<PhotoItem>;
    comment: string;
  };
  circumstancesConfig: {
    country: Array<CollectionItem>;
    region: Array<CollectionItem>;
    coordinates: string;
    timeDate: string;
    timeError: Array<CollectionItem>;
  };
  birdConfig: {
    neck: Array<CollectionItem>;
    saddle: Array<CollectionItem>;
    leftWing: Array<CollectionItem>;
    rightWing: Array<CollectionItem>;
    leftBobbin: Array<CollectionItem>;
    rightBobbin: Array<CollectionItem>;
    leftLeg: Array<CollectionItem>;
    rightLeg: Array<CollectionItem>;
  };
  onChangeBirdValues: (birdParams: any) => void;
  onChangeFormValue: ({ value, type }: IChangeValue) => void;
  formValues: FormValues;
}

interface BlockHeader {
  title: string;
  subtitle: string;
}

interface Field extends IAutosuggest {
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
      <Autosuggest {...props} />
    </div>
  );
};

export const CommonBird: FC<CommonBird> = ({
  observationConfig,
  circumstancesConfig,
  birdConfig,
  onChangeBirdValues,
  birdParams,
  onChangeFormValue,
  formValues,
  viewMode
}) => {
  const [isOpened, setIsOpen] = useState(false);

  const toggleModal = useCallback(() => setIsOpen(!isOpened), [isOpened]);

  const onChangeCoordinates = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "coordinates" }),
    [onChangeFormValue]
  );

  const onChangeComment = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "comment" }),
    [onChangeFormValue]
  );

  return (
    <Fragment>
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
      <Bird
        birdParams={birdParams}
        birdConfig={birdConfig}
        onChangeBirdValues={onChangeBirdValues}
        viewMode={viewMode}
      />
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
            collection={observationConfig.birdSpecies}
            onChangeValue={onChangeFormValue}
            type="species"
            value={formValues.species}
            disabled={viewMode}
          />
          <Field
            label={labels.addObservation.observationsFields.sex}
            placeholder={
              labels.addObservation.observationsFields.sexPlaceholder
            }
            collection={observationConfig.sex}
            onChangeValue={onChangeFormValue}
            type="sex"
            value={formValues.sex}
            disabled={viewMode}
          />
          <Field
            label={labels.addObservation.observationsFields.age}
            placeholder={
              labels.addObservation.observationsFields.agePlaceholder
            }
            collection={observationConfig.age}
            onChangeValue={onChangeFormValue}
            type="age"
            value={formValues.age}
            disabled={viewMode}
          />
          <Field
            label={labels.addObservation.observationsFields.birdState}
            placeholder={
              labels.addObservation.observationsFields.birdStatePlaceholder
            }
            collection={observationConfig.birdState}
            onChangeValue={onChangeFormValue}
            type="state"
            value={formValues.state}
            disabled={viewMode}
          />
          <p className={`${blockName}__field-label`}>
            {labels.addObservation.observationsFields.photos}
          </p>
          <DropZone />
          <Label for="comment" className={`${blockName}__field-label`}>
            {labels.addObservation.observationsFields.comment}
          </Label>
          <Input
            className={`${blockName}__input`}
            id="comment"
            type="textarea"
            placeholder={
              labels.addObservation.observationsFields.commentPlaceholder
            }
            onChange={onChangeComment}
            value={formValues.comment}
            disabled={viewMode}
          />
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
            collection={circumstancesConfig.country}
            onChangeValue={onChangeFormValue}
            type="country"
            value={formValues.country}
            disabled={viewMode}
          />
          <Field
            label={labels.addObservation.circumstancesFields.region}
            placeholder={
              labels.addObservation.circumstancesFields.regionPlaceholder
            }
            collection={circumstancesConfig.region}
            onChangeValue={onChangeFormValue}
            type="region"
            value={formValues.region}
            disabled={viewMode}
          />
          <Label for="coordinates" className={`${blockName}__field-label`}>
            {labels.addObservation.circumstancesFields.coordinates}
          </Label>
          <Input
            className={`${blockName}__input`}
            id="coordinates"
            placeholder={
              labels.addObservation.circumstancesFields.coordinatesPlaceholder
            }
            onChange={onChangeCoordinates}
            value={formValues.coordinates}
            disabled={viewMode}
          />
          <Button
            outline
            color="primary"
            className={`${blockName}__find-btn`}
            onClick={toggleModal}
          >
            {labels.addObservation.circumstancesFields.findOnMap}
          </Button>
          <div className={`${blockName}__separator`} />
          <Field
            label={labels.addObservation.circumstancesFields.timeDelta}
            placeholder={
              labels.addObservation.circumstancesFields.timeDeltaPlaceholder
            }
            collection={circumstancesConfig.timeError}
            onChangeValue={onChangeFormValue}
            type="timeError"
            value={formValues.timeError}
            disabled={viewMode}
          />
        </InfoContainer>
      </div>
    </Fragment>
  );
};
