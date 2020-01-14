import React from 'react';
import { IAboutSectionData } from 'app/modules/about/types';
import SectionPanels from 'app/components/about/SectionPanels';
import { useTranslation } from 'react-i18next';
import PartnershipOpportunitiesSection from 'app/components/about/PartnershipOpportunitiesSection';
import {
  ABOUT_SLOOH_SECTION,
  ADVISORS_SECTION,
  CAREERS_SECTION,
  SPONSOR_OPPORTUNITIES_SECTION,
  TEAM_SECTION,
} from 'app/modules/about/constants';
import CenterColumn from 'app/components/common/CenterColumn';
import CardsLayout from 'app/components/common/CardsLayout';
import PartnerCard from 'app/components/about/PartnerCard';
import StoryCard from 'app/components/about/StoryCard';

type AboutSectionContentProps = {
  sectionData: IAboutSectionData;
};

export const AboutSectionContent: React.FC<
  AboutSectionContentProps
> = props => {
  const { sectionData } = props;
  const {
    sectionTag,
    aboutSloohHeroImageUrl,
    hasAboutSloohPartners,
    aboutSloohPartners,
    sectionPanels,
    hasAboutSloohNewsStories,
    aboutSloohNewsStories,
    hasAboutSloohStore,
    aboutSloohStore,
  } = sectionData;
  const disableReadMore =
    sectionTag === CAREERS_SECTION ||
    sectionTag === TEAM_SECTION ||
    sectionTag === ADVISORS_SECTION;

  const { t } = useTranslation();

  return (
    <div className="about-slooh-section-content">
      {sectionTag === ABOUT_SLOOH_SECTION && (
        <div className="about-hero">
          <img alt="" className="hero-img" src={aboutSloohHeroImageUrl} />
          <div className="hero-text">
            <div>{t('About.LearnTo')}</div>
            <div>{t('About.Explore')}</div>
            <div>{t('About.Space')}</div>
            <div>{t('About.TogetherWithSlooh')}</div>
          </div>
        </div>
      )}

      {sectionTag === SPONSOR_OPPORTUNITIES_SECTION && (
        <PartnershipOpportunitiesSection data={sectionData} />
      )}

      {hasAboutSloohPartners &&
        Array.isArray(aboutSloohPartners.partnerLogoList) &&
        aboutSloohPartners.partnerLogoList.length > 0 && (
          <CenterColumn>
            <CardsLayout
              sectionHeading={aboutSloohPartners.sectionHeading}
              sectionHeading2={aboutSloohPartners.sectionHeading2}
            >
              {aboutSloohPartners.partnerLogoList.map(image => (
                <PartnerCard image={image} />
              ))}
            </CardsLayout>
          </CenterColumn>
        )}

      {sectionPanels && (
        <div className="container-fluid">
          <SectionPanels
            disableReadMore={disableReadMore}
            list={sectionPanels}
          />
        </div>
      )}

      {hasAboutSloohNewsStories &&
        Array.isArray(aboutSloohNewsStories.newsStoriesList) &&
        aboutSloohNewsStories.newsStoriesList.length > 0 && (
          <CenterColumn>
            <CardsLayout
              sectionHeading={aboutSloohNewsStories.sectionHeading}
              sectionHeading2={aboutSloohNewsStories.sectionHeading2}
            >
              {aboutSloohNewsStories.newsStoriesList.map(story => (
                <StoryCard story={story} />
              ))}
            </CardsLayout>
          </CenterColumn>
        )}

      {hasAboutSloohStore && (
        <CenterColumn>
          <CardsLayout
            sectionHeading={aboutSloohStore.sectionHeading}
            sectionHeading2={aboutSloohStore.sectionHeading2}
          >
            <a
              href={aboutSloohStore.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={aboutSloohStore.imageUrl}
                alt="Store"
                className="store-banner"
              />
            </a>
          </CardsLayout>
        </CenterColumn>
      )}
    </div>
  );
};
