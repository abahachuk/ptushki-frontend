import React, { FC, Fragment, useCallback, useState } from "react";
import { Button, Input, Label } from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import sn from "classnames";
import { Autosuggest } from "../autosuggest/Autosuggest";
import { InfoContainer } from "../info-container/InfoContainer";
import { Map } from "../map/Map";
import { labels } from "../../config/i18n/labels";
import { IBlockHeader, ICommonBird, IField } from "./CommonBirdModels";

import "./CommonBird.scss";
import {
  IInitialDataDescriptor,
  InitialData
} from "../../app/features/create-page/models";
import { TabsGroup } from "../tabs-group/TabsGroup";

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
  onChangeFormValue,
  formValues,
  viewMode,
  observationsLabels,
  circumstancesLabels,
  manipulationsLabels,
  marksLabels,
  ringsLabels,
  initialValues,
  isExtendedForm
}) => {
  const [markLeg, setLeg] = useState(null);

  const onChangeCoordinates = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "coordinates" }),
    [onChangeFormValue]
  );

  const onChangeDateTime = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: e.target.id }),
    [onChangeFormValue]
  );

  const onChangeLegSide = useCallback(
    e => {
      onChangeFormValue({ value: e.target.dataset.type, type: "leg" });
      setLeg(e.target.dataset.type);
    },
    [onChangeFormValue]
  );

  const onChangeRingData = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: e.target.id }),
    [onChangeFormValue]
  );

  const onChangeComment = useCallback(
    e => onChangeFormValue({ value: e.target.value, type: "comment" }),
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
      <div className={`${blockName}__info-blocks-container`}>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={<BlockHeader {...marksLabels} />}
        >
          <div className={`${blockName}__info-block-content`}>
            {isExtendedForm && (
              <Field
                label={labels.addObservation.marksField.primaryMethod}
                placeholder={labels.addObservation.marksField.primaryMethod}
                collection={getCollection(
                  InitialData.verificationOfTheMetalRing // - TODO: sync with BE
                )}
                onChangeValue={onChangeFormValue}
                type="verificationOfTheMetalRing"
                value={
                  formValues.primaryMethod && formValues.primaryMethod.label
                }
                disabled={viewMode}
              />
            )}
            <div className={`${blockName}__info-block-content-row`}>
              <div className={`${blockName}__info-block-content-column`}>
                <Label for="date" className={`${blockName}__field-label`}>
                  {labels.addObservation.marksField.ringId}
                </Label>
                <Input
                  className={`${blockName}__input_medium`}
                  id="series"
                  placeholder={
                    labels.addObservation.marksField.ringSeriesPlaceholder
                  }
                  onChange={onChangeRingData}
                  value={formValues.day && formValues.day.label}
                  disabled={viewMode}
                />
                <Input
                  className={`${blockName}__input_medium`}
                  id="number"
                  placeholder={
                    labels.addObservation.marksField.ringNumberPlaceholder
                  }
                  onChange={onChangeRingData}
                  value={formValues.month && formValues.month.label}
                  disabled={viewMode}
                />
              </div>
              <div className={`${blockName}__info-block-content-column`}>
                <Field
                  label={
                    labels.addObservation.marksField.verificationOfTheMetalRing
                  }
                  placeholder={
                    labels.addObservation.marksField.verificationOfTheMetalRing
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
            </div>
            <Field
              label={labels.addObservation.marksField.ringingScheme}
              placeholder={labels.addObservation.marksField.ringingScheme}
              collection={getCollection(InitialData.ringingScheme)}
              onChangeValue={onChangeFormValue}
              type="ringingScheme"
              value={formValues.ringingScheme && formValues.ringingScheme.label}
              disabled={viewMode}
            />
          </div>
          <div className={`${blockName}__info-block-content`}>
            <div className={`${blockName}__info-block-content-row`}>
              <Field
                label={labels.addObservation.marksField.ringInfo}
                placeholder={labels.addObservation.marksField.ringInfo}
                collection={getCollection(InitialData.statusOfRing)}
                onChangeValue={onChangeFormValue}
                type="statusOfRing"
                value={formValues.ringInfo && formValues.ringInfo.label}
                disabled={viewMode}
              />
              <div className={`${blockName}__info-block-content-column`}>
                <Label for="leg" className={`${blockName}__field-label`}>
                  {labels.addObservation.marksField.leg}
                </Label>
                <TabsGroup className={`${blockName}__tabs-group`}>
                  <Button
                    className={sn(markLeg === "left" && "active")}
                    data-type="left"
                    onClick={onChangeLegSide}
                  >
                    {labels.addObservation.marksField.legLeft}
                  </Button>
                  <Button
                    className={sn(markLeg === "right" && "active")}
                    data-type="right"
                    onClick={onChangeLegSide}
                  >
                    {labels.addObservation.marksField.legRight}
                  </Button>
                </TabsGroup>
              </div>
            </div>
            {isExtendedForm && (
              <Field
                label={labels.addObservation.marksField.statusOfRing}
                placeholder={labels.addObservation.marksField.statusOfRing}
                collection={getCollection(
                  InitialData.statusOfRing // - TODO: sync with BE
                )}
                onChangeValue={onChangeFormValue}
                type="statusOfRing"
                value={
                  formValues.primaryMethod && formValues.primaryMethod.label
                }
                disabled={viewMode}
              />
            )}
            <Field
              label={labels.addObservation.marksField.otherMarksInfo}
              placeholder={labels.addObservation.marksField.otherMarksInfo}
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
        </InfoContainer>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={<BlockHeader {...observationsLabels} />}
        >
          <div className={`${blockName}__info-block-content`}>
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
            {isExtendedForm && (
              <Field
                label={labels.addObservation.observationsFields.broodSize}
                placeholder={labels.addObservation.observationsFields.broodSize}
                collection={getCollection(InitialData.broodSize)}
                onChangeValue={onChangeFormValue}
                type="broodSize"
                value={
                  formValues.primaryMethod && formValues.primaryMethod.label
                }
                disabled={viewMode}
              />
            )}
          </div>
          <div className={`${blockName}__info-block-content`}>
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
              label={labels.addObservation.observationsFields.birdStatus}
              placeholder={
                labels.addObservation.observationsFields.birdStatusPlaceholder
              }
              collection={getCollection(InitialData.status)}
              onChangeValue={onChangeFormValue}
              type="status"
              value={formValues.status && formValues.status.label}
              disabled={viewMode}
            />
            {isExtendedForm && (
              <div className={`${blockName}__info-block-content-row`}>
                <Field
                  label={labels.addObservation.observationsFields.broodAge}
                  placeholder={
                    labels.addObservation.observationsFields.broodAge
                  }
                  collection={getCollection(InitialData.accuracyOfDate)} // - TODO: sync with BE
                  onChangeValue={onChangeFormValue}
                  type="accuracyOfDate"
                  value={formValues.broodAge && formValues.broodAge.label}
                  disabled={viewMode}
                />
                <Field
                  label={
                    labels.addObservation.observationsFields.broodAgeAccuracy
                  }
                  placeholder={
                    labels.addObservation.observationsFields.broodAgeAccuracy
                  }
                  collection={getCollection(InitialData.accuracyOfDate)} // - TODO: sync with BE
                  onChangeValue={onChangeFormValue}
                  type="accuracyOfDate"
                  value={
                    formValues.broodAgeAccuracy &&
                    formValues.broodAgeAccuracy.label
                  }
                  disabled={viewMode}
                />
              </div>
            )}
          </div>
        </InfoContainer>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={<BlockHeader {...circumstancesLabels} />}
        >
          <div className={`${blockName}__info-block-content`}>
            <div className={`${blockName}__info-block-content-row`}>
              <div className={`${blockName}__info-block-content-column`}>
                <Label for="date" className={`${blockName}__field-label`}>
                  {labels.addObservation.circumstancesFields.dateTime}
                </Label>
                <Input
                  className={`${blockName}__input_narrow`}
                  id="day"
                  placeholder={
                    labels.addObservation.circumstancesFields.dayPlaceholder
                  }
                  onChange={onChangeDateTime}
                  value={formValues.day && formValues.day.label}
                  disabled={viewMode}
                />
                <Input
                  className={`${blockName}__input_narrow`}
                  id="month"
                  placeholder={
                    labels.addObservation.circumstancesFields.monthPlaceholder
                  }
                  onChange={onChangeDateTime}
                  value={formValues.month && formValues.month.label}
                  disabled={viewMode}
                />
                <Input
                  className={`${blockName}__input_narrow`}
                  id="year"
                  placeholder={
                    labels.addObservation.circumstancesFields.yearPlaceholder
                  }
                  onChange={onChangeDateTime}
                  value={formValues.year && formValues.year.label}
                  disabled={viewMode}
                />
                <span className={`${blockName}__spacer`}></span>
                <Input
                  className={`${blockName}__input_narrow`}
                  id="hours"
                  placeholder={
                    labels.addObservation.circumstancesFields.hoursPlaceholder
                  }
                  onChange={onChangeDateTime}
                  value={formValues.hours && formValues.hours.label}
                  disabled={viewMode}
                />
                <Input
                  className={`${blockName}__input_narrow`}
                  id="minutes"
                  placeholder={
                    labels.addObservation.circumstancesFields.minutesPlaceholder
                  }
                  onChange={onChangeDateTime}
                  value={formValues.minutes && formValues.minutes.label}
                  disabled={viewMode}
                />
              </div>
              {isExtendedForm && (
                <Field
                  label={labels.addObservation.circumstancesFields.dateDelta}
                  placeholder={
                    labels.addObservation.circumstancesFields
                      .dateDeltaPlaceholder
                  }
                  collection={getCollection(InitialData.accuracyOfDate)}
                  onChangeValue={onChangeFormValue}
                  type="accuracyOfDate"
                  value={
                    formValues.accuracyOfDate && formValues.accuracyOfDate.label
                  }
                  disabled={viewMode}
                />
              )}
            </div>
            <Field
              label={labels.addObservation.circumstancesFields.placeCode}
              placeholder={
                labels.addObservation.circumstancesFields.placeCodePlaceholder
              }
              collection={getCollection(InitialData.placeCode)}
              onChangeValue={onChangeFormValue}
              type="placeCode"
              value={formValues.placeCode && formValues.placeCode.label}
              disabled={viewMode}
            />
            <div className={`${blockName}__info-block-content-row`}>
              <div className={`${blockName}__info-block-content-column`}>
                <Label
                  for="coordinates"
                  className={`${blockName}__field-label`}
                >
                  {labels.addObservation.circumstancesFields.coordinates}
                </Label>
                <Input
                  className={`${blockName}__input_medium`}
                  id="latitude"
                  placeholder={
                    labels.addObservation.circumstancesFields.latitude
                  }
                  onChange={onChangeCoordinates}
                  value={formValues.latitude && formValues.latitude.label}
                  disabled={viewMode}
                />
                <Input
                  className={`${blockName}__input_medium`}
                  id="longitude"
                  placeholder={
                    labels.addObservation.circumstancesFields.longitude
                  }
                  onChange={onChangeCoordinates}
                  value={formValues.longitude && formValues.longitude.label}
                  disabled={viewMode}
                />
              </div>
              {isExtendedForm && (
                <Field
                  label={
                    labels.addObservation.circumstancesFields.coordinatesDelta
                  }
                  placeholder={
                    labels.addObservation.circumstancesFields
                      .coordinatesDeltaPlaceholder
                  }
                  collection={getCollection(InitialData.accuracyOfDate)}
                  onChangeValue={onChangeFormValue}
                  type="accuracyOfDate"
                  value={
                    formValues.accuracyOfCoordinates &&
                    formValues.accuracyOfCoordinates.label
                  }
                  disabled={viewMode}
                />
              )}
            </div>
            {isExtendedForm && (
              <>
                <Field
                  label={labels.addObservation.circumstancesTitle}
                  placeholder={labels.addObservation.circumstancesSubtitle}
                  collection={getCollection(InitialData.circumstances)}
                  onChangeValue={onChangeFormValue}
                  type="circumstances"
                  value={
                    formValues.circumstances && formValues.circumstances.label
                  }
                  disabled={viewMode}
                />
                <Field
                  label={
                    labels.addObservation.circumstancesFields
                      .accuracyOfCircumstances
                  }
                  placeholder={
                    labels.addObservation.circumstancesFields
                      .accuracyOfCircumstances
                  }
                  collection={getCollection(InitialData.circumstances)}
                  onChangeValue={onChangeFormValue}
                  type="circumstancesAccuracy"
                  value={
                    formValues.accuracyOfCircumstances &&
                    formValues.accuracyOfCircumstances.label
                  }
                  disabled={viewMode}
                />
              </>
            )}
          </div>
          <div className={`${blockName}__info-block-content`}>
            <Map
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div className={`${blockName}__info-block-map`}></div>
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </InfoContainer>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={<BlockHeader {...manipulationsLabels} />}
        >
          <div className={`${blockName}__info-block-content`}>
            <Field
              label={labels.addObservation.manilupationsField.manipulated}
              placeholder={labels.addObservation.manilupationsField.chooseValue}
              collection={getCollection(InitialData.manipulated)}
              onChangeValue={onChangeFormValue}
              type="manipulated"
              value={formValues.manipulated && formValues.manipulated.label}
              disabled={viewMode}
            />
            <Field
              label={
                labels.addObservation.manilupationsField.movedBeforeTheCapture
              }
              placeholder={labels.addObservation.manilupationsField.chooseValue}
              collection={getCollection(InitialData.movedBeforeTheCapture)}
              onChangeValue={onChangeFormValue}
              type="movedBeforeTheCapture"
              value={
                formValues.movedBeforeTheCapture &&
                formValues.movedBeforeTheCapture.label
              }
              disabled={viewMode}
            />
          </div>
          <div className={`${blockName}__info-block-content`}>
            <Field
              label={labels.addObservation.manilupationsField.catchingMethod}
              placeholder={labels.addObservation.manilupationsField.chooseValue}
              collection={getCollection(InitialData.catchingMethod)}
              onChangeValue={onChangeFormValue}
              type="catchingMethod"
              value={
                formValues.catchingMethod && formValues.catchingMethod.label
              }
              disabled={viewMode}
            />
            <Field
              label={labels.addObservation.manilupationsField.catchingLures}
              placeholder={labels.addObservation.manilupationsField.chooseValue}
              collection={getCollection(InitialData.catchingLures)}
              onChangeValue={onChangeFormValue}
              type="catchingLures"
              value={formValues.catchingLures && formValues.catchingLures.label}
              disabled={viewMode}
            />
          </div>
        </InfoContainer>
        <InfoContainer
          className={`${blockName}__info-block`}
          renderHeader={<BlockHeader {...ringsLabels} />}
        >
          <div className={`${blockName}__info-block-content`}>
            <Field
              label={labels.addObservation.bandingField.bander}
              placeholder={labels.addObservation.bandingField.banderPlaceholder}
              collection={getCollection(InitialData.catchingLures)} // - TODO: sync with BE
              onChangeValue={onChangeFormValue}
              type="bander"
              value={formValues.bander && formValues.bander.label}
              disabled={viewMode}
            />
            <Field
              label={labels.addObservation.bandingField.email}
              placeholder={labels.addObservation.bandingField.email}
              collection={getCollection(InitialData.catchingLures)} // - TODO: sync with BE
              onChangeValue={onChangeFormValue}
              type="email"
              value={formValues.email && formValues.email.label}
              disabled={viewMode}
            />
            <Field
              label={labels.addObservation.bandingField.bandingPlace}
              placeholder={labels.addObservation.bandingField.bandingPlace}
              collection={getCollection(InitialData.catchingLures)} // - TODO: sync with BE
              onChangeValue={onChangeFormValue}
              type="bandingPlace"
              value={formValues.bandingPlace && formValues.bandingPlace.label}
              disabled={viewMode}
            />
          </div>
          <div className={`${blockName}__info-block-content`}>
            <Label for="comment" className={`${blockName}__field-label`}>
              {labels.addObservation.bandingField.comment}
            </Label>
            <Input
              className={sn(`${blockName}__input`, `${blockName}__input--area`)}
              id="comment"
              type="textarea"
              rows={8}
              placeholder={
                labels.addObservation.bandingField.commentPlaceholder
              }
              onChange={onChangeComment}
              value={formValues.comment && formValues.comment.label}
              disabled={viewMode}
            />
          </div>
        </InfoContainer>
      </div>
    </Fragment>
  );
};
