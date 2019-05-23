import React, { FC, ButtonHTMLAttributes } from "react";
import sn from "classnames";

import { labels } from "../../config/i18n/labels";

import "./Bird.scss";

const blockName = "bird";
const birdImg = require("../../assets/bird.svg");

interface InfoBlock {
  title: string;
  value: string | number;
  className?: string;
  isEdit?: boolean;
  btnClassName?: string;
}

interface BirdParams {
  neck: string;
  saddle: string;
  rightWing: string;
  leftWing: string;
  leftAboveKnee: string;
  rightAboveKnee: string;
  leftBelowKnee: string;
  rightBelowKnee: string;
}

interface Bird {
  isEdit?: boolean;
  birdParams?: BirdParams;
}

interface PlusButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const InfoBlock = function({
  title,
  value,
  className,
  isEdit,
  btnClassName
}: InfoBlock) {
  return isEdit ? (
    <PlusButton className={btnClassName} />
  ) : (
    <div className={className}>
      <p className={`${blockName}__info-title`}>{title}</p>
      <p className={`${blockName}__info-value`}>{value}</p>
    </div>
  );
};

const PlusButton = function({ className, ...props }: PlusButton) {
  return (
    <button
      {...props}
      type="button"
      className={sn(`${blockName}__btn-plus`, className)}
    >
      +
    </button>
  );
};

export const Bird: FC<Bird> = ({ isEdit, birdParams }) => (
  <div className={`${blockName}__bird-container`}>
    <span className={`${blockName}__dashed-line-neck`} />
    <InfoBlock
      title={labels.birdInfo.bird.neck}
      value={birdParams.neck}
      className={`${blockName}__neck-info`}
      isEdit={isEdit}
      btnClassName={`${blockName}__neck-info-btn`}
    />
    <span className={`${blockName}__dashed-line-saddle`} />
    <InfoBlock
      title={labels.birdInfo.bird.saddle}
      value={birdParams.saddle}
      className={`${blockName}__saddle-info`}
      isEdit={isEdit}
      btnClassName={`${blockName}__saddle-info-btn`}
    />
    <span className={`${blockName}__dashed-line-right-wing`} />
    <InfoBlock
      title={labels.birdInfo.bird.rightWing}
      value={birdParams.rightWing}
      className={`${blockName}__right-wing-info`}
      isEdit={isEdit}
      btnClassName={`${blockName}__right-wing-info-btn`}
    />
    <span className={`${blockName}__dashed-line-left-wing`} />
    <InfoBlock
      title={labels.birdInfo.bird.leftWing}
      value={birdParams.leftWing}
      className={`${blockName}__left-wing-info`}
      isEdit={isEdit}
      btnClassName={`${blockName}__left-wing-info-btn`}
    />
    <span className={`${blockName}__dashed-line-left-knee`} />
    <InfoBlock
      title={labels.birdInfo.bird.rightAboveKnee}
      value={birdParams.rightAboveKnee}
      className={`${blockName}__left-knee-info`}
      isEdit={isEdit}
      btnClassName={`${blockName}__left-knee-info-btn`}
    />
    <span className={`${blockName}__dashed-line-right-knee`} />
    <InfoBlock
      title={labels.birdInfo.bird.leftAboveKnee}
      value={birdParams.leftAboveKnee}
      className={`${blockName}__right-knee-info`}
      isEdit={isEdit}
      btnClassName={`${blockName}__right-knee-info-btn`}
    />
    <span className={`${blockName}__dashed-line-right-below-knee`} />
    <InfoBlock
      title={labels.birdInfo.bird.rightBelowKnee}
      value={birdParams.rightBelowKnee}
      className={`${blockName}__right-below-knee-info`}
      isEdit={isEdit}
      btnClassName={`${blockName}__right-below-knee-info-btn`}
    />
    <span className={`${blockName}__dashed-line-left-below-knee`} />
    <InfoBlock
      title={labels.birdInfo.bird.leftBelowKnee}
      value={birdParams.leftBelowKnee}
      className={`${blockName}__left-below-knee-info`}
      isEdit={isEdit}
      btnClassName={`${blockName}__left-below-knee-info-btn`}
    />
    <img className={`${blockName}__bird-img`} src={birdImg} alt="bird" />
  </div>
);

Bird.defaultProps = {
  isEdit: false
};
