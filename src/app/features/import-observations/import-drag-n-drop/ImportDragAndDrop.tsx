import React, { useState, useEffect, useCallback, FC, MouseEvent } from "react";
import sn from "classnames";
import { Close } from "@material-ui/icons";
import { Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { labels } from "../../../../config/i18n/labels";
import { DropAreaStates, DropZoneProps } from "../models";
import "./ImportDragAndDrop.scss";

const blockName = "import-drag-and-drop";

export const DropZone: FC<DropZoneProps> = ({
  dragAreaState,
  onFileLoaded,
  revertDragAreaToIntact,
  Icon,
  title,
  subtitle,
  FileActionButton
}) => {
  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[acceptedFiles.length - 1];
      const reader = new FileReader();
      reader.onload = () =>
        onFileLoaded({
          fileContent: reader.result,
          fileName: file.name,
          fileSize: `${Math.round(file.size / 1000)} kb`
        });
      reader.readAsDataURL(file);
    },
    [onFileLoaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onCloseClick = (e: MouseEvent) => {
    e.stopPropagation();
    revertDragAreaToIntact();
  };

  return (
    <div {...(dragAreaState !== DropAreaStates.Success ? getRootProps() : {})}>
      <input
        {...(dragAreaState !== DropAreaStates.Success
          ? getInputProps()
          : { hidden: true })}
      />
      <div
        className={sn(
          blockName,
          `${blockName}__${dragAreaState}`,
          isDragActive && `${blockName}__drag-active`
        )}
      >
        {dragAreaState === DropAreaStates.Fail ? (
          <Button
            className={`${blockName}__close-button`}
            onClick={onCloseClick}
          >
            <Close
              className={`${blockName}__close-button-icon`}
              fontSize="small"
            />
          </Button>
        ) : null}
        <Icon />
        <span className={`${blockName}__title`}>{title}</span>
        <span className={`${blockName}__subtitle`}>{subtitle}</span>
        <FileActionButton />
      </div>
    </div>
  );
};
