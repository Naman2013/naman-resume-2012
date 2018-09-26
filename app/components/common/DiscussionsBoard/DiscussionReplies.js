/** *********************************
* V4 Discussion Replies (to comments) List Bootstrapped
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import { submitReply } from 'services/discussions/submit-reply';
import { THREAD_REPLIES } from 'services/discussions';
import RepliesListItem from './RepliesListItem';
import Form from './ReplyForm';
import ShowMoreFullSet from '../../common/ShowMoreFullSet';
import styles from './DiscussionsBoard.style';


const {
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class DiscussionsComment extends Component {
  static propTypes = {
    callSource: string,
    canSubmitReplies: bool,
    count: number,
    discussions: shape({
      threadsList: arrayOf(shape({})).isRequired,
      commentsList: shape({}).isRequired,
      displayedComments: shape({}).isRequired,
    }).isRequired,
    discussionsActions: shape({
      updateThreadsProps: func.isRequired,
      updateCommentsProps: func.isRequired,
    }).isRequired,
    isDesktop: bool.isRequired,
    forumId: oneOfType([number, string]),
    threadId: oneOfType([number, string]),
    topicId: oneOfType([number, string]),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };
  static defaultProps = {
    canSubmitReplies: true,
    callSource: null,
    count: 10,
    forumId: null,
    threadId: null,
    topicId: null,
  }

  componentDidMount() {
    const {
      replyId,
      callSource,
      count,
      topicId,
      forumId,
      threadId,
      validateResponseAccess,
      user,
      discussions: { commentsList },
      discussionsActions: { updateCommentsProps },
    } = this.props;
    if (typeof commentsList[replyId] === 'undefined') {
      axios.post(THREAD_REPLIES, {
        callSource,
        topicId,
        threadId,
        forumId,
        replyTo: replyId,
        page: 1,
        at: user.at,
        token: user.token,
        cid: user.cid,
      }).then((res) => {
        validateResponseAccess(res);
        if (!res.data.apiError) {
          const { replies } = res.data;
          const newReplies = [].concat(replies);
          const displayedComments = take([].concat(replies), count)
            .map(reply => reply.replyId);
          updateCommentsProps(replyId, newReplies, displayedComments);
        }
      });
    }
  }

  get displayedCommentsObjs() {
    const {
      replyId,
      discussions: {
        commentsList,
        displayedComments,
      },
    } = this.props;
    const comments = commentsList[replyId] || [];
    const displayed = displayedComments[replyId] || [];
    return [].concat(comments).filter(reply => displayed.indexOf(reply.replyId) > -1);
  }

  handleShowMore = (paginatedSet, page) => {
    const {
      replyId,
      discussionsActions: { updateCommentsProps },
      discussions: { commentsList },
    } = this.props;
    const newCommentList = Object.assign({}, commentsList);
    let comments = newCommentList[replyId] || [];

    comments = comments.map((reply) => {
      const currentReply = Object.assign({}, reply);
      if (currentReply.threadId === replyId) {
        currentReply.page = page;
      }
      return currentReply;
    });
    updateCommentsProps(replyId, comments, paginatedSet);
  }

  handleReply = (params, callback) => {
    submitReply(params).then((res) => {
      const { apiError, reply } = res.data;
      if (!apiError) {
        const {
          count,
          replyId,
          discussions: { commentsList, displayedComments },
          discussionsActions: { updateCommentsProps },
        } = this.props;
        debugger;
        if (commentsList[replyId]) {
          const comments = commentsList[replyId];
          const { page } = comments;
          const displayed = displayedComments[replyId] || [];
          const lastPage = (Math.ceil(comments.length / count)) || 1;
          let newDisplayedComments = [].concat(displayed);

          // add new comment to the thread's list of commments in state
          const newCommentsList = [].concat(comments, Object.assign({ likesCount: 0, replyCount: 0 }, reply));

          if (page === lastPage) { // if there's only one page of comments, append the new comment to the displayed comments
            newDisplayedComments = [].concat(newDisplayedComments, reply.replyId);
          }

          // set state in parent component
          updateCommentsProps(replyId, newCommentsList, newDisplayedComments);
        }
      }
      callback(res.data);
    });
  }

  render() {
    const {
      callSource,
      canSubmitReplies,
      replyId,
      count,
      discussions: { commentsList },
      forumId,
      isDesktop,
      renderToggle,
      threadId,
      topicId,
      user,
      page,
      replyCount,
    } = this.props;

    const comments = commentsList[threadId] || [];
    const { displayedCommentsObjs } = this;

    return (
      <div className="comment" key={uniqueId()}>
        {replyCount > 0 ? <div className="replies-list-contanier">
          {canSubmitReplies ? <Form
            avatarURL={user.avatarURL}
            callSource={callSource}
            forumId={forumId}
            key={uniqueId()}
            replyTo={replyId}
            submitReply={this.handleReply}
            threadId={threadId}
            topicId={topicId}
            user={user}
            isDesktop={isDesktop}
          /> : null}
          <div className="num-replies">
            <span className="replies-number">Replies: {replyCount}</span>
          </div>
          <div className="comment-replies-list">
            {displayedCommentsObjs.map((displayedComment) => {
              const likeParams = {
                callSource,
                replyId: displayedComment.replyId,
                topicId,
                forumId,
              };
              return (<RepliesListItem
                {...displayedComment}
                key={displayedComment.replyId}
                likeParams={likeParams}
                isDesktop={isDesktop}
                threadId={threadId}
                topicId={topicId}
                forumId={forumId}
                count={count}
                callSource={callSource}
                user={user}
              />)
           })}
           </div>
        </div> : null}

        <div className="flex toggle-container">
          {displayedCommentsObjs.length > 0 && <ShowMoreFullSet
            handleShowMore={this.handleShowMore}
            fullDataSet={comments}
            count={count}
            totalCount={comments.length}
            page={page}
          />}
          {renderToggle ? renderToggle() : null}
        </div>
        <style jsx>{styles}</style>

      </div>
    );
  }
}


export default DiscussionsComment;
