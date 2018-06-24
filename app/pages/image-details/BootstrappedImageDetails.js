/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { backgroundImageCover } from 'styles/mixins/utilities';
import DiscussionComments from 'components/common/DiscussionsBoard/DiscussionComments';
import MissionDetailList from 'components/common/MissionDetailList';
import MissionImageDetailList from 'components/common/MissionImageDetailList';
import ObservationsForm from 'components/ObservationsForm';
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
    fileData: shape({
      'Photo By': string,
    }),
    imageTitle: string,
    imageURL: string,
    likePrompt: string,
    likesCount: number,
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
    imageTitle: '',
    imageURL: '',
    likesCount: 0,
    likePrompt: '',
    showLikePrompt: true,
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
      callSource,
      canEditFlag,
      canLikeFlag,
      commentsCount,
      commentsForumId,
      commentsThreadId,
      commentsTopicId,
      customerImageId,
      fileData,
      imageTitle,
      imageURL,
      likePrompt,
      likesCount,
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
          <div onClick={this.showObservation}>Observation</div>
          <div onClick={this.showDetails}>Details</div>
        </div>
        <div className="wide-info-block object-details">
          <div className="wide-info-item">
            <div className="wide-info-block-header">Object Type:</div>
            <div className="wide-info-block-name">Placeholder Text</div>
          </div>
          <div className="wide-info-item">
            <div className="wide-info-block-header">Domain:</div>
            <div className="wide-info-block-name">Placeholder Text</div>
          </div>
          <div className="wide-info-item">
            <div className="wide-info-block-header">Constellation:</div>
            <div className="wide-info-block-name">Placeholder Text</div>
          </div>
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
          {this.device !== 'desktop' ? <div className="wide-info-block component-container">
            <div className="wide-info-item">
              <div className="wide-info-block-header">Object Type:</div>
              <div className="wide-info-block-name">Placeholder Text</div>
            </div>
            <div className="wide-info-item">
              <div className="wide-info-block-header">Domain:</div>
              <div className="wide-info-block-name">Placeholder Text</div>
            </div>
            <div className="wide-info-item">
              <div className="wide-info-block-header">Constellation:</div>
              <div className="wide-info-block-name">Placeholder Text</div>
            </div>
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

        .wide-info-block, .split-nav {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          margin-top: 25px;
        }

        .split-nav {
          display: none;
        }

        .wide-info-item {
          flex: 1 1 0;
          border: 1px solid ${gray};
          padding: 25px;
          text-align: left;
        }

        .wide-info-block-header {
          font-weight: bold;
          font-size: 11px;
          padding: 10px;
        }

        .wide-info-block-name {
          font-size: 20px;
          padding: 10px;
          font-family: ${secondaryFont};

        }

        .left-container {
          flex: 3;
        }

        .right-container {
          flex: 1;
        }

        .split-nav {
          font-weight: bold;
          font-size: 11px;
          padding: 10px;
          text-transform: uppercase;
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
