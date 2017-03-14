import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DiscussionsReplyItem from '../../../components/discussions/DiscussionsReplyItem';
import styles from '../discussions.scss';
import ByUserTag from '../../../components/common/by-user-tag/by-user-tag';

const { array, object, string } = PropTypes;

class DiscussionsThread extends Component {
  render() {
    const { repliesList, thread, topicId, forumId } = this.props;

    return (
      <div>
        <article className={styles.discussionsItem}>
          <ByUserTag
            photo={thread.avatarURL}
            name={thread.displayName}
            accountType={thread.membershipType}
            memberSince={thread.memberSince}
            location={thread.location}
            theme="light"
          />
        <div className={styles.discussionsCreationDate}>Posted {thread.creationDate}</div>
          <h3
            className={styles.discussionsTitle}
            dangerouslySetInnerHTML={{ __html: thread.content }}
          />
          <div className={styles.discussionsReplies}>
            <Link className={styles.discussionsrepliesText} to={`discussions/forums/${forumId}/topics/${topicId}/threads/${thread.threadId}/new-reply`}>
              <span>Reply</span>
            </Link>
          </div>
        </article>
          {
            repliesList.map(reply => (
              <div key={reply.replyId} className={styles.discussionsItem}>
                <DiscussionsReplyItem
                  reply={reply}
                  styles={styles}
                />
              </div>
            ))
          }
      </div>
    );
  }
}

DiscussionsThread.propTypes = {
  repliesList: array.isRequired,
  thread: object.isRequired,
  topicId: string.isRequired,
};

export default DiscussionsThread;
