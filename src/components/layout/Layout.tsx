import React, { FC, ReactNode } from "react";
import { Row, Col } from "reactstrap";

import "./Layout.scss";

const bird = require("./bird.png");

const blockName = "layout";

export const Layout: FC<{
  title: String;
  children: ReactNode;
}> = ({ title, children }) => (
  <Row>
    <Col className={blockName} sm="12" md={{ size: 6, offset: 3 }}>
      <img className={`${blockName}__image`} src={bird} alt="Bird" />
      <h1 className={`${blockName}__title`}>{title}</h1>
      {children}
    </Col>
  </Row>
);
