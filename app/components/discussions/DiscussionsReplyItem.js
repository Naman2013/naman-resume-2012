import React, { Component, PropTypes } from 'react';
import ByUserTag from '../common/by-user-tag/by-user-tag';

const { object } = PropTypes;

class DiscussionsReply extends Component {
  prepareData(reply, replies) {
    const { styles } = this.props;
    const images = reply.S3Files || [];
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
        {images.map(img => <img className={styles.discussionsImages} key={img} alt="image" src={img} />)}
        <div className={styles.discussionsReplies}>
          {/* For next iteration: <span className={styles.discussionsrepliesText}>Reply</span> */}
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
