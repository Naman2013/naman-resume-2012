/***********************************
* V4 Discussions Board Thread List
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

class BootstrappedImageDetails extends Component {
  static propTypes = {
    callSource: string,
    canEditFlag: bool,
    commentsForumId: oneOfType([number, string]),
    commentsThreadId: oneOfType([number, string]),
    commentsTopicId: oneOfType([number, string]),
    customerImageId: string,
    fileData: shape({
      'Photo By': string,
    }),
    imageTitle: string,
    imageURL: string,
    scheduledMissionId: string,
    saveLabel: string,
    showCommentsLink: bool,
    observationLog: string,
    observationTimeDisplay: arrayOf(string),
    observationTitle: string,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  }

  static defaultProps = {
    callSource: null,
    canEditFlag: false,
    commentsForumId: 0,
    commentsThreadId: 0,
    commentsTopicId: 0,
    customerImageId: null,
    fileData: {
      'Photo By': '',
    },
    imageTitle: '',
    imageURL: '',
    observationLog: '',
    observationTimeDisplay: [],
    observationTitle: '',
    saveLabel: '',
    scheduledMissionId: null,
    showCommentsLink: false,
  };

  state = {
  };


  render() {
    const {
      callSource,
      canEditFlag,
      commentsForumId,
      commentsThreadId,
      commentsTopicId,
      customerImageId,
      fileData,
      imageTitle,
      imageURL,
      observationLog,
      observationTimeDisplay,
      observationTitle,
      saveLabel,
      scheduledMissionId,
      showCommentsLink,
      user,
    } = this.props;

    const obsStyle = {
      background: `url(${imageURL}) no-repeat top center`,
    };

    return (<div className="root">
      <div className="obs-img-container">
        <div className="obs-header">
          <div className="obs-img-header">AN OBSERVATION OF</div>
          <div className="obs-img-subheader" dangerouslySetInnerHTML={{ __html: imageTitle }}/>
        </div>
        <div className="obs-image" style={obsStyle} />
        <div className="wide-info-block">
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
        <div className="left-container">
          {!canEditFlag && <div className="obs-container">
            <div dangerouslySetInnerHTML={{ __html: observationTitle}} />
            <div dangerouslySetInnerHTML={{ __html: fileData['Photo By']}} />
            <div dangerouslySetInnerHTML={{ __html: observationTimeDisplay.join('')}} />
            <div dangerouslySetInnerHTML={{ __html: observationLog}} />
          </div>}
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
            commentsThreadId={commentsThreadId}
            forumId={commentsForumId}
            topicId={commentsTopicId}
            threadId={commentsThreadId}
            user={user}
          /> : null}
        </div>
        <div className="right-container">
          {Number(scheduledMissionId) > 0 ? <MissionDetailList
            scheduledMissionId={scheduledMissionId}
            customerImageId={customerImageId}
          /> : null}
          {Number(scheduledMissionId) > 0 ? <MissionImageDetailList
            scheduledMissionId={scheduledMissionId}
          /> : null}
        </div>
      </div>
      <style jsx>{`

        .root {
          font-family: ${primaryFont};
          color: ${darkGray};
        }

        .obs-img-container {
          margin: 25px;
          text-align: center;
          -moz-box-shadow: 0 2px 4px 0 ${gray};
           -webkit-box-shadow: 0 2px 4px 0 ${gray};
           box-shadow: 0 2px 4px 0 ${gray};
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

        .wide-info-block {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          -moz-box-shadow: 0 2px 4px 0 ${gray};
           -webkit-box-shadow: 0 2px 4px 0 ${gray};
           box-shadow: 0 2px 4px 0 ${gray};
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
      `}</style>
    </div>);
  }
}

export default BootstrappedImageDetails;
