import React, { FC } from "react";
import { CustomScrollContainer } from "../../../components/scrollbars/CustomScrollContainer";
import { labels } from "../../../config/i18n/labels";

import "./AboutUsPage.scss";

const binocularImg = require("../../../assets/aboutUsBinoclus.svg");
const birdImg = require("../../../assets/aboutUsBird.svg");
const earthImg = require("../../../assets/aboutUsEarth.svg");
const galleryPhoto1 = require("../../../assets/aboutUsGalleryItem1.png");
const galleryPhoto2 = require("../../../assets/aboutUsGalleryItem2.png");

const galleryPhotos = [galleryPhoto1, galleryPhoto2];

const blockName = "about-us";

export const AboutUsPage: FC = () => {
  return (
    <div className={blockName}>
      <div className={`${blockName}__content`}>
        <div className={`${blockName}__header`}>
          <h1 className={`${blockName}__header-text`}>
            {labels.aboutUs.header}
          </h1>
        </div>
        <section className={`${blockName}__description-section`}>
          <article className={`${blockName}__article`}>
            <h2 className={`${blockName}__article-heading`}>
              {labels.aboutUs.belorussianRingCenterHeading}
            </h2>
            <div className={`${blockName}__article-content`}>
              <p>{labels.aboutUs.belorussianRingCenterContentFirst}</p>
              <p>{labels.aboutUs.belorussianRingCenterContentSecond}</p>
            </div>
          </article>
          <article className={`${blockName}__article`}>
            <h2 className={`${blockName}__article-heading`}>
              {labels.aboutUs.tasksHeading}
            </h2>
            <ul className={`${blockName}__subarticles-list`}>
              <li>
                <img src={binocularImg} alt="binocular" />
                <h3 className={`${blockName}__subarticle-heading`}>
                  {labels.aboutUs.taskOneHeading}
                </h3>
                <div className={`${blockName}__subarticle-content`}>
                  {labels.aboutUs.taskOneContent}
                </div>
              </li>
              <li>
                <img src={birdImg} alt="bird" />
                <h3 className={`${blockName}__subarticle-heading`}>
                  {labels.aboutUs.taskTwoHeading}
                </h3>
                <div className={`${blockName}__subarticle-content`}>
                  {labels.aboutUs.taskTwoContent}
                </div>
              </li>
              <li>
                <img src={earthImg} alt="earth" />
                <h3 className={`${blockName}__subarticle-heading`}>
                  {labels.aboutUs.taskThreeHeading}
                </h3>
                <div className={`${blockName}__subarticle-content`}>
                  {labels.aboutUs.taskThreeContent}
                </div>
              </li>
            </ul>
          </article>
          <article className={`${blockName}__article`}>
            <h2 className={`${blockName}__article-heading`}>
              {labels.aboutUs.purposeHeading}
            </h2>
            <div className={`${blockName}__article-content`}>
              <p>{labels.aboutUs.purposeContentFirst}</p>
              <p>{labels.aboutUs.purposeContentSecond}</p>
            </div>
          </article>
          <article className={`${blockName}__article`}>
            <h2 className={`${blockName}__article-heading`}>
              {labels.aboutUs.photos}
            </h2>
          </article>
          <CustomScrollContainer autoHeight>
            <div className={`${blockName}__images-container`}>
              {galleryPhotos.map(img => (
                <div key={img} className={`${blockName}__image`}>
                  <img src={img} alt="Gallery pic" />
                </div>
              ))}
            </div>
          </CustomScrollContainer>
        </section>
        <section className={`${blockName}__contact-information`}>
          <h2 className={`${blockName}__article-heading`}>
            {labels.aboutUs.contactInformation}
          </h2>
          <div className={`${blockName}__contacts-container`}>
            <div className={`${blockName}__contacts-column`}>
              <div className={`${blockName}__contacts-block`}>
                <h3 className={`${blockName}__subarticle-heading`}>
                  {labels.aboutUs.postAddressHeading}:
                </h3>
                <div className={`${blockName}__subarticle-content`}>
                  {labels.aboutUs.postAddressContent}
                </div>
              </div>
              <div className={`${blockName}__contacts-block`}>
                <h3 className={`${blockName}__subarticle-heading`}>
                  {labels.aboutUs.emailHeading}:
                </h3>
                <div className={`${blockName}__subarticle-content`}>
                  {labels.aboutUs.emailContent}
                </div>
              </div>
              <div className={`${blockName}__contacts-block`}>
                <h3 className={`${blockName}__subarticle-heading`}>
                  {labels.aboutUs.phoneHeading}:
                </h3>
                <div className={`${blockName}__subarticle-content`}>
                  {labels.aboutUs.phoneContent}
                </div>
              </div>
            </div>
            <div className={`${blockName}__contacts-column`}>
              <div className={`${blockName}__contacts-block`}>
                <h3 className={`${blockName}__subarticle-heading`}>
                  {labels.aboutUs.managerHeading}:
                </h3>
                <div className={`${blockName}__subarticle-content`}>
                  {labels.aboutUs.managerContent}
                </div>
              </div>
              <div className={`${blockName}__contacts-block`}>
                <h3 className={`${blockName}__subarticle-heading`}>
                  {labels.aboutUs.employeeHeading}:
                </h3>
                <div className={`${blockName}__subarticle-content`}>
                  {labels.aboutUs.employeeContent}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
