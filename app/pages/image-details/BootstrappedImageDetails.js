/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';
import TwoTabbedNav from 'components/TwoTabbedNav';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import ObjectDetailList from 'components/common/ObjectDetailList';
import MainContainer from './partials/MainContainer';
import AsideContainer from './partials/AsideContainer'
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';

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
    imageTitle,
    imageURL,
    isDesktop,
    objectId,
    scheduledMissionId,
  } = props;
  const showMissionRelatedInfo = Number(scheduledMissionId) > 0;
  const rightPanelDisplayFlags = [showMissionRelatedInfo];
  const showRightContainer = rightPanelDisplayFlags.filter(flag => !!flag).length > 0;
  return (<div className="root">
    <div className="obs-img-container component-container">
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
            secondTabIsActive={navProps.onShowAsideContainer}
            secondTabOnClick={navProps.showAsideContainer}
          />)
        }
        renderAsideContent={() => (<div>
          {showRightContainer ?
            <AsideContainer {...props} showMissionRelatedInfo={showMissionRelatedInfo} /> :
            null}
        </div>)}
        isDesktop={isDesktop}
        renderMainContent={() => <MainContainer {...props} />}
      />
    </div>
    <style jsx>{`

      .root {
        font-family: ${primaryFont};
        color: ${astronaut};
        max-width: 940px;
        margin: 0 auto;
      }


      .component-container {
        margin: 25px 25px 0 25px;
        ${dropShadowContainer}
      }

      .is-hidden {
        visibility: hidden;
      }

      .obs-img-container {
        text-align: center;
        padding: 0;
      }

      .obs-header {
        padding: 50px;
      }

      .obs-img-header {
        padding: 25px;
        font-size: 10px;
        font-weight: bold;
        text-transform: uppercase;

      }

      .obs-img-subheader {
        font-family: ${secondaryFont};
        font-size: 40px;

      }

      .object-details {
        display: block;
      }

      .obs-image-container {
        width: 100%;
      }

      .obs-image {
        ${backgroundImageCover}
        background-position: center;
        margin: 0 auto;
        margin-bottom: 20px;
        display: block;
        width: 100%;
        max-width: 800px;
      }

      .obs-image:before {
        display: block;
        content: "";
        width: 100%;
        padding-top: 68.49%;
      }
      .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      @media all and (min-width: 641px) and (max-width: 768px) {

        .object-details {
          display: none;
        }
      }
      @media all and (max-width: 640px){
        .object-details {
          display: none;
        }
      }
    `}</style>
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
  isDesktop: bool,
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
  isDesktop: true,
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
