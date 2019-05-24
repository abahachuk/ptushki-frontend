import React, { useState, useCallback } from "react";
import sn from "classnames";
import { useDropzone } from "react-dropzone";

import "./DragAndDrop.scss";

const blockName = "drag-and-drop";

export const DropZone = () => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = () => setImages([...images, reader.result]);
        reader.readAsDataURL(file);
      });
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`${blockName}__container`}>
      <input {...getInputProps()} />
      {images.map((img: string, idx: number) => (
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
