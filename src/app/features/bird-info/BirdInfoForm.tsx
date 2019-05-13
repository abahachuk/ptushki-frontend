import React, { FC } from "react";
import { Button } from "reactstrap";

import { InfoBlock, Bird } from "../../../components/bird/Bird";

import { BirdInfo } from "./BirdInfoModel";
import { InfoContainer } from "../../../components/info-container/InfoContainer";
import { labels } from "../../../config/i18n/labels";

import { ringingData, photos, birdData } from "./test-data";

import "./BirdInfo.scss";

const blockName = "bird-info";

interface Image {
  src: string;
  altText: string;
  id: number;
}

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
      <Bird birdParams={birdData.params} />
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
