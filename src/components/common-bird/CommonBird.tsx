import React, { FC, Fragment, useCallback, useState } from "react";
import {
  Button,
  ButtonGroup,
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
  const [birdLeg, setBirdLeg] = useState(null);

  const toggleModal = useCallback(() => setIsOpen(!isOpened), [isOpened]);

  const onChangeCoordinates = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "coordinates" }),
    [onChangeFormValue]
  );

  const onChangeDateTime = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "dateTime" }),
    [onChangeFormValue]
  );

  const onChangeIdentification = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "identification" }),
    [onChangeFormValue]
  );

  const onChangeComment = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "comment" }),
    [onChangeFormValue]
  );

  const onChangeRingInfo = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "ringInfo" }),
    [onChangeFormValue]
  );

  const onChangeNumberInBase = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "numberInBase" }),
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
            label: item.desc_rus || item.desc_eng || item[key] || item.country,
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
      <div className={`${blockName}__fields-container--white`}>
        <div className={`${blockName}__column--indent`}>
          <BlockHeader
            title={labels.addObservation.circumstancesAndPlaceTitle}
          />
          <div className={`${blockName}__row`}>
            <div className={`${blockName}__field-container--group`}>
              <Label for="dateTime" className={`${blockName}__field-label`}>
                {
                  labels.addObservation.circumstancesAndPlaceFields
                    .observationDateAndTime
                }
              </Label>
              <Input
                className={`${blockName}__input-date-time`}
                id="day"
                placeholder={
                  labels.addObservation.circumstancesAndPlaceFields
                    .dayPlaceholder
                }
                onChange={onChangeDateTime}
                value={formValues.day && formValues.day.label}
                disabled={viewMode}
              />
              <Input
                className={`${blockName}__input-date-time`}
                id="month"
                placeholder={
                  labels.addObservation.circumstancesAndPlaceFields
                    .monthPlaceholder
                }
                onChange={onChangeDateTime}
                value={formValues.month && formValues.month.label}
                disabled={viewMode}
              />
              <Input
                className={`${blockName}__input-date-time--year`}
                id="year"
                placeholder={
                  labels.addObservation.circumstancesAndPlaceFields
                    .yearPlaceholder
                }
                onChange={onChangeDateTime}
                value={formValues.month && formValues.month.label}
                disabled={viewMode}
              />
              <Input
                className={`${blockName}__input-date-time`}
                id="hour"
                placeholder={
                  labels.addObservation.circumstancesAndPlaceFields
                    .hourPlaceholder
                }
                onChange={onChangeDateTime}
                value={formValues.hour && formValues.hour.label}
                disabled={viewMode}
              />
              <Input
                className={`${blockName}__input-date-time`}
                id="minute"
                placeholder={
                  labels.addObservation.circumstancesAndPlaceFields
                    .minutePlaceholder
                }
                onChange={onChangeDateTime}
                value={formValues.minute && formValues.minute.label}
                disabled={viewMode}
              />
            </div>
            <Field
              label={
                labels.addObservation.circumstancesAndPlaceFields.accuracyOfDate
              }
              placeholder={
                labels.addObservation.circumstancesAndPlaceFields
                  .accuracyOfDatePlaceholder
              }
              collection={getCollection(InitialData.accuracyOfDate)}
              onChangeValue={onChangeFormValue}
              type="accuracyOfDate"
              value={
                formValues.accuracyOfDate && formValues.accuracyOfDate.label
              }
              disabled={viewMode}
            />
          </div>
          <Field
            label={labels.addObservation.circumstancesAndPlaceFields.placeCode}
            placeholder={
              labels.addObservation.circumstancesAndPlaceFields
                .placeCodePlaceholder
            }
            collection={getCollection(InitialData.placeCode)}
            onChangeValue={onChangeFormValue}
            type="placeCode"
            value={formValues.placeCode && formValues.placeCode.label}
            disabled={viewMode}
          />
          <div className={`${blockName}__row`}>
            <div className={`${blockName}__field-container--group`}>
              <Label for="coordinates" className={`${blockName}__field-label`}>
                {labels.addObservation.circumstancesAndPlaceFields.coordinates}
              </Label>
              <Input
                className={`${blockName}__input-coords`}
                id="latitude"
                placeholder={
                  labels.addObservation.circumstancesAndPlaceFields.latitude
                }
                onChange={onChangeCoordinates}
                value={formValues.latitude && formValues.latitude.label}
                disabled={viewMode}
              />
              <Input
                className={`${blockName}__input-coords`}
                id="longitude"
                placeholder={
                  labels.addObservation.circumstancesAndPlaceFields.longitude
                }
                onChange={onChangeCoordinates}
                value={formValues.longitude && formValues.longitude.label}
                disabled={viewMode}
              />
            </div>
            <Field
              label={
                labels.addObservation.circumstancesAndPlaceFields
                  .accuracyOfCoordinates
              }
              placeholder={
                labels.addObservation.circumstancesAndPlaceFields
                  .accuracyOfCoordinatesPlaceholder
              }
              collection={getCollection(InitialData.accuracyOfCoordinates)}
              onChangeValue={onChangeFormValue}
              type="accuracyOfCoordinates"
              value={
                formValues.accuracyOfCoordinates &&
                formValues.accuracyOfCoordinates.label
              }
              disabled={viewMode}
            />
          </div>
          <Field
            label={
              labels.addObservation.circumstancesAndPlaceFields.circumstances
            }
            placeholder={
              labels.addObservation.circumstancesAndPlaceFields
                .circumstancesPlaceholder
            }
            collection={getCollection(InitialData.circumstances)}
            onChangeValue={onChangeFormValue}
            type="circumstances"
            value={formValues.circumstances && formValues.circumstances.label}
            disabled={viewMode}
          />
          <Field
            label={
              labels.addObservation.circumstancesAndPlaceFields
                .circumstancesPresumed
            }
            placeholder={
              labels.addObservation.circumstancesAndPlaceFields
                .circumstancesPresumedPlaceholder
            }
            collection={getCollection(InitialData.circumstancesPresumed)}
            onChangeValue={onChangeFormValue}
            type="circumstances"
            value={
              formValues.circumstances && formValues.circumstancesPresumed.label
            }
            disabled={viewMode}
          />
        </div>
        <div className={`${blockName}__column`}>
          <Map
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
      <div className={`${blockName}__info-blocks-container`}>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={
            <BlockHeader title={labels.addObservation.markInfoTitle} />
          }
        >
          <div className={`${blockName}__fields-container`}>
            <div className={`${blockName}__column`}>
              <Field
                label={
                  labels.addObservation.markInfoFields
                    .primaryIdentificationMethod
                }
                placeholder={
                  labels.addObservation.markInfoFields
                    .primaryIdentificationMethodPlaceholder
                }
                collection={getCollection(
                  InitialData.primaryIdentificationMethod
                )}
                onChangeValue={onChangeFormValue}
                type="primaryIdentificationMethod"
                value={
                  formValues.primaryIdentificationMethod &&
                  formValues.primaryIdentificationMethod.label
                }
                disabled={viewMode}
              />
              <div className={`${blockName}__row`}>
                <div className={`${blockName}__field-container--group`}>
                  <Label for="ringInfo" className={`${blockName}__field-label`}>
                    {labels.addObservation.markInfoFields.ringNumber}
                  </Label>
                  <Input
                    className={`${blockName}__input--ring-number`}
                    id="ringSeria"
                    placeholder={
                      labels.addObservation.markInfoFields.ringSeriesPlaceholder
                    }
                    onChange={onChangeRingInfo}
                    value={formValues.ringSeria && formValues.ringSeria.label}
                    disabled={viewMode}
                  />
                  <Input
                    className={`${blockName}__input--ring-number`}
                    id="ringNumber"
                    placeholder={
                      labels.addObservation.markInfoFields.numberPlaceholder
                    }
                    onChange={onChangeRingInfo}
                    value={formValues.ringNumber && formValues.ringNumber.label}
                    disabled={viewMode}
                  />
                </div>
                <div className={`${blockName}__field-container--simple`}>
                  <Label
                    for="numberInBase"
                    className={`${blockName}__field-label`}
                  >
                    {labels.addObservation.markInfoFields.numberInBase}
                  </Label>
                  <Input
                    className={`${blockName}__input`}
                    id="numberInBase"
                    placeholder={
                      labels.addObservation.markInfoFields.numberPlaceholder
                    }
                    onChange={onChangeNumberInBase}
                    value={
                      formValues.numberInBase && formValues.numberInBase.label
                    }
                    disabled={viewMode}
                  />
                </div>
                <Field
                  label={
                    labels.addObservation.markInfoFields
                      .verificationOfTheMetalRing
                  }
                  placeholder={
                    labels.addObservation.markInfoFields
                      .verificationOfTheMetalRingPlaceholder
                  }
                  collection={getCollection(
                    InitialData.verificationOfTheMetalRing
                  )}
                  onChangeValue={onChangeFormValue}
                  type="verificationOfTheMetalRing"
                  value={
                    formValues.verificationOfTheMetalRing &&
                    formValues.verificationOfTheMetalRing.label
                  }
                  disabled={viewMode}
                />
              </div>
              <Field
                label={labels.addObservation.markInfoFields.ringingScheme}
                placeholder={
                  labels.addObservation.markInfoFields.ringingSchemePlaceholder
                }
                collection={getCollection(InitialData.ringingScheme)}
                onChangeValue={onChangeFormValue}
                type="ringingScheme"
                value={
                  formValues.ringingScheme && formValues.ringingScheme.label
                }
                disabled={viewMode}
              />
            </div>
            <div className={`${blockName}__column`}>
              <div className={`${blockName}__row`}>
                <Field
                  label={
                    labels.addObservation.markInfoFields.metalRingInformation
                  }
                  placeholder={
                    labels.addObservation.markInfoFields
                      .metalRingInformationPlaceholder
                  }
                  collection={getCollection(InitialData.metalRingInformation)}
                  onChangeValue={onChangeFormValue}
                  type="metalRingInformation"
                  value={
                    formValues.metalRingInformation &&
                    formValues.metalRingInformation.label
                  }
                  disabled={viewMode}
                />
                <div className={`${blockName}__button-group`}>
                  <p className={`${blockName}__field-label`}>
                    {labels.addObservation.markInfoFields.leg}
                  </p>
                  <ButtonGroup>
                    <Button
                      outline
                      onClick={() =>
                        setBirdLeg(labels.addObservation.markInfoFields.left)
                      }
                    >
                      {labels.addObservation.markInfoFields.left}
                    </Button>
                    <Button
                      outline
                      onClick={() =>
                        setBirdLeg(labels.addObservation.markInfoFields.right)
                      }
                    >
                      {labels.addObservation.markInfoFields.right}
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              <Field
                label={
                  labels.addObservation.markInfoFields.otherMarksInformation
                }
                placeholder={
                  labels.addObservation.markInfoFields
                    .otherMarksInformationPlaceholder
                }
                collection={getCollection(InitialData.otherMarksInformation)}
                onChangeValue={onChangeFormValue}
                type="otherMarksInformation"
                value={
                  formValues.otherMarksInformation &&
                  formValues.otherMarksInformation.label
                }
                disabled={viewMode}
              />
            </div>
          </div>
        </InfoContainer>
      </div>
      <div className={`${blockName}__info-blocks-container`}>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={
            <BlockHeader
              title={labels.addObservation.otherObservationInfoTitle}
            />
          }
        >
          <div className={`${blockName}__fields-container--column`}>
            <div className={`${blockName}__column`}>
              <Label for="observer" className={`${blockName}__field-label`}>
                {labels.addObservation.otherObservationFields.observer}
              </Label>
              <Input
                className={`${blockName}__input`}
                id="observer"
                placeholder={
                  labels.addObservation.otherObservationFields
                    .observerPlaceholder
                }
                onChange={onChangeCoordinates}
                value={formValues.observer && formValues.observer.label}
                disabled={viewMode}
              />
              <Label for="eMail" className={`${blockName}__field-label`}>
                {labels.addObservation.otherObservationFields.eMail}
              </Label>
              <Input
                className={`${blockName}__input`}
                id="eMail"
                placeholder={
                  labels.addObservation.otherObservationFields.eMailPlaceholder
                }
                onChange={onChangeCoordinates}
                value={formValues.eMail && formValues.eMail.label}
                disabled={viewMode}
              />
              <Label
                for="observationPlace"
                className={`${blockName}__field-label`}
              >
                {labels.addObservation.otherObservationFields.observationPlace}
              </Label>
              <Input
                className={`${blockName}__input`}
                id="observationPlace"
                placeholder={
                  labels.addObservation.otherObservationFields
                    .observationPlacePlaceholder
                }
                onChange={onChangeCoordinates}
                value={
                  formValues.observationPlace &&
                  formValues.observationPlace.label
                }
                disabled={viewMode}
              />
            </div>
            <div className={`${blockName}__column`}>
              <Label for="comment" className={`${blockName}__field-label`}>
                {labels.addObservation.observationsFields.comment}
              </Label>
              <Input
                className={sn(
                  `${blockName}__input`,
                  `${blockName}__input--area`
                )}
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
            </div>
          </div>
        </InfoContainer>
      </div>
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
            id="latitude1"
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
            id="longitude1"
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
