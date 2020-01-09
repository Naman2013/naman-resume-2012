/** *********************************
 * V4 AboutSloohSection page
 ********************************** */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Nav, Tab } from 'react-bootstrap';
import Request from '../../components/common/network/Request';
import CenterColumn from '../../components/common/CenterColumn';
import CardsLayout from '../../components/common/CardsLayout';
import PartnershipOpportunitiesSection from '../../components/about/PartnershipOpportunitiesSection';
import SectionPanels from '../../components/about/SectionPanels';
import PartnerCard from '../../components/about/PartnerCard';
import StoryCard from '../../components/about/StoryCard';
import { GET_SECTION } from '../../services/about';
import styles from './AboutSloohSection.style';

const ABOUT_SLOOH_SECTION = 'about-slooh';
const SPONSOR_OPPORTUNITIES_SECTION = 'about-slooh-sponsor';
const CAREERS_SECTION = 'about-slooh-careers';
const TEAM_SECTION = 'about-slooh-team';
const ADVISORS_SECTION = 'about-slooh-advisors';

const AboutSloohSection = ({ params }) => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const { t } = useTranslation();

  const changeSubMenu = url => {
    setActiveSubMenu(url.substr(url.lastIndexOf('/') + 1));
  };

  return (
    <Fragment>
      <Request
        serviceURL={GET_SECTION}
        requestBody={{
          sectionTag: activeSubMenu || params.aboutSloohSectionId,
        }}
        render={({
          fetchingContent,
          serviceResponse: subscriptionResponse,
        }) => {
          const {
            aboutSloohHeroImageUrl,
            sectionPanels,
            hasAboutSloohPartners,
            aboutSloohPartners,
            hasAboutSloohNewsStories,
            aboutSloohNewsStories,
            hasAboutSloohStore,
            aboutSloohStore,
            subMenuItems,
          } = subscriptionResponse;

          return (
            <div className="about-slooh-page">
              {!fetchingContent && (
                <Fragment>
                  {subMenuItems && (
                    <CenterColumn>
                      <Tab.Container
                        defaultActiveKey={subMenuItems[0].linkUrl}
                        id="tabs"
                        unmountOnExit
                        mountOnEnter
                        onSelect={changeSubMenu}
                      >
                        <Nav variant="tabs">
                          {subMenuItems.map(({ title, linkUrl }) => (
                            <Nav.Item>
                              <Nav.Link eventKey={linkUrl}>{title}</Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>
                      </Tab.Container>
                    </CenterColumn>
                  )}

                  {params.aboutSloohSectionId === ABOUT_SLOOH_SECTION && (
                    <div className="about-hero">
                      <img
                        alt=""
                        className="hero-img"
                        src={aboutSloohHeroImageUrl}
                      />
                      <div className="hero-text">
                        <div>{t('About.LearnTo')}</div>
                        <div>{t('About.Explore')}</div>
                        <div>{t('About.Space')}</div>
                        <div>{t('About.TogetherWithSlooh')}</div>
                      </div>
                    </div>
                  )}

                  {params.aboutSloohSectionId ===
                    SPONSOR_OPPORTUNITIES_SECTION && (
                    <PartnershipOpportunitiesSection
                      data={subscriptionResponse}
                    />
                  )}

                  <div className="about-section-container container-fluid">
                    {hasAboutSloohPartners &&
                      Array.isArray(aboutSloohPartners.partnerLogoList) &&
                      aboutSloohPartners.partnerLogoList.length > 0 && (
                        <CenterColumn>
                          <div style={{ paddingBottom: '0px' }}>
                            <CardsLayout
                              sectionHeading={aboutSloohPartners.sectionHeading}
                              sectionHeading2={
                                aboutSloohPartners.sectionHeading2
                              }
                            >
                              {aboutSloohPartners.partnerLogoList.map(image => (
                                <PartnerCard image={image} />
                              ))}
                            </CardsLayout>
                          </div>
                        </CenterColumn>
                      )}

                    {(params.aboutSloohSectionId === CAREERS_SECTION ||
                      params.aboutSloohSectionId === TEAM_SECTION ||
                      params.aboutSloohSectionId === ADVISORS_SECTION) && (
                      <SectionPanels disableReadMore list={sectionPanels} />
                    )}
                    {params.aboutSloohSectionId !== CAREERS_SECTION &&
                      params.aboutSloohSectionId !== TEAM_SECTION &&
                      params.aboutSloohSectionId !== ADVISORS_SECTION && (
                        <SectionPanels
                          disableReadMore={false}
                          list={sectionPanels}
                        />
                      )}

                    <CenterColumn>
                      {hasAboutSloohNewsStories &&
                        Array.isArray(aboutSloohNewsStories.newsStoriesList) &&
                        aboutSloohNewsStories.newsStoriesList.length > 0 && (
                          <CardsLayout
                            sectionHeading={
                              aboutSloohNewsStories.sectionHeading
                            }
                            sectionHeading2={
                              aboutSloohNewsStories.sectionHeading2
                            }
                          >
                            {aboutSloohNewsStories.newsStoriesList.map(
                              story => (
                                <StoryCard story={story} />
                              )
                            )}
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
            </div>
          );
        }}
      />
      <style jsx>{styles}</style>
    </Fragment>
  );
};

AboutSloohSection.propTypes = {
  params: PropTypes.shape({
    aboutSloohSectionId: PropTypes.string.isRequired,
  }).isRequired,
};

export default AboutSloohSection;
