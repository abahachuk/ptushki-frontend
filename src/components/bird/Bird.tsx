import React, { FC, ButtonHTMLAttributes, useState, useCallback } from "react";
import { Label, Input } from "reactstrap";
import sn from "classnames";

import { Autosuggest } from "../../components/autosuggest/Autosuggest";

import { labels } from "../../config/i18n/labels";

import "./Bird.scss";

const blockName = "bird";
const birdImg = require("../../assets/bird.svg");
const deleteImg = require("../../assets/delete.svg");
const plusBtn = require("../../assets/plus.svg");

const DEFAULT_NUMBER_OF_LABELS = 1;

type ChangeFunction = ({
  value,
  type,
  index
}: {
  value: string;
  type: string;
  index: number;
}) => void;

interface BirdValue {
  labelType: string;
  value: string;
  id: number;
}

interface EditForm {
  value: BirdValue;
  index: number;
  onSelect: ChangeFunction;
  type: string;
  onChange: ChangeFunction;
  withPlus?: boolean;
  onAdd?: (type: string) => void;
  onDelete?: (type: string, i: number) => void;
  viewMode: boolean;
}

interface InfoBlock {
  className?: string;
  viewMode?: boolean;
  btnClassName?: string;
  values?: Array<BirdValue>;
  type?: string;
  onSelect?: ChangeFunction;
  onChange?: ChangeFunction;
  single?: boolean;
  onAdd?: (type: string) => void;
  onDelete?: (type: string, i: number) => void;
  maxLabels?: number;
}

interface BirdParams {
  [key: string]: Array<BirdValue>;
}

interface Bird {
  viewMode?: boolean;
  birdParams?: BirdParams;
}

interface PlusButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const PlusButton = function({ className, ...props }: PlusButton) {
  return (
    <button
      {...props}
      type="button"
      className={sn(`${blockName}__btn-plus`, className)}
    >
      <img src={plusBtn} alt="" />
    </button>
  );
};

const EditForm = function({
  value,
  index,
  onSelect,
  type,
  onChange,
  withPlus,
  onAdd,
  onDelete,
  viewMode
}: EditForm) {
  const onSelectValue = ({ type, value }: { type: string; value: string }) =>
    onSelect({ type, value, index });
  const onChangeValue = (e: React.FormEvent<HTMLInputElement>) =>
    onChange({ type, value: e.currentTarget.value, index });
  const onAddLabel = () => onAdd(type);
  const onDeleteLabel = () => onDelete(type, index);

  return (
    <div className={`${blockName}__edit-form`}>
      <div>
        <Label for="label-type" className={`${blockName}__field-label`}>
          {labels.addObservation.labelType}
        </Label>
        <Autosuggest
          id="label-type"
          collection={[
            { value: "123", label: "123", id: 1 },
            { value: "123", label: "123", id: 2 }
          ]}
          placeholder={labels.addObservation.labelType}
          className={`${blockName}__autosuggest`}
          value={value.labelType}
          onChangeValue={onSelectValue}
          disabled={viewMode}
          type={type}
        />
      </div>
      <div className={`${blockName}__input-container`}>
        <Label for="label-number" className={`${blockName}__field-label`}>
          {labels.addObservation.number}
        </Label>
        <Input
          id="label-number"
          placeholder={labels.addObservation.number}
          className={`${blockName}__input-field`}
          value={value.value}
          onChange={onChangeValue}
          disabled={viewMode}
        />
      </div>
      {!viewMode && (
        <button
          onClick={onDeleteLabel}
          type="button"
          className={`${blockName}__btn-delete`}
        >
          <img src={deleteImg} alt="" />
        </button>
      )}
      {withPlus && !viewMode && (
        <PlusButton
          className={`${blockName}__plus-edit`}
          onClick={onAddLabel}
        />
      )}
    </div>
  );
};

