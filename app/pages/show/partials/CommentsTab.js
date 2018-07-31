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
import styles from './MainContent.style';

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
    isDesktop: bool.isRequired,
    isScreenMedium: bool.isRequired,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {

  };

  state = {

  }



  render() {
    const {
      content,
      discussionForumId,
      discussionTopicId,
      discussionThreadId,
      isDesktop,
      isScreenMedium,
      user,
    } = this.props;

    return (
      <div>
        <DiscussionComments
          forumId={discussionForumId}
          isSimple
          threadId={discussionThreadId}
          topicId={discussionTopicId}
          user={user}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default CommentsTab;
