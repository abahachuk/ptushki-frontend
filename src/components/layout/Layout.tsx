import React, { FC, ReactNode } from "react";

import { labels } from "../../config/i18n/labels";

import "./Layout.scss";

const ring = require("../../assets/ring.svg");

const blockName = "layout";

export const Layout: FC<{
  title: String;
  children: ReactNode;
}> = ({ title, children }) => (
  <div className={`${blockName}__container`}>
    <div className={`${blockName}__content content`}>
      <div className={blockName}>
        <img className={`${blockName}__image`} src={ring} alt="Ring" />
        <p className={`${blockName}__subtitle`}>
          {labels.form.subtitleTop}
          <br />
          {labels.form.subtitleBottom}
        </p>
        <h1 className={`${blockName}__title`}>{title}</h1>
        {children}
      </div>
    </div>
  </div>
);
