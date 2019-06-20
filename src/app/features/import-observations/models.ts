import { ComponentProps } from "react";
import { DropzoneOptions } from "react-dropzone";

export enum DropAreaStates {
  Intact = "intact",
  Success = "success",
  Fail = "fail"
}

export interface DropZoneProps {
  dragAreaState: string;
  onFileLoaded: Function;
  revertDragAreaToIntact: Function;
  Icon: Function;
  title: string;
  subtitle: string;
  FileActionButton: Function;
  dropZoneProps?: DropzoneOptions;
}

export interface VaryingContent {
  Icon: Function;
  title: string;
  subtitle: string;
  FileActionButton: Function;
  FileInfoBlock: Function;
  isSubmitButtonDisabled: boolean;
}

export interface LoadedFile {
  fileContent: string;
  fileName: string;
  fileSize: string;
}
