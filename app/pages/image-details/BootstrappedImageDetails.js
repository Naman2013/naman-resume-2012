/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TwoTabbedNav from 'components/TwoTabbedNav';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import ObjectDetailList from 'components/common/ObjectDetailList';
import MainContainer from './partials/MainContainer';
import AsideContainer from './partials/AsideContainer';
import CenterColumn from 'components/common/CenterColumn';
import { romance } from 'styles/variables/colors_tiles_v4';
import styles from './ImageDetails.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const BootstrappedImageDetails = (props) => {
  const {
    actions,
    imageTitle,
    imageURL,
    isDesktop,
    isScreenLarge,
    objectId,
    scheduledMissionId,
  } = props;
  const showMissionRelatedInfo = Number(scheduledMissionId) > 0;
  const rightPanelDisplayFlags = [showMissionRelatedInfo];
  const showRightContainer = rightPanelDisplayFlags.filter(flag => !!flag).length > 0;
  return (<div className="root">
      <CenterColumn widths={['768px', '940px', '940px']} theme={{ paddingTop: '25px' }}>
        <div className="obs-img-container">
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
                firstTitle="Observations"
                secondTitle="Details"
                firstTabIsActive={navProps.showMainContainer}
                firstTabOnClick={navProps.onShowMainContainer}
                secondTabIsActive={navProps.showAsideContainer}
                secondTabOnClick={navProps.onShowAsideContainer}
              />)
            }
            renderAsideContent={() => (<div>
              {showRightContainer ?
                <AsideContainer {...props} showMissionRelatedInfo={showMissionRelatedInfo} /> :
                null}
            </div>)}
            isScreenLarge={isScreenLarge}
            renderMainContent={() => <MainContainer {...props} actions={actions} />}
          />
        </div>
      </CenterColumn>
      <style jsx>{styles}</style>
    </div>);
};

BootstrappedImageDetails.propTypes = {
  callSource: string,
  canEditFlag: bool,
  canLikeFlag: bool,
  commentsCount: number,
  commentsForumId: oneOfType([number, string]),
  commentsThreadId: oneOfType([number, string]),
  commentsTopicId: oneOfType([number, string]),
  customerImageId: string,
  displayName: string,
  gravityRankLabel: string,
  fileData: shape({
    'Photo By': string,
  }),
  imageTitle: string,
  imageURL: string,
  isScreenLarge: bool,
  likePrompt: string,
  likesCount: number,
  objectId: string,
  observationLog: string,
  observationTimeDisplay: arrayOf(string),
  observationTitle: string,
  saveLabel: string,
  scheduledMissionId: string,
  showCommentsLink: bool,
  showLikePrompt: bool,
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
};

BootstrappedImageDetails.defaultProps = {
  callSource: null,
  canEditFlag: false,
  canLikeFlag: true,
  commentsCount: 0,
  commentsForumId: 0,
  commentsThreadId: 0,
  commentsTopicId: 0,
  customerImageId: null,
  fileData: {
    'Photo By': '',
  },
  displayName: '',
  gravityRankLabel: '',
  imageTitle: '',
  imageURL: '',
  isScreenLarge: true,
  likesCount: 0,
  likePrompt: '',
  showLikePrompt: true,
  objectId: null,
  observationLog: '',
  observationTimeDisplay: [],
  observationTitle: '',
  saveLabel: '',
  scheduledMissionId: null,
  showCommentsLink: false,
};

export default BootstrappedImageDetails;
