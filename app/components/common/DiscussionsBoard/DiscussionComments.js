/***********************************
 * V4 Discussion Comments List Bootstrapped
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import noop from 'lodash/noop';
import find from 'lodash/find';
import { submitReply } from 'app/services/discussions/submit-reply';
import { THREAD_REPLIES } from 'app/services/discussions';
import CommentListItem from './CommentListItem';
import Form from './ReplyForm';
import ShowMoreFullSet from '../ShowMoreFullSet';
import styles from './DiscussionsBoard.style';

const { arrayOf, bool, func, number, oneOfType, shape, string } = PropTypes;

class DiscussionsComment extends Component {
  static propTypes = {
    callSource: string,
    canSubmitReplies: bool,
    count: number,
    discussions: shape({
      threadsList: arrayOf(shape({})).isRequired,
      commentsList: shape({}).isRequired,
      displayedComments: shape({}).isRequired,
    }),
    discussionsActions: shape({
      updateThreadsProps: func.isRequired,
      updateCommentsProps: func.isRequired,
    }),
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
    discussionsActions: {
      updateThreadsProps: noop,
      updateCommentsProps: noop,
    },
    discussions: {
      threadsList: [],
      commentsList: [],
      displayedComments: [],
      displayedThreads: [],
    },
    callSource: null,
    count: 10,
    forumId: null,
    threadId: null,
    topicId: null,
    canSubmitReplies: true,
  };

  componentDidMount() {
    const {
      threadId,
      getReplies,
      discussions: { commentsList },
    } = this.props;

    if (typeof commentsList[threadId] === 'undefined' && getReplies) {
      getReplies(threadId);
    }
  }

  get displayedCommentsObjs() {
    const {
      threadId,
      discussions: { commentsList, displayedComments },
    } = this.props;
    const comments = commentsList[threadId] || [];
    const displayed = displayedComments[threadId] || [];
    return []
      .concat(comments)
      .filter(reply => displayed.indexOf(reply.replyId) > -1);
  }

  getThreadData = () => {
    const {
      threadId,
      discussions: { threadsList },
    } = this.props;

    if (threadsList.length > 0) {
      return threadsList.filter(thread => thread.threadId === threadId)[0];
    }

    return {
      commentPlaceholder: 'Write a public comment',
    };
  };

  handleShowMore = (paginatedSet, page) => {
    const {
      threadId,
      discussionsActions: { updateThreadsProps, updateCommentsProps },
      discussions: { threadsList },
    } = this.props;

    let newThreadList = [].concat(threadsList);

    newThreadList = newThreadList.map(thread => {
      const currentThread = Object.assign({}, thread);
      if (currentThread.threadId === threadId) {
        currentThread.page = page;
      }
      return currentThread;
    });
    updateThreadsProps(newThreadList);
    updateCommentsProps(threadId, null, paginatedSet, page);
  };

  handleReply = (params, callback) => {
    submitReply(params).then(res => {
      const { apiError, reply } = res.data;
      if (!apiError) {
        const { getThreads, threadId, getReplies } = this.props;
        if (getThreads) {
          getThreads();
        }
        if (getReplies) {
          getReplies(threadId);
        }
        //updateThreadsProps(threadsList);
        // const {
        //   count,
        //   threadId,
        //   discussions: { commentsList, displayedComments, threadsList },
        //   discussionsActions: { updateCommentsProps, updateThreadsProps },
        // } = this.props;
        // if (commentsList[threadId]) {
        //   let newThreadsList = [].concat(threadsList);
        //   const comments = commentsList[threadId];
        //   const { page } = (find(newThreadsList, thread => thread.threadId === threadId) || {});
        //   const displayed = displayedComments[threadId] || [];
        //   const lastPage = (Math.ceil(comments.length / count)) || 1;
        //   let newDisplayedComments = [].concat(displayed);

        //   // add new comment to the thread's list of commments in state
        //   const newCommentsList = [].concat(comments, Object.assign({ likesCount: 0, replyToponlyCount: 0 }, reply));
        //   // update comment count on the thread
        //   newThreadsList = newThreadsList.map((thread) => {
        //     const newThread = Object.assign({}, thread);
        //     if (thread.threadId === threadId) {
        //       newThread.replyToponlyCount = newThread.replyToponlyCount + 1;
        //     }

        //     return newThread;
        //   });

        //   if (page === lastPage) { // if there's only one page of comments, append the new comment to the displayed comments
        //     newDisplayedComments = [].concat(newDisplayedComments, reply.replyId);
        //   }

        //   // set state in parent component
        //   updateCommentsProps(threadId, newCommentsList, newDisplayedComments);
        //   updateThreadsProps(newThreadsList);
        //   this.getReplies();
        // }
      }
      callback(res.data);
    });
  };

  handleReplyToComment = (params, callback) => {
    const { replyTo } = params;
    const {
      count,
      threadId,
      discussions: { commentsList, displayedComments, threadsList },
      discussionsActions: { updateCommentsProps },
      updateComments,
    } = this.props;
    submitReply(params).then(res => {
      const { apiError, reply } = res.data;
      if (!apiError) {
        const { getThreads, getReplies } = this.props;

        const parentThread = find(
          threadsList,
          thread => thread.threadId === threadId
        );
        const parentComment = find(
          commentsList[threadId],
          rep => rep.replyId === replyTo
        );
        if (
          (parentThread && parentComment) ||
          (updateComments && parentComment)
        ) {
          // safeguard
          if (commentsList[replyTo]) {
            const comments = commentsList[replyTo] || [];
            const { page } = parentThread || {};
            const displayed = displayedComments[replyTo] || [];
            const lastPage = Math.ceil(comments.length / count) || 1;
            let newDisplayedComments = [].concat(displayed);
            let newThreadComments = commentsList[threadId] || [];
            // add new comment to the thread's list of commments in state
            const newCommentsList = [].concat(
              comments,
              Object.assign({ likesCount: 0, replyToponlyCount: 0 }, reply)
            );

            if (page === lastPage) {
              // if there's only one page of comments, append the new comment to the displayed comments
              newDisplayedComments = [].concat(
                newDisplayedComments,
                reply.replyId
              );
            }

            // need to update parent replyToponlyCount
            newThreadComments = newThreadComments.map(comment => {
              const currentComment = Object.assign({}, comment);
              if (replyTo === currentComment.replyId) {
                currentComment.replyToponlyCount += 1;
                currentComment.showComments = true;
              }
              return currentComment;
            });
            // set state in parent component
            updateCommentsProps(replyTo, newCommentsList, newDisplayedComments);
            updateCommentsProps(threadId, newThreadComments, null);
          } else {
            // toggle showComments so we do a fresh API call to get the comments
            let newThreadComments = commentsList[threadId] || [];
            // need to update parent replyToponlyCount and showComments
            newThreadComments = newThreadComments.map(comment => {
              const currentComment = Object.assign({}, comment);
              if (replyTo === currentComment.replyId) {
                currentComment.replyToponlyCount += 1;
                currentComment.showComments = true;
              }
              return currentComment;
            });
            updateCommentsProps(threadId, newThreadComments, null);
          }
        }

        if (getThreads) {
          getThreads();
        }
        if (getReplies) {
          getReplies(threadId);
          getReplies(threadId, replyTo);
        }
      }
      callback(res.data);
    });
  };

  render() {
    const {
      callSource,
      canSubmitReplies,
      count,
      discussions,
      discussionsActions,
      formPlaceholder,
      forumId,
      isDesktop,
      page,
      renderToggle,
      replyToponlyCount,
      threadId,
      topicId,
      user,
      validateResponseAccess,
      flagParams,      
    } = this.props;

    const { commentsList } = discussions;

    const comments = commentsList[threadId] || [];
    const { displayedCommentsObjs } = this;
    const threadData = this.getThreadData(); 
    debugger;
    return (
      <div className="comment" key={uniqueId()}>
        <div>
          {canSubmitReplies ? (
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
              placeholder={formPlaceholder}
              {...threadData}
              canSubmitReplies={canSubmitReplies}
            />
          ) : null}
        </div>
        {comments.length > 0 ? (
          <div className="replies-list-contanier">
            <div className="num-replies">
              <span className="replies-number">Replies: {comments.length}</span>
            </div>
            <div className="replies-list">
              {displayedCommentsObjs.map(displayedComment => {
                const likeParams = {
                  callSource,
                  replyId: displayedComment.replyId,
                  topicId,
                  forumId,
                };
                return (
                  <CommentListItem
                    flagParams={{
                      ...flagParams,
                      itemId: displayedComment.replyId,
                      itemType: 'reply',
                    }}
                    key={displayedComment.replyId}
                    validateResponseAccess={validateResponseAccess}
                    discussions={discussions}
                    discussionsActions={discussionsActions}
                    allowReplies={canSubmitReplies}
                    {...displayedComment}
                    likeParams={likeParams}
                    isDesktop={isDesktop}
                    threadId={threadId}
                    topicId={topicId}
                    page={displayedComment.page}
                    forumId={forumId}
                    replyId={displayedComment.replyId}
                    submitReply={this.handleReplyToComment}
                    count={count}
                    callSource={callSource}
                    user={user}
                  />
                );
              })}
            </div>
          </div>
        ) : null}

       
          {displayedCommentsObjs.length > 0 && (
             <div className="flex toggle-container">
            <ShowMoreFullSet
              handleShowMore={this.handleShowMore}
              fullDataSet={comments}
              count={count}
              totalCount={comments.length}
              page={page}
            />
            
            </div>
          )}
          {renderToggle ? renderToggle() : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DiscussionsComment;
