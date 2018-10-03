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
import ObjectDetailList from 'components/common/ObjectDetailList';
import MainContainer from './partials/MainContainer';
import AsideContainer from './partials/AsideContainer';
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
    imageTitle,
    imageURL,
    isDesktop,
    isScreenLarge,
    objectId,
    scheduledMissionId,
    user,
  } = props;
  console.log(props);
  return (
    <div className="root">
      <CenterColumn widths={['768px', '940px', '940px']} theme={{ paddingTop: '25px' }}>
        <div className="header-container">
          <div className="obs-header">
            <div className="obs-img-header">AN OBSERVATION OF</div>
            <div className="obs-img-subheader" dangerouslySetInnerHTML={{ __html: imageTitle }}/>
          </div>
          <div className="obs-image-container">
            <img className="obs-image" src={imageURL} />
          </div>
          <div className="object-details">
            {objectId !== '0' ? <ObjectDetailList
              isDesktop={isDesktop}
              objectId={objectId}
              scheduledMissionId={scheduledMissionId}
            /> : null}
          </div>
        </div>
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
            renderMainContent={() => <MainContainer {...props} actions={actions} user={user} />}
          />
        </div>
      </CenterColumn>
      <style jsx>{styles}</style>
    </div>
  );
};

BootstrappedStoryDetails.propTypes = {
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
};

BootstrappedStoryDetails.defaultProps = {
};

export default BootstrappedStoryDetails;
