import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DiscussionsReplyItem from '../../../components/discussions/DiscussionsReplyItem';
import styles from '../discussions.scss';
import ByUserTag from '../../../components/common/by-user-tag/by-user-tag';
import Heart from '../../../components/common/heart/heart';
import { likeThread } from '../../../services/discussions/like';
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
    const likeParams = {
      threadId: thread.threadId,
      authorId: thread.userid,
      forumId,
      topicId,
    }
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
            <Link className={`${styles.discussionsrepliesText} inline-block`} to={`discussions/forums/${forumId}/topics/${topicId}/threads/${thread.threadId}/new-reply`}>
              <span>Reply</span>
            </Link>
            <div className={styles.discussionsInlineHeart}>
              <Heart
                likeAction={likeThread}
                theme="dark"
                count={thread.likesCount}
                showLikePrompt={thread.showLikePrompt}
                likePrompt={thread.likePrompt}
                params={likeParams}
              />
            </div>
          </div>}
        </article>
        {
          repliesList.map(reply => (
            <div key={reply.replyId} className={styles.discussionsItem}>
              <DiscussionsReplyItem
                reply={reply}
                styles={styles}
                topicId={topicId}
                forumId={forumId}
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
