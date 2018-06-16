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
import Form from './Form';
import CommentRepliesListItem from './CommentRepliesListItem';
import PaginateSet from '../paginate-full-set/PaginateSet';

const {
  arrayOf,
  number,
  shape,
  string,
} = PropTypes;

class CommentRepliesList extends Component {
  static propTypes = {
    callSource: string,
    count: number,
    forumId: number,
    replies: arrayOf(shape({})),
    replyId: number,
    resultsCount: number,
    threadId: number,
    topicId: number,
    user: shape({
      at: number,
      token: string,
      cid: number,
    }).isRequired,

  };
  static defaultProps = {
    callSource: null,
    count: 10,
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
    submitError: false,
    submitted: false,
    submitting: false,
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

  get displayedRepliesObjs () {
    const { displayedReplies, replies } = this.state;
    return [].concat(replies).filter(reply => displayedReplies.indexOf(reply.replyId) > -1);
  }

  handleReply = (params) => {
    this.setState({
      submitting: true,
    });
    submitReply(params).then((res) => {
      const { error, reply } = res.data;
      if (!error) {
        const { count } = this.props;
        const { replies, page } = this.state;
        const lastPage = (Math.ceil(replies.length) / count) || 1;
        let newDisplayedReplies;
        const newAllReplies = [].concat(replies, Object.assign({ likesCount: 0 }, reply));
        if (page === lastPage) {
          newDisplayedReplies = [].concat(replies, reply.replyId)
        }
        this.setState({
          submitting: false,
          submitted: true,
          displayedReplies: newDisplayedReplies,
          replies: newAllReplies,
        });
      } else {
        this.setState({
          submitting: false,
          submitError: false,
          submitted: true,
        });
      }
    });
  }

  render() {
    const {
      callSource,
      count,
      forumId,
      threadId,
      replyId,
      topicId,
      user,
    } = this.props;
    const {
      page,
      replies,
      submitting,
      submitError,
      submitted,
    } = this.state;
    const { displayedRepliesObjs } = this;
    return (
      <div className="comment" key={threadId}>
        <Form
          avatarURL={user.avatarURL}
          callSource={callSource}
          disableButton={submitting}
          key={uniqueId()}
          replyId={replyId}
          replyTo={replyId}
          showSubmitError={submitError}
          showSubmitLoader={submitting}
          submitReply={this.handleReply}
          submitted={submitted}
          threadId={threadId}
          topicId={topicId}
          user={user}
        />
        {displayedRepliesObjs.map((displayedComment) => {
          const likeParams = {
            callSource,
            replyId: displayedComment.replyId,
            topicId,
            forumId,
          };
          return (<CommentRepliesListItem
            key={displayedComment.replyId}
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
        <style jsx>{`
        `}</style>
      </div>

    );
  }
}


export default CommentRepliesList;
