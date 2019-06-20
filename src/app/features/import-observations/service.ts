import streamSaver from "streamsaver";
import { OBSERVATIONS_DOWNLOAD_EXCEL_TEMPLATE } from "../../../config/endpoints";
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
