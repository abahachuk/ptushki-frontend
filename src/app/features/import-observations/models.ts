import { ComponentProps } from "react";

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
  inputProps?: ComponentProps<"input">;
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
