/***********************************
* V4 Guides Hub Page
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import TwoTabbedNav from 'components/TwoTabbedNav';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import LabeledTitleTiles from 'components/common/style/LabeledTitleTiles';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import MainContainer from './partials/MainContainer';
import AsideContainer from './partials/AsideContainer';
import HeaderContainer from './partials/HeaderContainer';
import styles from './StoryDetails.style';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const BootstrappedStoryDetails = (props) => {
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
  } = props;

  const likeParams = {
    likeType: 'post',
    likeId: postId,
    authorId: authorInfo.customerId,
    objectSlug: slug,
    type,
    membershipType,
  };

  const headerTheme = !S3Files[0] && !isMobile ? {
    padding: '100px'
  } : {};

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

        />
        {storyDetails.length > 0 ? <DisplayAtBreakpoint
          screenLarge
          screenXLarge
        >
          <LabeledTitleTiles
            tiles={storyDetails}
          />
        </DisplayAtBreakpoint> : null }
        <div className="main-container">
          <ResponsiveTwoColumnContainer
            renderNavigationComponent={navProps =>
              (<TwoTabbedNav
                firstTitle="Story"
                secondTitle="Related"
                firstTabIsActive={navProps.showMainContainer}
                firstTabOnClick={navProps.onShowMainContainer}
                secondTabIsActive={navProps.showAsideContainer}
                secondTabOnClick={navProps.onShowAsideContainer}
              />)
            }
            renderAsideContent={() => (
              <div>
                <AsideContainer {...props} />
              </div>
            )}
            isScreenLarge={isScreenLarge}
            renderMainContent={() => <MainContainer {...props} actions={actions} user={user} likeParams={likeParams} />}
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
};

BootstrappedStoryDetails.defaultProps = {
  S3Files: [''],
  user: {},
};

export default BootstrappedStoryDetails;
