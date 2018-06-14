/***********************************
* V4 Discussion Comments List Bootstrapped
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import CommentListItem from './CommentListItem';
import Form from './Form';
import { submitReply } from 'services/discussions/submit-reply';

import Heart from '../heart/heart';
import PulsePostThumbnails from 'components/pulse/pulse-post-image-thumbnails';
import take from 'lodash/take';
import { dropShadowedContainer, profPic } from './styles';
import {
  darkBlueGray,
  white,
} from 'styles/variables/colors';
import PaginateSet from '../../common/paginate-full-set/PaginateSet';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class CommentList extends Component {
  static propTypes = {
    callSource: string,
    count: number,
    replies: arrayOf(shape({})),
    replyId: number,
    resultsCount: number,
    threadId: number,
    topicId: number,

  };
  static defaultProps = {
    callSource: null,
    count: 10,
    replies: [],
    replyId: null,
    resultsCount: null,
    threadId: null,
    topicId: null,
  }

  state = {
    displayedComments: [],
    page: 1,
    comments: [],
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

  get displayedCommentsObjs () {
    const { displayedComments, replies } = this.state;
    return [].concat(replies).filter(reply => displayedComments.indexOf(reply.replyId) > -1);
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
    });
    submitReply(params).then((res) => {
      const { error, reply } = res.data;
      if (!error) {
        const { count } = this.props;
        const { comments, page } = this.state;
        const lastPage = (Math.ceil(comments.length) / count) || 1;
        let newDisplayedComments;
        const newAllComments = [].concat(comments, Object.assign({ likesCount: 0 }, reply));
        if (page === lastPage) {
          newDisplayedComments = [].concat(comments, reply.replyId)
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
          submitError: false,
          submitted: true,
        });
      }
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
      replies,
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


export default CommentList;
