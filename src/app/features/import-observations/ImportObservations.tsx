import { ArrowBack } from "@material-ui/icons";
import sn from "classnames";
import { push } from "connected-react-router";
import React, { FC, useEffect, useState } from "react";
import { connect, DispatchProp } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { labels } from "../../../config/i18n/labels";
import { RootState } from "../../../store";
import { ROUTE_OBSERVATIONS } from "../routing/routes";
import { dropZoneContent } from "./dropAreaMappings";
import { ImportDragAndDrop } from "./import-drag-n-drop/ImportDragAndDrop";
import "./ImportObservations.scss";
import { DropAreaStates, LoadedFile } from "./models";
import { downloadTemplate, uploadObservations } from "./service";

export const blockName = "import-observations";

const ImportButton = ({
  caption,
  isDisabled,
  onClick
}: {
  caption: string;
  isDisabled: boolean;
  onClick?: any;
}) => (
  <div className={`${blockName}__import-button-container`}>
    <Button
      color="orange"
      className={sn("mt-3", "button", `${blockName}__import-button`)}
      disabled={isDisabled}
      onClick={onClick}
    >
      {caption}
    </Button>
  </div>
);

export const ImportObservations: FC<DispatchProp> = ({ dispatch }) => {
  const [file, setFile] = useState(null);
  const [dragAreaState, setDragAreaState] = useState(DropAreaStates.Intact);

  useEffect(() => {
    if (file) {
      uploadObservations(file);
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

  const onFileLoaded = (loadedFile: LoadedFile) => {
    setFile(loadedFile);
  };

  const revertDragAreaToIntact = () => {
    setDragAreaState(DropAreaStates.Intact);
    setFile(null);
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
    <div className={blockName} style={{ flexGrow: 1 }}>
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
            <ImportDragAndDrop
              onFileLoaded={onFileLoaded}
              dragAreaState={dragAreaState}
              revertDragAreaToIntact={revertDragAreaToIntact}
              Icon={Icon}
              title={title}
              subtitle={subtitle}
              FileActionButton={FileActionButton}
              inputProps={{
                accept:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              }}
            />
            <div className="mt-2">
              <FileInfoBlock />
            </div>
            <ImportButton
              caption={labels.importObservations.addToDatabase}
              isDisabled={isSubmitButtonDisabled}
              onClick={() => dispatch(push(ROUTE_OBSERVATIONS.path))}
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
                onClick={downloadTemplate}
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

export const ImportObservationsConnected = connect((state: RootState) => ({}))(
  ImportObservations
);
