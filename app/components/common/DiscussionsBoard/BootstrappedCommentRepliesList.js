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
      submitted: false,
      submitError: false,
      submitting: true,
    });
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
          submitting: false,
          submitted: true,
          displayedReplies: newDisplayedReplies,
          replies: newAllReplies,
        });
      } else {
        this.setState({
          submitting: false,
          submitError: true,
          submitted: true,
        });
      }

      setTimeout(() => {
        this.setState({
          submitError: false,
          submitted: false,
        });
      }, 3000);
    });
  }

  render() {
    const {
      callSource,
      count,
      fetching,
      forumId,
      threadId,
      replyId,
      topicId,
      user,
      isDesktop,
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
          forumId={forumId}
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
          isDesktop={isDesktop}
        />
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
        <style jsx>{`
        `}</style>
      </div>

    );
  }
}


export default CommentRepliesList;
