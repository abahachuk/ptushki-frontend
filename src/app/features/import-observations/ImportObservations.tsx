import React, {
  useState,
  FC,
  useCallback,
  useEffect,
  MouseEventHandler
} from "react";
import { Link } from "react-router-dom";
import {
  ArrowBack,
  CloudUpload,
  CloudDone,
  CloudOff
} from "@material-ui/icons";
import sn from "classnames";
import { Button } from "reactstrap";
import { DropZone } from "./import-drag-n-drop/ImportDragAndDrop";
import { labels } from "../../../config/i18n/labels";
import { DropAreaStates, VaryingContent, LoadedFile } from "./models";
import { dropZoneContent } from "./dropAreaMappings";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { OBSERVATIONS_DOWNLOAD_EXCEL_TEMPLATE } from "../../../config/endpoints";
import { ajaxService } from "../../../services";
import "./ImportObservations.scss";

export const blockName = "import-observations";

const ImportButton = ({
  caption,
  isDisabled
}: {
  caption: string;
  isDisabled: boolean;
}) => (
  <div className={`${blockName}__import-button-container`}>
    <Button
      color="orange"
      className={sn("mt-3", "button", `${blockName}__import-button`)}
      disabled={isDisabled}
    >
      {caption}
    </Button>
  </div>
);

export const ImportObservations: FC = () => {
  const [file, setFile] = useState(null);
  const [dragAreaState, setDragAreaState] = useState(DropAreaStates.Intact);
  const [shouldDownloadTemplate, setShouldDownloadTemplate] = useState(false);

  useEffect(() => {
    if (file) {
      // to upload file on backend and wait response
      // if successed verified show according state of dropzone, otherwise to show fail dropzone state
      // in success case there will be response with validating result:
      // how many columns in table, which rows are empty etc.
      const isSuccessfullyVerified = true;

      if (isSuccessfullyVerified) {
        setDragAreaState(DropAreaStates.Success);
      } else {
        setDragAreaState(DropAreaStates.Fail);
        setFile(null);
      }
    }
  }, [file]);

  useEffect(() => {
    if (shouldDownloadTemplate) {
      const donwloadTemplate = async () => {
        setShouldDownloadTemplate(false);
        try {
          await ajaxService.makeCall(OBSERVATIONS_DOWNLOAD_EXCEL_TEMPLATE, {
            method: "POST"
          });
        } catch (e) {
          // TODO: probably it's should add some user notification about unability to download template
        }
      };
      donwloadTemplate();
    }
  }, [shouldDownloadTemplate]);

  const onFileLoaded = (loadedFile: LoadedFile) => {
    setFile(loadedFile);
  };

  const revertDragAreaToIntact = () => {
    setDragAreaState(DropAreaStates.Intact);
    setFile(null);
  };

  const onDownloadTemplate = async () => {
    setShouldDownloadTemplate(true);
  };

  const {
    FileInfoBlock,
    isSubmitButtonDisabled,
    Icon,
    title,
    subtitle,
    FileActionButton
  } =
    dragAreaState === DropAreaStates.Success
      ? dropZoneContent[dragAreaState](file, revertDragAreaToIntact)
      : dropZoneContent[dragAreaState]();

  return (
    <div className={blockName}>
      <div className={`${blockName}__buttons`}>
        <Button
          className={`${blockName}__back-btn-arrow`}
          tag={Link}
          to={ROUTE_OBSERVATIONS.path}
        >
          <ArrowBack className="mr-1" />
          {labels.importObservations.back}
        </Button>
      </div>
      <h1 className={`${blockName}__title`}>
        {labels.importObservations.title}
      </h1>
      <p className={`${blockName}__subtitle`}>
        {labels.importObservations.description}
      </p>
      <div className={`${blockName}__import-sections`}>
        <section
          className={sn(`${`${blockName}__import-block-container`}`, "mr-4")}
        >
          <div className="pt-4 px-3 pb-3">
            <h2 className={`${blockName}__import-block-title`}>
              {labels.importObservations.uploadTable}
            </h2>
            <DropZone
              onFileLoaded={onFileLoaded}
              dragAreaState={dragAreaState}
              revertDragAreaToIntact={revertDragAreaToIntact}
              Icon={Icon}
              title={title}
              subtitle={subtitle}
              FileActionButton={FileActionButton}
            />
            <div className="mt-2">
              <FileInfoBlock />
            </div>
            <ImportButton
              caption={labels.importObservations.addToDatabase}
              isDisabled={isSubmitButtonDisabled}
            />
          </div>
          <div className={`${blockName}__template-block`}>
            <div className={`${blockName}__template-block-title`}>
              {labels.importObservations.tableTemplateTitle}
            </div>
            <div
              className={sn(
                `${blockName}__template-block-main-content`,
                "mt-2"
              )}
            >
              <div className={`${blockName}__template-block-description`}>
                {labels.importObservations.tableTemplateDescription}
              </div>
              <Button
                onClick={onDownloadTemplate}
                className={sn(`${blockName}__template-block-button`)}
              >
                {labels.importObservations.tableTemplateButtonCaption}
              </Button>
            </div>
          </div>
        </section>
        <section
          className={sn(
            `${blockName}__import-block-container`,
            "pt-4 px-3 pb-3"
          )}
        >
          <h2 className={`${blockName}__import-block-title`}>
            {labels.importObservations.insertEuring}
          </h2>
          <textarea
            className={`${blockName}__euring-area`}
            placeholder={labels.importObservations.insertCodesHere}
          />
          <ImportButton
            caption={labels.importObservations.loadToDatabase}
            isDisabled={false}
          />
        </section>
      </div>
    </div>
  );
};
