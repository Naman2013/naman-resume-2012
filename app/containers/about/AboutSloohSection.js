/** *********************************
 * V4 AboutSloohSection page
 ********************************** */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Request from '../../components/common/network/Request';
import { GET_SECTION } from '../../services/about';
import SectionPanels from '../../components/about/SectionPanels';
import styles from './AboutSloohSection.style';
import messages from './AboutSloohSection.messages';

const ABOUT_SLOOH_SECTION = 'about-slooh';

const AboutSloohSection = ({ params }) => (
  <Fragment>
    <Request
      serviceURL={GET_SECTION}
      requestBody={{ sectionTag: params.aboutSloohSectionId }}
      render={({ fetchingContent, serviceResponse: subscriptionResponse }) => (
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

              <div className="about-section-container">
                <SectionPanels list={subscriptionResponse.sectionPanels} />
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
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