const InfoBlock = ({
  className,
  viewMode,
  btnClassName,
  values,
  type,
  onSelect,
  onChange,
  onAdd,
  onDelete,
  single,
  maxLabels = DEFAULT_NUMBER_OF_LABELS
}: InfoBlock) => {
  return !values.length ? (
    <PlusButton onClick={() => onAdd(type)} className={btnClassName} />
  ) : (
    <div className={className}>
      {values.map((value, i) => (
        <EditForm
          onSelect={onSelect}
          value={value}
          key={value.id}
          index={i}
          type={type}
          onChange={onChange}
          onAdd={onAdd}
          onDelete={onDelete}
          withPlus={i === 0 && !single && values.length < maxLabels}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export const Bird: FC<Bird> = ({ viewMode, birdParams }) => {
  const [bird, setBirdAttributes] = useState(birdParams);

  const onSelect = useCallback(
    ({ value, type, index }) => {
      const newBird = bird;
      newBird[type][index].labelType = value;
      setBirdAttributes({ ...newBird });
    },
    [bird, setBirdAttributes]
  );

  const onChange = useCallback(
    ({ value, type, index }) => {
      const newBird = bird;
      newBird[type][index].value = value;
      setBirdAttributes({ ...newBird });
    },
    [bird, setBirdAttributes]
  );

  const addLabel = (type: string) => {
    setBirdAttributes({
      ...bird,
      [type]: [
        ...bird[type],
        { labelType: "", value: "", id: bird[type].length }
      ]
    });
  };

  const deleteLabel = (type: string, i: number) => {
    setBirdAttributes({
      ...bird,
      // @ts-ignore
      [type]: bird[type].filter((_, idx) => idx !== i)
    });
  };

  return (
    <div className={`${blockName}__bird-container`}>
      <span className={`${blockName}__dashed-line-neck`} />
      <InfoBlock
        className={`${blockName}__neck-info`}
        viewMode={viewMode}
        btnClassName={`${blockName}__neck-info-btn`}
        values={bird.neck}
        type="neck"
        onSelect={onSelect}
        onChange={onChange}
        onAdd={addLabel}
        onDelete={deleteLabel}
        single
      />
      <span className={`${blockName}__dashed-line-saddle`} />
      <InfoBlock
        className={`${blockName}__saddle-info`}
        viewMode={viewMode}
        btnClassName={`${blockName}__saddle-info-btn`}
        values={bird.saddle}
        type="saddle"
        onSelect={onSelect}
        onChange={onChange}
        onAdd={addLabel}
        onDelete={deleteLabel}
        single
      />
      <span className={`${blockName}__dashed-line-right-wing`} />
      <InfoBlock
        className={`${blockName}__right-wing-info`}
        viewMode={viewMode}
        btnClassName={`${blockName}__right-wing-info-btn`}
        values={bird.rightWing}
        type="rightWing"
        onSelect={onSelect}
        onChange={onChange}
        onAdd={addLabel}
        onDelete={deleteLabel}
        single
      />
      <span className={`${blockName}__dashed-line-left-wing`} />
      <InfoBlock
        className={`${blockName}__left-wing-info`}
        viewMode={viewMode}
        btnClassName={`${blockName}__left-wing-info-btn`}
        values={bird.leftWing}
        type="leftWing"
        onSelect={onSelect}
        onChange={onChange}
        onAdd={addLabel}
        onDelete={deleteLabel}
        single
      />
      <span className={`${blockName}__dashed-line-right-knee`} />
      <InfoBlock
        className={`${blockName}__right-knee-info`}
        viewMode={viewMode}
        btnClassName={`${blockName}__right-knee-info-btn`}
        values={bird.rightBobbin}
        type="rightBobbin"
        onSelect={onSelect}
        onChange={onChange}
        onDelete={deleteLabel}
        onAdd={addLabel}
        maxLabels={5}
      />
      <span className={`${blockName}__dashed-line-left-knee`} />
      <InfoBlock
        className={`${blockName}__left-knee-info`}
        viewMode={viewMode}
        btnClassName={`${blockName}__left-knee-info-btn`}
        values={bird.leftBobbin}
        type="leftBobbin"
        onSelect={onSelect}
        onChange={onChange}
        onDelete={deleteLabel}
        onAdd={addLabel}
        maxLabels={5}
      />
      <span className={`${blockName}__dashed-line-right-below-knee`} />
      <InfoBlock
        className={`${blockName}__right-below-knee-info`}
        viewMode={viewMode}
        btnClassName={`${blockName}__right-below-knee-info-btn`}
        values={bird.rightLeg}
        type="rightLeg"
        onSelect={onSelect}
        onChange={onChange}
        onDelete={deleteLabel}
        onAdd={addLabel}
        maxLabels={4}
      />
      <span className={`${blockName}__dashed-line-left-below-knee`} />
      <InfoBlock
        className={`${blockName}__left-below-knee-info`}
        viewMode={viewMode}
        btnClassName={`${blockName}__left-below-knee-info-btn`}
        values={bird.leftLeg}
        type="leftLeg"
        onSelect={onSelect}
        onChange={onChange}
        onDelete={deleteLabel}
        onAdd={addLabel}
        maxLabels={4}
      />
      <img className={`${blockName}__bird-img`} src={birdImg} alt="bird" />
    </div>
  );
};

Bird.defaultProps = {
  viewMode: false,
  birdParams: {
    saddle: [],
    neck: [],
    leftWing: [],
    rightWing: [],
    leftBobbin: [],
    rightBobbin: [],
    leftLeg: [],
    rightLeg: []
  }
};
