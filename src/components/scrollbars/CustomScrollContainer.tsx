import classNames from "classnames";
import React, { ComponentProps, FC } from "react";
import Scrollbars from "react-custom-scrollbars";
import "./CustomScrollContainer.scss";

type ScrollbarsProps = ComponentProps<typeof Scrollbars>;

const ScrollTrack: ScrollbarsProps["renderTrackHorizontal"] = props => {
  const { className } = props;
  return (
    <div {...props} className={classNames(className, "custom-scroll-track")} />
  );
};

export const CustomScrollContainer: FC<ScrollbarsProps> = props => (
  <Scrollbars
    {...props}
    autoHeightMax={Number.MAX_SAFE_INTEGER}
    renderThumbHorizontal={ScrollTrack}
    renderThumbVertical={ScrollTrack}
  />
);
