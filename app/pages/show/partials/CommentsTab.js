/** *********************************
 * V4 Shows CommentsTab
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { injectIntl, intlShape } from 'react-intl';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import { romance } from 'app/styles/variables/colors_tiles_v4';
import DiscussionsBoard from 'app/components/common/DiscussionsBoard';
import styles from './CommentsTab.style';
import messages from '../Show.messages';

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
@withTranslation
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
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    canSubmitReplies: true,
  };

  state = {};

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
      t,
      validateResponseAccess,
      showId,
    } = this.props;

    return (
      <div className="root">
        <DiscussionsBoard
          topLevelThread={false}
          forumId={discussionForumId}
          threadId={discussionThreadId}
          replyTo={discussionThreadId}
          topicId={discussionTopicId}
          user={user}
          isDesktop={isDesktop}
          header={t('.Comments')}
          canSubmitReplies={canSubmitReplies}
          validateResponseAccess={validateResponseAccess}
          callSource="shows"
          showId={showId}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(CommentsTab);
