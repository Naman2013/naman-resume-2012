/***********************************
* V4 Discussion Comments List Bootstrapped
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import { submitReply } from 'services/discussions/submit-reply';
import Form from './ReplyForm';
import CommentRepliesListItem from './CommentRepliesListItem';
import PaginateSet from '../paginate-full-set/PaginateSet';
import Button from 'components/common/style/buttons/Button';
import styles from './DiscussionsBoard.style'
const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class CommentRepliesList extends Component {
  static propTypes = {
    callSource: string,
    count: number,
    fetching: bool,
    forumId: oneOfType([number, string]),
    replies: arrayOf(shape({})),
    replyId: oneOfType([number, string]),
    resultsCount: number,
    threadId: oneOfType([number, string]),
    topicId: oneOfType([number, string]),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,

  };
  static defaultProps = {
    callSource: null,
    count: 10,
    fetching: false,
    forumId: null,
    replies: [],
    replyId: null,
    resultsCount: null,
    threadId: null,
    topicId: null,
  }

  state = {
    displayedReplies: [],
    page: 1,
    replies: [],
  }

  componentWillReceiveProps(nextProps) {
    const { resultsCount, replies } = this.props;
    if (replies.length !== nextProps.replies.length) {
      const displayedReplies = take([].concat(nextProps.replies), nextProps.count)
        .map(reply => reply.replyId);
        this.setState({
          displayedReplies,
          replies: nextProps.replies,
        });
    }
  }

  handlePageChange = (paginatedSet, page) => {

    this.setState({
      displayedReplies: paginatedSet,
      page,
    });
  }

  handleReply = (params, callback) => {
    submitReply(params).then((res) => {
      const { apiError, reply } = res.data;
      if (!apiError) {
        const { count } = this.props;
        const { replies, page, displayedReplies } = this.state;
        const lastPage = (Math.ceil(replies.length / count)) || 1;
        let newDisplayedReplies = [].concat(displayedReplies);
        const newAllReplies = [].concat(replies, Object.assign({ likesCount: 0 }, reply));
        if (page === lastPage) {
          newDisplayedReplies = newDisplayedReplies.concat(replies, reply.replyId);
        }
        this.setState({
          displayedReplies: newDisplayedReplies,
          replies: newAllReplies,
        });

      }
      callback(res.data);
  });
}


  get displayedRepliesObjs () {
    const { displayedReplies, replies } = this.state;
    return [].concat(replies).filter(reply => displayedReplies.indexOf(reply.replyId) > -1);
  }

  render() {
    const {
      callSource,
      count,
      fetching,
      forumId,
      threadId,
      resultsCount,
      replyId,
      topicId,
      user,
      isDesktop,
    } = this.props;
    const {
      page,
      replies,
    } = this.state;
    const { displayedRepliesObjs } = this;
    return (
      <div className="comment" key={uniqueId()}>
      {!fetching ? <div className="comments-bar">
        Replies ({ resultsCount })
      </div> : null}
        {fetching && <div>Loading</div>}
        {displayedRepliesObjs.map((displayedComment) => {
          const likeParams = {
            callSource,
            replyId: displayedComment.replyId,
            topicId,
            forumId,
          };
          return (<CommentRepliesListItem
            key={displayedComment.replyId}
            user={user}
            {...displayedComment}
            likeParams={likeParams}
          />)
        })}
        {displayedRepliesObjs.length > 0 && <PaginateSet
          handlePageChange={this.handlePageChange}
          fullDataSet={replies}
          count={count}
          totalCount={replies.length}
          page={page}
        />}
        <Button />
        <Form
          avatarURL={user.avatarURL}
          callSource={callSource}
          forumId={forumId}
          key={uniqueId()}
          replyId={replyId}
          replyTo={replyId}
          submitReply={this.handleReply}
          threadId={threadId}
          topicId={topicId}
          user={user}
          isDesktop={isDesktop}
        />
        <style jsx>{styles}</style>
      </div>

    );
  }
}


export default CommentRepliesList;
