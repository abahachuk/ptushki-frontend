import streamSaver from "streamsaver";
import { OBSERVATIONS_EXPORT_EXCEL } from "../../../config/endpoints";
import { ajaxService } from "../../../services";

export const exportObservations = () => {
  ajaxService
    .makeCall<Response>(OBSERVATIONS_EXPORT_EXCEL, {}, "POST", {
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })
    .then(r => {
      const fileStream = streamSaver.createWriteStream(
        "observations_export.xlsx"
      );

      r.body.pipeTo(fileStream);
    });
};
