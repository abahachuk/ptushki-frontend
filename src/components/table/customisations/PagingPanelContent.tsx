import { PagingPanel } from "@devexpress/dx-react-grid-bootstrap4";
import React, { FC } from "react";
import { connect } from "react-redux";
import { labels } from "../../../config/i18n/labels";
import { DataGridState } from "../DataGridModels";

interface Props extends PagingPanel.ContainerProps {
  selectedCount: number;
  totalCount: number;
}

export const PagingPanelContent: FC<Props> = ({ selectedCount, ...p }) => (
  <div className="d-flex align-items-center justify-content-end">
    <div className="mr-n3">{labels.show}</div>
    <PagingPanel.Container {...p} />
  </div>
);

export const PagingPanelContentConnected = connect(
  (state: DataGridState) => ({
    selectedCount: state.selection.length
  }),
  () => ({})
)(PagingPanelContent);
