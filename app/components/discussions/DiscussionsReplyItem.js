import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ByUserTag from '../common/by-user-tag/by-user-tag';
import Heart from '../common/heart/heart';
import { likeReply } from '../../services/discussions/like';
const { object } = PropTypes;

function generateId(seed) {
  const random = Math.floor(Math.random() * 99999);
  return `${seed}-${random}`;
}
class DiscussionsReply extends Component {
  prepareData(reply, replies, margin = 0) {
    const { styles, forumId, topicId, threadId } = this.props;
    const images = reply.S3Files || [];
    const likeParams = {
      replyId: reply.replyId,
      forumId,
      topicId,
    };
    return (
      <section key={generateId(reply.replyId)} style={{ marginLeft: margin }}>
        <article className={styles.discussionsInfo}>
          <ByUserTag
            photo={reply.avatarURL}
            name={reply.displayName}
            accountType={reply.membershipType}
            memberSince={reply.memberSince}
            location={reply.location}
            theme="light"
          />
          <div className={styles.discussionsCreationDate}>Reply Posted {reply.creationDate}</div>
          <h3
            className={styles.discussionsContent}
            dangerouslySetInnerHTML={{ __html: reply.content }}
          />
        {images.map(img => <a href={img} key={img} rel="noopener noreferrer" target="_blank"><img className={styles.discussionsImages} key={img} alt="image" src={img} /></a>)}
        <div className={styles.discussionsReplies}>
        <Link className={`${styles.discussionsrepliesText} inline-block`} to={`discussions/forums/${forumId}/topics/${topicId}/threads/${threadId}/${reply.replyId}/new-reply`}>
          <span>Reply </span>
        </Link>
          <div className={styles.discussionsInlineHeart}>
            <Heart
              membershipType={reply.membershipType}
              likeAction={likeReply}
              theme="dark"
              count={reply.likesCount}
              authorId={reply.customerId}
              showLikePrompt={reply.showLikePrompt}
              likePrompt={reply.likePrompt}
              params={likeParams}
            />
          </div>
        </div>
        </article>
        {reply.replies && reply.replies.map(childReply => (this.prepareData(childReply, childReply.replies, margin + 50)))}
      </section>
    );
  }

  render() {
    const { reply } = this.props;

    return (
      <div>
        {this.prepareData(reply)}
      </div>
    );
  }
}

DiscussionsReply.propTypes = {
  reply: object.isRequired,
};

export default DiscussionsReply;
