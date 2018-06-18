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
const {
  any,
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class BootstrappedImageDetails extends Component {
  static propTypes = {
    callSource: string,
    commentsForumId: number,
    commentsThreadId: number,
    commentsTopicId: number,
    imageURL: string,
    showCommentsLink: bool,
    user: shape({
      at: number,
      token: string,
      cid: number,
    }).isRequired,
  }

  static defaultProps = {
    callSource: null,
    commentsForumId: 0,
    commentsThreadId: 0,
    commentsTopicId: 0,
    imageURL: '',
    showCommentsLink: false,
  };

  state = {
  };


  render() {
    const {
      imageURL,
      callSource,
      commentsTopicId,
      commentsForumId,
      commentsThreadId,
      showCommentsLink,
      user,
    } = this.props;
    console.log('rpops', this.props);
    const obsStyle = {
      background: `url(${imageURL}) no-repeat top center`,
      'background-size': '100%',
    };
    return (<div className="root">
      <div className="obs-image" style={obsStyle} />
      <div className="left-container">
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
      <div className="right-container"></div>
      <style jsx>{`
        .obs-image {
          position: relative;
          width: 100%;
          min-height: 500px;
          ${backgroundImageCover}
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
