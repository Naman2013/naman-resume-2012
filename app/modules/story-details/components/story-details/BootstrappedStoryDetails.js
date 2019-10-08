/***********************************
 * V4 Guides Hub Page
 *
 *
 *
 ***********************************/

import CenterColumn from 'app/components/common/CenterColumn';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import LabeledTitleTiles from 'app/components/common/style/LabeledTitleTiles';
import ResponsiveTwoColumnContainer from 'app/components/ResponsiveTwoColumnContainer';
import TwoTabbedNav from 'app/components/TwoTabbedNav';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AsideContainer from './partials/AsideContainer';
import HeaderContainer from './partials/HeaderContainer';
import MainContainer from './partials/MainContainer';
import messages from './StoryDetails.messages';
import styles from './StoryDetails.style';

const { arrayOf, bool, number, oneOfType, shape, string } = PropTypes;

const BootstrappedStoryDetails = props => {
  const {
    actions,
    authorInfo,
    isDesktop,
    isMobile,
    isScreenLarge,
    membershipType,
    postId,
    S3Files,
    slug,
    storyDetails,
    type,
    user,
    likeStory,
  } = props;
  const { t } = useTranslation();

  const likeParams = {
    likeType: 'post',
    likeId: postId,
    authorId: authorInfo.customerId,
    objectSlug: slug,
    type,
    membershipType,
  };

  const headerTheme =
    !S3Files[0] && !isMobile
      ? {
          padding: '100px',
        }
      : {};

  return (
    <div className="root story-details">
      <CenterColumn
        widths={['768px', '940px', '940px']}
        theme={{ paddingTop: '25px' }}
      >
        <HeaderContainer
          {...props}
          isDesktop={isDesktop}
          likeParams={likeParams}
          user={user}
          mainImage={S3Files[0]}
          theme={headerTheme}
          likeStory={likeStory}
        />
        {storyDetails.length > 0 ? (
          <DisplayAtBreakpoint screenLarge screenXLarge>
            <LabeledTitleTiles tiles={storyDetails} />
          </DisplayAtBreakpoint>
        ) : null}
        <div className="main-container">
          <ResponsiveTwoColumnContainer
            renderNavigationComponent={navProps => (
              <TwoTabbedNav
                firstTitle={t('.story')}
                secondTitle={t('.related')}
                firstTabIsActive={navProps.showMainContainer}
                firstTabOnClick={navProps.onShowMainContainer}
                secondTabIsActive={navProps.showAsideContainer}
                secondTabOnClick={navProps.onShowAsideContainer}
              />
            )}
            renderAsideContent={() => (
              <div>
                <AsideContainer {...props} />
              </div>
            )}
            isScreenSize={isScreenLarge}
            renderMainContent={() => (
              <MainContainer
                {...props}
                actions={actions}
                user={user}
                likeParams={likeParams}
                likeStory={likeStory}
              />
            )}
          />
        </div>
      </CenterColumn>
      <style jsx>{styles}</style>
    </div>
  );
};

BootstrappedStoryDetails.propTypes = {
  S3Files: arrayOf(string),
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
  intl: intlShape.isRequired,
};

BootstrappedStoryDetails.defaultProps = {
  S3Files: [''],
  user: {},
  authorInfo: {},
};

export default injectIntl(BootstrappedStoryDetails);
