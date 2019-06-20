import React, { useState, useCallback, FC, useEffect } from "react";
import sn from "classnames";
import { useDropzone } from "react-dropzone";

import "./DragAndDrop.scss";

const blockName = "drag-and-drop";

interface IDropZone {
  className?: string;
  onDropFiles?: (files: Array<File>) => void;
  photos?: Array<string>;
}

export const DropZone: FC<IDropZone> = ({ className, onDropFiles, photos }) => {
  const [files, setFiles] = useState<Array<string>>(photos);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      onDropFiles(acceptedFiles);
      setFiles([
        ...files,
        ...acceptedFiles.map(file => URL.createObjectURL(file))
      ]);
    }
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file));
    },
    [files]
  );

  return (
    <div
      {...getRootProps()}
      className={sn(`${blockName}__container`, className)}
    >
      <input {...getInputProps()} />
      {files.map((img: string, idx: number) => (
        // eslint-disable-next-line
        <img key={idx} className={`${blockName}__img`} src={img} alt="" /> 
      ))}
      <div
        className={sn(blockName, isDragActive && `${blockName}__drag-active`)}
      >
        +
      </div>
    </div>
  );
};

DropZone.defaultProps = {
  onDropFiles: () => {},
  photos: []
};
