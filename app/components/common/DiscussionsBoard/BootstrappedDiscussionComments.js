/***********************************
* V4 Discussion Comments List Bootstrapped
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import { submitReply } from 'services/discussions/submit-reply';
import CommentListItem from './CommentListItem';
import Form from './ReplyForm';
import PaginateSet from '../../common/paginate-full-set/PaginateSet';
import Button from 'components/common/style/buttons/Button';
import styles from './DiscussionsBoard.style';


const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class CommentList extends Component {
  static propTypes = {
    allowReplies: bool,
    callSource: string,
    count: number,
    resultsCount: number,
    isDesktop: bool.isRequired,
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
    allowReplies: true,
    callSource: null,
    count: 10,
    resultsCount: 0,
    fetching: false,
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

  render() {
    const {
      allowReplies,
      resultsCount,
      fetching,
      forumId,
      isDesktop,
      count,
      threadId,
      topicId,
      user,
      callSource,
    } = this.props;
    const {
      comments,
      page,
    } = this.state;
    const { displayedCommentsObjs } = this;
    return (
      <div className="comment" key={uniqueId()}>
        {!fetching ? <div className="comments-bar">
          Replies ({resultsCount})
        </div> : null}
        {displayedCommentsObjs.map((displayedComment) => {
          const likeParams = {
            callSource,
            replyId: displayedComment.replyId,
            topicId,
            forumId,
          };
          return (<CommentListItem
            key={displayedComment.replyId}
            allowReplies={allowReplies}
            {...displayedComment}
            likeParams={likeParams}
            isDesktop={isDesktop}
            threadId={threadId}
            topicId={topicId}
            forumId={forumId}
            count={count}
            callSource={callSource}
            user={user}
            openModal={this.openModal}
          />)
       })}
        {displayedCommentsObjs.length > 0 && <PaginateSet
          handlePageChange={this.handlePageChange}
          fullDataSet={comments}
          count={count}
          totalCount={comments.length}
          page={page}
        />}
        <Button icon="" />
        <Form
          avatarURL={user.avatarURL}
          callSource={callSource}
          forumId={forumId}
          key={uniqueId()}
          replyTo={threadId}
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


export default CommentList;
