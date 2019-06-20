import React, { useState, useCallback, useEffect, FC } from "react";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { Button } from "reactstrap";
import Carousel from "react-leaf-carousel";

import "./PhotoCarousel.scss";

const blockName = "photo-carousel";

interface PhotoCarouselProps {
  imgList: Array<object>;
}

// TODO justify Carousel settings
export const PhotoCarousel: FC<PhotoCarouselProps> = ({ imgList }) => {
  return (
    <Carousel
      breakpoints={[
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]}
      dots={false}
      showSides
      sidesOpacity={0.5}
      sideSize={0.1}
      slidesToScroll={2}
      slidesToShow={4}
      scrollOnDevice
    >
      {imgList.map((imgItem: any) => (
        <img
          className={`${blockName}__photo`}
          src={imgItem}
          alt="galleryPhoto"
        />
      ))}
    </Carousel>
  );
};
