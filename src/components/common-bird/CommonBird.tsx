import React, { FC, Fragment, useCallback, useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import sn from "classnames";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import { Autosuggest } from "../autosuggest/Autosuggest";
import { Bird } from "../bird/Bird";
import { InfoContainer } from "../info-container/InfoContainer";
import { DropZone } from "../drag-n-drop/DragAndDrop";
import { Map } from "../map/Map";
import { labels } from "../../config/i18n/labels";
import { IBlockHeader, ICommonBird, IField } from "./CommonBirdModels";

import "./CommonBird.scss";
import {
  IInitialDataDescriptor,
  InitialData
} from "../../app/features/create-page/models";

const blockName = "common-bird";

const BlockHeader = function({ title, subtitle }: IBlockHeader) {
  return (
    <div className={`${blockName}__block-header-container`}>
      <p className={`${blockName}__block-header-title`}>{title}</p>
      {subtitle && (
        <p className={`${blockName}__block-header-subtitle`}>{subtitle}</p>
      )}
    </div>
  );
};

const Field = function({ label, ...props }: IField) {
  return (
    <div className={`${blockName}__field-container`}>
      <p className={`${blockName}__field-label`}>{label}</p>
      <Autosuggest {...props} />
    </div>
  );
};

export const CommonBird: FC<ICommonBird> = ({
  onChangeBirdValues,
  birdParams,
  onChangeFormValue,
  formValues,
  viewMode,
  observationsLabels,
  circumstancesLabels,
  initialValues,
  collection,
  photos
}) => {
  const [isOpened, setIsOpen] = useState(false);
  const [calendarFocused, setCalendarFocused] = useState(false);

  const toggleModal = useCallback(() => setIsOpen(!isOpened), [isOpened]);

  const onChangeCoordinates = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "coordinates" }),
    [onChangeFormValue]
  );

  const onChangeComment = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "comment" }),
    [onChangeFormValue]
  );

  const onChangeDate = useCallback(
    date => onChangeFormValue({ value: date, type: "date" }),
    [onChangeFormValue]
  );

  const getCollection = useCallback(
    (key: InitialData) =>
      initialValues
        ? initialValues[key].map((item: IInitialDataDescriptor) => ({
            // TODO: use logic from localize service
            label: item.desc || item[key],
            value: item.value || item.id,
            id: item.id
          }))
        : [],
    [initialValues]
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
        onChangeBirdValues={onChangeBirdValues}
        viewMode={viewMode}
        collection={collection}
      />
      <div className={`${blockName}__info-blocks-container`}>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={<BlockHeader {...observationsLabels} />}
        >
          <Field
            label={labels.addObservation.observationsFields.birdSpecies}
            placeholder={
              labels.addObservation.observationsFields.birdSpeciesPlaceholder
            }
            collection={getCollection(InitialData.species)}
            onChangeValue={onChangeFormValue}
            type="speciesMentioned"
            value={
              formValues.speciesMentioned && formValues.speciesMentioned.label
            }
            disabled={viewMode}
          />
          <Field
            label={labels.addObservation.observationsFields.sex}
            placeholder={
              labels.addObservation.observationsFields.sexPlaceholder
            }
            collection={getCollection(InitialData.sex)}
            onChangeValue={onChangeFormValue}
            type="sexMentioned"
            value={formValues.sexMentioned && formValues.sexMentioned.label}
            disabled={viewMode}
          />
          <Field
            label={labels.addObservation.observationsFields.age}
            placeholder={
              labels.addObservation.observationsFields.agePlaceholder
            }
            collection={getCollection(InitialData.age)}
            onChangeValue={onChangeFormValue}
            type="ageMentioned"
            value={formValues.ageMentioned && formValues.ageMentioned.label}
            disabled={viewMode}
          />
          <Field
            label={labels.addObservation.observationsFields.birdState}
            placeholder={
              labels.addObservation.observationsFields.birdStatePlaceholder
            }
            collection={getCollection(InitialData.status)}
            onChangeValue={onChangeFormValue}
            type="status"
            value={formValues.status && formValues.status.label}
            disabled={viewMode}
          />
          <p className={`${blockName}__field-label`}>
            {labels.addObservation.observationsFields.photos}
          </p>
          <DropZone
            className={`${blockName}__field-container`}
            photos={photos}
          />
          <Label for="comment" className={`${blockName}__field-label`}>
            {labels.addObservation.observationsFields.comment}
          </Label>
          <Input
            className={sn(`${blockName}__input`, `${blockName}__input--area`)}
            id="comment"
            type="textarea"
            rows={3}
            placeholder={
              labels.addObservation.observationsFields.commentPlaceholder
            }
            onChange={onChangeComment}
            value={formValues.comment && formValues.comment.label}
            disabled={viewMode}
          />
        </InfoContainer>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={<BlockHeader {...circumstancesLabels} />}
        >
          <Field
            label={labels.addObservation.circumstancesFields.region}
            placeholder={
              labels.addObservation.circumstancesFields.regionPlaceholder
            }
            collection={getCollection(InitialData.placeCode)}
            onChangeValue={onChangeFormValue}
            type="placeCode"
            value={formValues.placeCode && formValues.placeCode.label}
            disabled={viewMode}
          />
          <Label for="coordinates" className={`${blockName}__field-label`}>
            {labels.addObservation.circumstancesFields.latitude}
          </Label>
          <Input
            className={`${blockName}__input`}
            id="latitude"
            placeholder={labels.addObservation.circumstancesFields.latitude}
            onChange={onChangeCoordinates}
            value={formValues.latitude && formValues.latitude.label}
            disabled={viewMode}
          />
          <Label for="coordinates" className={`${blockName}__field-label`}>
            {labels.addObservation.circumstancesFields.longitude}
          </Label>
          <Input
            className={`${blockName}__input`}
            id="longitude"
            placeholder={labels.addObservation.circumstancesFields.longitude}
            onChange={onChangeCoordinates}
            value={formValues.longitude && formValues.longitude.label}
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
          <div className={`${blockName}__field-container`}>
            <p className={`${blockName}__field-label`}>
              {labels.addObservation.circumstancesFields.timeAndDate}
            </p>
            <SingleDatePicker
              {...(formValues.date
                ? { date: moment(formValues.date && formValues.date.value) }
                : { date: formValues.date })}
              onDateChange={onChangeDate}
              focused={calendarFocused}
              onFocusChange={({ focused }) => setCalendarFocused(focused)}
              placeholder={
                labels.addObservation.circumstancesFields.timeAndDatePlaceholder
              }
              id="date"
              numberOfMonths={1}
              block
              showDefaultInputIcon
              inputIconPosition="after"
              isOutsideRange={() => false}
              {...(viewMode ? { disabled: true } : {})}
            />
          </div>
          <Field
            label={labels.addObservation.circumstancesFields.timeDelta}
            placeholder={
              labels.addObservation.circumstancesFields.timeDeltaPlaceholder
            }
            collection={getCollection(InitialData.accuracyOfDate)}
            onChangeValue={onChangeFormValue}
            type="accuracyOfDate"
            value={formValues.accuracyOfDate && formValues.accuracyOfDate.label}
            disabled={viewMode}
          />
        </InfoContainer>
      </div>
    </Fragment>
  );
};
