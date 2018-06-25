/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { backgroundImageCover } from 'styles/mixins/utilities';
import DiscussionComments from 'components/common/DiscussionsBoard/DiscussionComments';
import MissionDetailList from 'components/common/MissionDetailList';
import ObjectDetailList from 'components/common/ObjectDetailList';
import MissionImageDetailList from 'components/common/MissionImageDetailList';
import ObservationsForm from 'components/ObservationsForm';
import ObserverInfo from 'components/ObserverInfo';
import ObservationInformation from './partials/ObservationInformation';
import { darkGray, gray } from 'styles/variables/colors';
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

const deviceMap = new Map([['desktop', 769], ['tablet', 641], ['mobile', 0]]);

class BootstrappedImageDetails extends Component {
  static propTypes = {
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
  }

  static defaultProps = {
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

  state = {
    showObservation: true,
    showDetails: window.innerWidth >= deviceMap.get('desktop'),
    windowWidth: window.innerWidth,
  };


  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  get device() {
    const currentSize = this.state.windowWidth;
    if (currentSize >= deviceMap.get('desktop')) return 'desktop';
    if (currentSize >= deviceMap.get('tablet')) return 'tablet';
    if (currentSize >= deviceMap.get('mobile')) return 'mobile';
  }

  showObservation = () => {
    if (this.device !== 'desktop') {
      this.setState({
        showObservation: true,
        showDetails: false,
      });
    }
  }

  showDetails = () => {
    if (this.device !== 'desktop') {
      this.setState({
        showObservation: false,
        showDetails: true,
      });
    }
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });

    if (this.device === 'desktop') {
      this.setState({
        showObservation: true,
        showDetails: true,
        windowWidth: window.innerWidth,
      });
    } else {
      this.setState(state => ({
        showObservation: state.showObservation,
        showDetails: (state.showObservation && state.showDetails) ? false : state.showDetails,
        windowWidth: window.innerWidth,
      }));
    }
  }

  render() {
    const {
      avatarURL,
      callSource,
      canEditFlag,
      canLikeFlag,
      commentsCount,
      commentsForumId,
      commentsThreadId,
      commentsTopicId,
      customerImageId,
      displayName,
      fileData,
      gravityRankLabel,
      imageTitle,
      imageURL,
      likePrompt,
      likesCount,
      objectId,
      observationLog,
      observationTimeDisplay,
      observationTitle,
      saveLabel,
      scheduledMissionId,
      showCommentsLink,
      showLikePrompt,
      user,
    } = this.props;
    const { showObservation, showDetails } = this.state;
    const obsStyle = {
      background: `url(${imageURL}) no-repeat top center`,
    };

    const showMissionRelatedInfo = Number(scheduledMissionId) > 0;
    const rightPanelDisplayFlags = [showMissionRelatedInfo];
    const showRightContainer = showDetails && rightPanelDisplayFlags.filter(flag => !!flag).length > 0;
    return (<div className="root">
      <div className="obs-img-container component-container">
        <div className="obs-header">
          <div className="obs-img-header">AN OBSERVATION OF</div>
          <div className="obs-img-subheader" dangerouslySetInnerHTML={{ __html: imageTitle }}/>
        </div>
        <div className="obs-image" style={obsStyle} />
        <div className="split-nav">
          <div className="split-nav-item-container" onClick={this.showObservation}>
            <div className="split-nav-item">Observation</div>
            <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg" className={'pointer-arrow', classnames({
              'is-hidden': showObservation
            })} />
          </div>
          <div className="split-nav-item-container" onClick={this.showDetails}>
            <div className="split-nav-item" >Details</div>
            <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg" className={'pointer-arrow', classnames({
              'is-hidden': showDetails
            })} />
          </div>
        </div>
        <div className="object-details">
          {objectId !== '0' ? <ObjectDetailList
            device={this.device}
            objectId={objectId}
            scheduledMissionId={scheduledMissionId}
          /> : null}
        </div>
      </div>
      <div className="main-container">
        {showObservation ? <div className="left-container">
          {!canEditFlag && <ObservationInformation
            canLikeFlag={canLikeFlag}
            customerImageId={customerImageId}
            fileData={fileData}
            likesCount={likesCount}
            likePrompt={likePrompt}
            observationLog={observationLog}
            observationTime={observationTimeDisplay}
            observationTitle={observationTitle}
            user={user}
          />}
          {canEditFlag && <ObservationsForm
            customerImageId={customerImageId}
            observationLog={observationLog}
            observationTitle={observationTitle}
            saveLabel={saveLabel}
            scheduledMissionId={scheduledMissionId}
            user={user}
          />}
          {showCommentsLink ? <DiscussionComments
            callSource={callSource}
            count={10}
            commentsCount={commentsCount}
            commentsThreadId={commentsThreadId}
            forumId={commentsForumId}
            topicId={commentsTopicId}
            threadId={commentsThreadId}
            user={user}
          /> : null}
        </div> : null}
        {showRightContainer ? <div className="right-container">
        <div>
          <ObserverInfo
            avatarURL={avatarURL}
            device={this.device}
            displayName={displayName}
            gravityRankLabel={gravityRankLabel}
          />
        </div>
          {this.device !== 'desktop' && objectId !== '0' ? <div>
            <ObjectDetailList
              device={this.device}
              objectId={objectId}
              scheduledMissionId={scheduledMissionId}
            />
          </div> : null}
          {showMissionRelatedInfo ? <div className="component-container">
            <MissionDetailList
              scheduledMissionId={scheduledMissionId}
              customerImageId={customerImageId}
            />
          </div> : null}
          {showMissionRelatedInfo ? <div className="component-container">
            <MissionImageDetailList
              scheduledMissionId={scheduledMissionId}
            />
          </div> : null}
        </div> : null}
      </div>
      <style jsx>{`

        .root {
          font-family: ${primaryFont};
          color: ${darkGray};
        }


        .component-container {
          margin: 25px;
          -moz-box-shadow: 0 2px 4px 1px ${gray};
          -webkit-box-shadow: 0 2px 4px 1px ${gray};
          box-shadow: 0 2px 4px 1px ${gray};
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

        .obs-image {
          position: relative;
          width: 100%;
          min-height: 500px;
          ${backgroundImageCover}
        }

        .main-container {
          display: flex;
        }

        .split-nav {
          display: none;
          align-items: center;
          flex-direction: row;
          font-size: 11px;
          font-weight: bold;
          justify-content: space-evenly;
          margin-top: 25px;
          text-transform: uppercase;
        }

        .split-nav-item {
          margin: 5px;
        }

        .split-nav-item-container {
          border: 1px solid ${gray};
          flex: 0 50%;
        }

        .left-container {
          flex: 3;
        }

        .right-container {
          flex: 1;
        }

        .pointer-arrow {
          margin-bottom: -5px;
        }


        @media all and (min-width: 641px) and (max-width: 768px) {

          .split-nav {
            display: flex;
          }
          .object-details {
            display: none;
          }
        }
        @media all and (max-width: 640px){
          .split-nav {
            display: flex;
          }
          .object-details {
            display: none;
          }
        }

      `}</style>
    </div>);
  }
}

export default BootstrappedImageDetails;
