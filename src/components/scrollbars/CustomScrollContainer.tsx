import classNames from "classnames";
import React, { ComponentProps, FC } from "react";
import Scrollbars from "react-custom-scrollbars";
import "./CustomScrollContainer.scss";

type ScrollbarsProps = ComponentProps<typeof Scrollbars>;

const ScrollTrack: ScrollbarsProps["renderTrackHorizontal"] = p => (
  <div {...p} className={classNames(p.className, "custom-scroll-track")} />
);

export const CustomScrollContainer: FC<ScrollbarsProps> = p => (
  <Scrollbars
    autoHeight
    autoHeightMax={Number.MAX_SAFE_INTEGER}
    {...p}
    renderThumbHorizontal={ScrollTrack}
    renderThumbVertical={ScrollTrack}
  />
);
