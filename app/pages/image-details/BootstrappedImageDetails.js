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
      scheduledMissionId,
      showCommentsLink,
      user,
    } = this.props;
    console.log('rpops', this.props);
    const obsStyle = {
      background: `url(${imageURL}) no-repeat top center`,
    };
    return (<div className="root">
      <div className="obs-img-container">
        AN OBSERVATION OF
        <div dangerouslySetInnerHTML={{ __html: imageTitle }}/>
        <div className="obs-image" style={obsStyle} />
      </div>
      <div className="wide-info-block">
        <div>
          <h3>Object Type</h3>
        </div>
        <div>
          <h3>Domain</h3>
        </div>
        <div>
          <h3>Constellation</h3>
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
          {/* edit form goes here */ canEditFlag && <div />}
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
        .obs-img-container {
          padding: 50px;
          text-align: center;
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
