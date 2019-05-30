import React, { FC } from "react";
import { connect } from "react-redux";
import { labels } from "../../../config/i18n/labels";
import { DataGridState } from "../DataGridModels";

interface Props {
  selectedCount: number;
  totalCount: number;
}

export const GridSelectionInfo: FC<Props> = ({ selectedCount }) => (
  <div className="d-flex align-items-center">
    {selectedCount > 0 && (
      <div className="mr-auto">
        {labels.selected} {selectedCount} {labels.ofBirds}
      </div>
    )}
  </div>
);

export const GridSelectionInfoConnected = connect(
  (state: DataGridState) => ({
    selectedCount: state.selection.length,
    totalCount: state.pagination.totalCount
  }),
  () => ({})
)(GridSelectionInfo);
