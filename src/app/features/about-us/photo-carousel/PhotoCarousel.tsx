import React, { FC } from "react";
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
          key={imgItem}
          className={`${blockName}__photo`}
          src={imgItem}
          alt="galleryPhoto"
        />
      ))}
    </Carousel>
  );
};
