import streamSaver from "streamsaver";
import {
  OBSERVATIONS_DOWNLOAD_EXCEL_TEMPLATE,
  OBSERVATIONS_VALIDATE_IMPORT
} from "../../../config/endpoints";
import { ajaxService } from "../../../services";

export const downloadTemplate = () => {
  ajaxService
    .makeCall<Response>(OBSERVATIONS_DOWNLOAD_EXCEL_TEMPLATE, {}, "POST", {
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })
    .then(r => {
      const fileStream = streamSaver.createWriteStream(
        "observations_spreadsheet_template.xlsx"
      );

      r.body.pipeTo(fileStream);
      console.log(r);
    });
};

interface ValidationError {
  rowNumber: number;
  status: {
    error: string;
    verifiedEuRingCodes: false;
  };
}

interface InvalidDataFormatError {
  rowNumber: number;
  result: {
    [key: string]: string[];
  };
}

export interface ValidationResponse {
  euRingErrors: Array<ValidationError>;
  invalidDataFormat: Array<InvalidDataFormatError>;
  possibleClones: number;
  rowCount: number;
  emptyRowCount: number;
}

export const uploadObservationsFile = (file: any) => {
  const formData = new FormData();
  formData.append("file", file.file);

  return ajaxService.makeCall<ValidationResponse>(
    OBSERVATIONS_VALIDATE_IMPORT,
    formData,
    "POST",
    {
      // "Content-Type": "multipart/form-data"
    }
  );
};
