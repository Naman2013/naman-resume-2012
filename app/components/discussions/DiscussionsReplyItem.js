import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ByUserTag from '../common/by-user-tag/by-user-tag';
import Heart from '../common/heart/heart';
import { getReplies } from '../../services/discussions/get-replies';
import { likeReply } from '../../services/discussions/like';
import { pink } from '../../styles/variables/colors';

const { object } = PropTypes;

function generateId(seed) {
  const random = Math.floor(Math.random() * 99999);
  return `${seed}-${random}`;
}
class DiscussionsReply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
      repliesLoading: false,
      repliesError: false,
    };
  }

  componentDidMount() {
    const {
      reply,
    } = this.props;

    if (reply.replyCount > 0) {
      this.fetchReplies();
    }
  }

  fetchReplies = () => {
    const {
      reply,
      forumId,
      topicId,
      threadId,
    } = this.props;

    this.setState({
      repliesLoading: true,
      repliesError: false,
    });
    getReplies({
      forumId,
      topicId,
      threadId,
      replyTo: reply.replyId,
    }).then((res) => {
      if (!res.data.apiError) {
        this.setState({
          replies: res.data.replies,
          repliesLoading: false,
        });
      } else {
        this.setState({
          repliesLoading: false,
          repliesError: true,
        });
      }
    });
  }

  prepareData(reply) {
    const { styles, forumId, topicId, threadId } = this.props;
    const { replies, repliesLoading, repliesError } = this.state;
    const images = reply.S3Files || [];
    const likeParams = {
      replyId: reply.replyId,
      forumId,
      topicId,
    };


    return (
      <section key={generateId(reply.replyId)}>
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
        {(replies.length || repliesLoading || repliesError) && <div style={{ marginLeft: '50px', marginBottom: replies.length ? '0' : '25px' }}>
          {replies && replies.map(childReply => (<DiscussionsReply
            reply={childReply}
            threadId={threadId}
            forumId={forumId}
            topicId={topicId}
            styles={styles}
            key={childReply.replyId}
          />))}
          {reply.replyCount > 0 && repliesLoading && <span>
            <h3>Loading replies...</h3>
          </span>}
          {repliesError && <span>
            <h3>There was an error fetching replies.</h3>
            <div>
              <a onClick={this.fetchReplies} className="link">Try again</a>
            </div>
          </span>}
        </div>}
        <style jsx>{`

          .link {
            color: ${pink};
            cursor: pointer;
          }
        `}</style>
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
