/** *********************************
 * V4 AboutSloohSection page
 ********************************** */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Request from '../../components/common/network/Request';
import CenterColumn from '../../components/common/CenterColumn';
import CardsLayout from '../../components/common/CardsLayout';
import PartnershipOpportunitiesSection from '../../components/about/PartnershipOpportunitiesSection';
import SectionPanels from '../../components/about/SectionPanels';
import PartnerCard from '../../components/about/PartnerCard';
import StoryCard from '../../components/about/StoryCard';
import { GET_SECTION } from '../../services/about';
import styles from './AboutSloohSection.style';
import messages from './AboutSloohSection.messages';

const ABOUT_SLOOH_SECTION = 'about-slooh';
const SPONSOR_OPPORTUNITIES_SECTION = 'about-slooh-sponsor';
const CAREERS_SECTION = 'about-slooh-careers';
const TEAM_SECTION = 'about-slooh-team';

const AboutSloohSection = ({ params }) => (
  <Fragment>
    <Request
      serviceURL={GET_SECTION}
      requestBody={{ sectionTag: params.aboutSloohSectionId }}
      render={({ fetchingContent, serviceResponse: subscriptionResponse }) => {
        const {
          sectionPanels,
          hasAboutSloohPartners,
          aboutSloohPartners,
          hasAboutSloohNewsStories,
          aboutSloohNewsStories,
          hasAboutSloohStore,
          aboutSloohStore,
        } = subscriptionResponse;
        return (
          <Fragment>
            {!fetchingContent && (
              <Fragment>
                {params.aboutSloohSectionId === ABOUT_SLOOH_SECTION && (
                  <div className="about-hero">
                    <img
                      alt=""
                      className="hero-img"
                      src={subscriptionResponse.aboutSloohHeroImageUrl}
                    />
                    <div className="hero-text">
                      <div>
                        <FormattedMessage {...messages.LearnTo} />
                      </div>
                      <div>
                        <FormattedMessage {...messages.Explore} />
                      </div>
                      <div>
                        <FormattedMessage {...messages.Space} />
                      </div>
                      <div>
                        <FormattedMessage {...messages.TogetherWithSlooh} />
                      </div>
                    </div>
                  </div>
                )}

                {params.aboutSloohSectionId ===
                  SPONSOR_OPPORTUNITIES_SECTION && (
                  <PartnershipOpportunitiesSection
                    data={subscriptionResponse}
                  />
                )}

                <div
                  style={{ paddingTop: '0px' }}
                  className="about-section-container"
                >
                  {hasAboutSloohPartners &&
                    Array.isArray(aboutSloohPartners.partnerLogoList) &&
                    aboutSloohPartners.partnerLogoList.length > 0 && (
                      <CenterColumn>
                        <div style={{ paddingBottom: '0px' }}>
                          <CardsLayout
                            sectionHeading={aboutSloohPartners.sectionHeading}
                            sectionHeading2={aboutSloohPartners.sectionHeading2}
                          >
                            {aboutSloohPartners.partnerLogoList.map(image => (
                              <PartnerCard image={image} />
                            ))}
                          </CardsLayout>
                        </div>
                      </CenterColumn>
                    )}

                  { (params.aboutSloohSectionId === CAREERS_SECTION || params.aboutSloohSectionId === TEAM_SECTION) && <SectionPanels disableReadMore={true} list={sectionPanels} />}
                  { (params.aboutSloohSectionId !== CAREERS_SECTION && params.aboutSloohSectionId !== TEAM_SECTION) && <SectionPanels disableReadMore={false} list={sectionPanels} />}

                  <CenterColumn>
                    {hasAboutSloohNewsStories &&
                      Array.isArray(aboutSloohNewsStories.newsStoriesList) &&
                      aboutSloohNewsStories.newsStoriesList.length > 0 && (
                        <CardsLayout
                          sectionHeading={aboutSloohNewsStories.sectionHeading}
                          sectionHeading2={
                            aboutSloohNewsStories.sectionHeading2
                          }
                        >
                          {aboutSloohNewsStories.newsStoriesList.map(story => (
                            <StoryCard story={story} />
                          ))}
                        </CardsLayout>
                      )}
                    {hasAboutSloohStore && (
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
                    )}
                  </CenterColumn>
                </div>
              </Fragment>
            )}
          </Fragment>
        );
      }}
    />
    <style jsx>{styles}</style>
  </Fragment>
);

AboutSloohSection.propTypes = {
  params: PropTypes.shape({
    aboutSloohSectionId: PropTypes.string.isRequired,
  }).isRequired,
};

export default AboutSloohSection;
