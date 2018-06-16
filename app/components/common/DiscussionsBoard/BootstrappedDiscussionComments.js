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
import CommentListItem from './CommentListItem';
import Form from './Form';
import PaginateSet from '../../common/paginate-full-set/PaginateSet';

const {
  arrayOf,
  number,
  shape,
  string,
} = PropTypes;

class CommentList extends Component {
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
    comments: [],
    displayedComments: [],
    page: 1,
    submitError: false,
    submitted: false,
    submitting: false,
  }

  componentWillReceiveProps(nextProps) {
    const { resultsCount, replies } = this.props;
    if (replies.length !== nextProps.replies.length) {
      const displayedComments = take([].concat(nextProps.replies), nextProps.count)
        .map(reply => reply.replyId);
        this.setState({
          displayedComments,
          comments: nextProps.replies,
        });
    }
  }

  get displayedCommentsObjs() {
    const { displayedComments, comments } = this.state;
    return [].concat(comments).filter(reply => displayedComments.indexOf(reply.replyId) > -1);
  }

  handlePageChange = (paginatedSet, page) => {
    this.setState({
      displayedComments: paginatedSet,
      page,
    });
  }

  handleReply = (params) => {
    this.setState({
      submitting: true,
      submitError: false,
      submitted: false,
    });
    submitReply(params).then((res) => {
      const { apiError, reply } = res.data;
      if (!apiError) {
        const { count } = this.props;
        const { comments, page, displayedComments } = this.state;
        const lastPage = (Math.ceil(comments.length / count)) || 1;
        let newDisplayedComments = [].concat(displayedComments);
        const newAllComments = [].concat(comments, Object.assign({ likesCount: 0 }, reply));
        if (page === lastPage) {
          newDisplayedComments = newDisplayedComments.concat(comments, reply.replyId);
        }
        this.setState({
          submitting: false,
          submitted: true,
          displayedComments: newDisplayedComments,
          comments: newAllComments,
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
      forumId,
      count,
      threadId,
      topicId,
      user,
      callSource,
    } = this.props;
    const {
      page,
      comments,
      submitting,
      submitError,
      submitted,
    } = this.state;
    const { displayedCommentsObjs } = this;
    return (
      <div className="comment" key={threadId}>
        <Form
          avatarURL={user.avatarURL}
          callSource={callSource}
          disableButton={submitting}
          key={uniqueId()}
          replyTo={threadId}
          showSubmitError={submitError}
          showSubmitLoader={submitting}
          submitReply={this.handleReply}
          submitted={submitted}
          threadId={threadId}
          topicId={topicId}
          user={user}
        />
        {displayedCommentsObjs.map((displayedComment) => {
          const likeParams = {
            callSource,
            replyId: displayedComment.replyId,
            topicId,
            forumId,
          };
          return (<CommentListItem
            key={displayedComment.replyId}
            {...displayedComment}
            likeParams={likeParams}
            threadId={threadId}
            topicId={topicId}
            forumId={forumId}
            count={count}
            callSource={callSource}
            user={user}
          />)
       })}
        {displayedCommentsObjs.length > 0 && <PaginateSet
          handlePageChange={this.handlePageChange}
          fullDataSet={comments}
          count={count}
          totalCount={comments.length}
          page={page}
        />}
        <style jsx>{`
        `}</style>

      </div>
    );
  }
}


export default CommentList;
