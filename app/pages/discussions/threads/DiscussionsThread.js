import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DiscussionsReplyItem from '../../../components/discussions/DiscussionsReplyItem';
import styles from '../discussions.scss';
import ByUserTag from '../../../components/common/by-user-tag/by-user-tag';

const { array, func, object, string, number } = PropTypes;

class DiscussionsThread extends Component {
  render() {
    const {
      fetchReplies,
      forumId,
      repliesCount,
      repliesList,
      thread,
      topicId,
      page,
    } = this.props;
    const images = thread.S3Files || [];
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
          {images.map(img => <img className={styles.discussionsImages} key={img} alt="image" src={img} />)}
          {thread.closedFlag === 'no' && <div className={styles.discussionsReplies}>
            <Link className={styles.discussionsrepliesText} to={`discussions/forums/${forumId}/topics/${topicId}/threads/${thread.threadId}/new-reply`}>
              <span>Reply</span>
            </Link>
          </div>}
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
        {(repliesList.length < repliesCount) && <div className="load-more" onClick={() => fetchReplies({
          page: page + 1,
          appendToList: true,
          parentId: thread.threadId,
          topicId,
          threadId: thread.threadId,
          replyTo: thread.threadId,
        })}>Load more...</div>}
      </div>
    );
  }
}
DiscussionsThread.defaultProps = {
  repliesCount: 0,
};

DiscussionsThread.propTypes = {
  fetchReplies: func.isRequired,
  repliesList: array.isRequired,
  repliesCount: number,
  thread: object.isRequired,
  topicId: string.isRequired,
  page: number.isRequired,
};

export default DiscussionsThread;
