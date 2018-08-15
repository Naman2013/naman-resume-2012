/***********************************
* V4 Shows CommentsTab
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import { romance } from 'styles/variables/colors_tiles_v4';
import DiscussionComments from 'components/common/DiscussionsBoard/DiscussionComments';
import styles from './CommentsTab.style';

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

class CommentsTab extends Component {
  static propTypes = {
    content: string,
    canSubmitReplies: bool,
    isDesktop: bool.isRequired,
    isScreenMedium: bool.isRequired,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    canSubmitReplies: true,
  };

  state = {

  }



  render() {
    const {
      content,
      discussionForumId,
      discussionTopicId,
      discussionThreadId,
      canSubmitReplies,
      isDesktop,
      isScreenMedium,
      user,
    } = this.props;

    return (
      <div className="root">
        <DiscussionComments
          forumId={discussionForumId}
          threadId={discussionThreadId}
          replyTo={discussionThreadId}
          topicId={discussionTopicId}
          user={user}
          isDesktop={isDesktop}
          canSubmitReplies={canSubmitReplies}
          callSource="groups"
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default CommentsTab;
