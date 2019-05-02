import React, { FC, Fragment } from "react";
import { Button } from "reactstrap";
import { BirdInfo } from "./BirdInfoModel";
import { InfoContainer } from "../../../components/info-container/InfoContainer";
import { labels } from "../../../config/i18n/labels";

import { ringingData, photos, birdData } from "./test-data";

import "./BirdInfo.scss";

const blockName = "bird-info";
const bird = require("../../../assets/bird.svg");

// TODO: remove it with integration
interface InfoBlock {
  title: string;
  value: string | number;
  className?: string;
}

// TODO: change it with integration
interface Image {
  src: string;
  altText: string;
  id: number;
}

const InfoBlock = function({ title, value, className }: InfoBlock) {
  return (
    <div className={className}>
      <p className={`${blockName}__info-title`}>{title}</p>
      <p className={`${blockName}__info-value`}>{value}</p>
    </div>
  );
};

const renderImage = function({ src, altText, id }: Image) {
  return (
    <img key={id} src={src} alt={altText} className={`${blockName}__photo`} />
  );
};

export const BirdInfoForm: FC<{
  birdInfo: BirdInfo;
}> = () => {
  return (
    <div className={blockName}>
      <div className={`${blockName}__header`}>
        <h1 className={`${blockName}__title`}>{birdData.name}</h1>
        <Button outline className={`${blockName}__btn`}>
          {labels.birdInfo.export}
        </Button>
        <Button outline className={`${blockName}__btn`}>
          {labels.birdInfo.edit}
        </Button>
        <Button outline className={`${blockName}__btn`}>
          {labels.birdInfo.delete}
        </Button>
      </div>
      <p className={`${blockName}__subtitle`}>{birdData.code}</p>
      <p className={`${blockName}__euring-title`}>{labels.birdInfo.euring}</p>
      <span className={`${blockName}__euring`}>{birdData.euring}</span>
      <div className={`${blockName}__bird-container`}>
        <span className={`${blockName}__dashed-line-neck`} />
        <InfoBlock
          title={labels.birdInfo.bird.neck}
          value={birdData.params.neck}
          className={`${blockName}__neck-info`}
        />
        <span className={`${blockName}__dashed-line-saddle`} />
        <InfoBlock
          title={labels.birdInfo.bird.saddle}
          value={birdData.params.saddle}
          className={`${blockName}__saddle-info`}
        />
        <span className={`${blockName}__dashed-line-right-wing`} />
        <InfoBlock
          title={labels.birdInfo.bird.rightWing}
          value={birdData.params.rightWing}
          className={`${blockName}__right-wing-info`}
        />
        <span className={`${blockName}__dashed-line-left-wing`} />
        <InfoBlock
          title={labels.birdInfo.bird.leftWing}
          value={birdData.params.leftWing}
          className={`${blockName}__left-wing-info`}
        />
        <span className={`${blockName}__dashed-line-left-knee`} />
        <InfoBlock
          title={labels.birdInfo.bird.rightAboveKnee}
          value={birdData.params.rightAboveKnee}
          className={`${blockName}__left-knee-info`}
        />
        <span className={`${blockName}__dashed-line-right-knee`} />
        <InfoBlock
          title={labels.birdInfo.bird.leftAboveKnee}
          value={birdData.params.leftAboveKnee}
          className={`${blockName}__right-knee-info`}
        />
        <span className={`${blockName}__dashed-line-right-below-knee`} />
        <InfoBlock
          title={labels.birdInfo.bird.rightBelowKnee}
          value={birdData.params.rightBelowKnee}
          className={`${blockName}__right-below-knee-info`}
        />
        <span className={`${blockName}__dashed-line-left-below-knee`} />
        <InfoBlock
          title={labels.birdInfo.bird.leftBelowKnee}
          value={birdData.params.leftBelowKnee}
          className={`${blockName}__left-below-knee-info`}
        />
        <img className={`${blockName}__bird-img`} src={bird} alt="bird" />
      </div>
      <div className={`${blockName}__info-blocks-container`}>
        <InfoContainer
          title={labels.birdInfo.ringingTitle}
          className={`${blockName}__info-block`}
          renderButton={
            <Button outline color="primary">
              {labels.birdInfo.addRing}
            </Button>
          }
        >
          {ringingData.map(({ title, value, id }) => (
            <InfoBlock key={id} title={title} value={value} />
          ))}
        </InfoContainer>
        <InfoContainer
          title={labels.birdInfo.birdTitle}
          className={`${blockName}__info-block`}
        >
          {ringingData.map(({ title, value, id }) => (
            <InfoBlock key={id} title={title} value={value} />
          ))}
        </InfoContainer>
        <InfoContainer
          title={labels.birdInfo.observationTime}
          className={`${blockName}__info-block`}
        >
          {ringingData.map(({ title, value, id }) => (
            <InfoBlock key={id} title={title} value={value} />
          ))}
        </InfoContainer>
      </div>
      <p className={`${blockName}__photos-title`}>{labels.birdInfo.photos}</p>
      <div>{photos.map(renderImage)}</div>
    </div>
  );
};
