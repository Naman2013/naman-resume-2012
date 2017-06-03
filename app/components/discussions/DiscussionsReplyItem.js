import React, { Component, PropTypes } from 'react';
import ByUserTag from '../common/by-user-tag/by-user-tag';
import Heart from '../common/heart/heart';
import { likeReply } from '../../services/discussions/like';
const { object } = PropTypes;

class DiscussionsReply extends Component {
  prepareData(reply, replies) {
    const { styles, forumId, topicId } = this.props;
    const images = reply.S3Files || [];
    const likeParams = {
      replyId: reply.replyId,
      forumId,
      topicId,
    }
    return (
      <section key={reply.replyId}>
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
        {images.map(img => <a href={img} rel="noopener noreferrer" target="_blank"><img className={styles.discussionsImages} key={img} alt="image" src={img} /></a>)}
        <div className={styles.discussionsReplies}>
          {/* For next iteration: <span className={styles.discussionsrepliesText}>Reply</span> */}
          <div className={`${styles.discussionsInlineHeart} no-margin`}>
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
        {/* For next iteration: replies && replies.map(reply => (this.prepareData(reply))) */}
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
