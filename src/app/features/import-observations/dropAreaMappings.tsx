import { CloudDone, CloudOff, CloudUpload } from "@material-ui/icons";
import sn from "classnames";
import React, { MouseEventHandler } from "react";
import { Button } from "reactstrap";
import { labels } from "../../../config/i18n/labels";
import { blockName } from "./ImportObservations";
import { DropAreaStates, LoadedFile, VaryingContent } from "./models";

export const dropZoneContent: {
  [id: string]: (fileInfo?: LoadedFile) => VaryingContent;
} = {
  [DropAreaStates.Intact]: () => ({
    Icon: () => <CloudUpload fontSize="large" />,
    title: labels.importObservations.dragFile,
    subtitle: labels.importObservations.or,
    FileActionButton: () => (
      <Button
        color="orange"
        className={sn("mt-3", "button", `${blockName}__import-button`)}
      >
        {labels.importObservations.chooseFile}
      </Button>
    ),
    FileInfoBlock: () => (
      <div className={`${blockName}__supported-formats`}>
        {labels.importObservations.supportedFormats}
      </div>
    )
  }),
  [DropAreaStates.Success]: (fileInfo: LoadedFile) => ({
    Icon: () => <CloudDone fontSize="large" />,
    title: labels.importObservations.fileUploaded,
    subtitle: `${fileInfo.fileName} — ${fileInfo.fileSize}`,
    FileActionButton: () => <></>,
    FileInfoBlock: () => (
      <div>{/* here will be file analysis result once implemented */}</div>
    )
  }),
  [DropAreaStates.Fail]: () => ({
    Icon: () => <CloudOff fontSize="large" />,
    title: labels.importObservations.wrongFile,
    subtitle: labels.importObservations.useTemplate,
    FileActionButton: () => (
      <Button
        color="orange"
        className={sn("mt-3", "button", `${blockName}__import-button`)}
      >
        {labels.importObservations.chooseAnotherFile}
      </Button>
    ),
    FileInfoBlock: () => (
      <div className={`${blockName}__supported-formats`}>
        {labels.importObservations.supportedFormats}
      </div>
    )
  })
};
