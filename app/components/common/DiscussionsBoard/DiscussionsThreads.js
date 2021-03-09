/***********************************
 * V4 Discussions Board Thread List
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import { Button } from 'react-bootstrap';
import take from 'lodash/take';
import { submitReply } from 'app/services/discussions/submit-reply';
import Pagination from 'app/components/common/pagination/v4-pagination/pagination';
import { THREAD_LIST, THREAD_REPLIES } from 'app/services/discussions';
import pageMeta from 'app/modules/quest-details/actions/pageMeta';
import { TopThreads } from 'app/modules/clubs';
import DiscussionsItem from './DiscussionsItem';
import CREATE_THREAD_FORM from './DiscussionsThreadFormInterface';
import styles from './DiscussionsBoard.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

@withTranslation()
class DiscussionsThreads extends Component {
  static propTypes = {
    discussions: shape({
      threadsList: arrayOf(shape({})).isRequired,
      displayedThreads: arrayOf(number).isRequired,
      threadsCount: number.isRequired,
    }).isRequired,
    discussionsActions: shape({
      updateThreadsProps: func.isRequired,
    }).isRequired,
    callSource: string,
    count: number,
    createThread: func.isRequired,
    createThreadFormParams: shape({}),
    errorMessage: string,
    forumId: oneOfType([number, string]),
    isDesktop: bool,
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
    createThreadFormParams: {},
    errorMessage: 'There was an error fetching list',
    forumId: null,
    isDesktop: true,
    topicId: null,
  };

  state = {
    fetching: true,
    activePage: null,
    showSearchTermResultHeading: false,
    searchTermResultHeading: null,
  };

  componentDidMount() {
    if (this.props && this.props.topicId !== null) {
      this.getThreads(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { topicId, jumpToThreadId } = this.props;
    const { activePage } = this.state;
    if (
      topicId !== nextProps.topicId ||
      jumpToThreadId !== nextProps.jumpToThreadId
    ) {
      //console.log('aaaa', activePage);
      this.getThreads(nextProps, activePage);
    }
  }

  getThreads = (parms = this.props, page = 1, paging = false) => {
    const {
      callSource,
      count,
      topicId,
      validateResponseAccess,
      user,
      discussionsActions: { updateThreadsProps },
      jumpToThreadId,
    } = parms;

    this.setState({
      fetching: true,
      activePage: paging && page,
    });

    const jumpThreadData =
      jumpToThreadId && !paging ? { threadId: jumpToThreadId } : {};

    const searchValue = this.searchInput.value.trim();
    const searchData = searchValue ? { searchTerms: searchValue } : {};

    API.post(THREAD_LIST, {
      callSource,
      count,
      page,
      topicId,
      at: user.at,
      token: user.token,
      cid: user.cid,
      ...searchData,
      ...jumpThreadData,
    }).then(res => {
      validateResponseAccess(res);
      this.setState({
        fetching: false,
        activePage: res.data.page || page,
        showSearchTermResultHeading: res.data.showSearchTermResultHeading,
        searchTermResultHeading: res.data.searchTermResultHeading,
      });

      if (!res.data.apiError) {
        const { threads, threadCount } = res.data;
        let newThreads = [].concat(threads);
        newThreads = newThreads.map(thread => {
          const currentThread = Object.assign({}, thread);
          currentThread.showComments = false;
          currentThread.page = 1;
          currentThread.key = currentThread.threadId;
          return currentThread;
        });
        updateThreadsProps(newThreads, threadCount);

        if (jumpToThreadId && !paging) {
        }
      }
    });
  };

  getReplies = (threadId, replyTo) => {
    const {
      callSource,
      count,
      topicId,
      forumId,
      //threadId,
      validateResponseAccess,
      user,
      discussions: { commentsList },
      discussionsActions: { updateCommentsProps },
    } = this.props;

    API.post(THREAD_REPLIES, {
      callSource,
      topicId,
      threadId,
      forumId,
      replyTo: replyTo || threadId, // should be threadId
      page: 1,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then(res => {
      validateResponseAccess(res);
      if (!res.data.apiError) {
        const { replies } = res.data;
        const newReplies = replies.map((reply, index) => {
          const currentReply = Object.assign({}, reply);
          currentReply.page = 1;
          if (
            commentsList[threadId] &&
            commentsList[threadId][index]?.replyId === currentReply.replyId
          ) {
            currentReply.showComments =
              commentsList[threadId][index].showComments;
          }
          if (
            replyTo === currentReply.replyId ||
            threadId === currentReply.replyId
          ) {
            currentReply.showComments = true;
          }
          currentReply.key = currentReply.replyId;
          return currentReply;
        });
        const displayedComments = take([].concat(replies), count).map(
          reply => reply.replyId
        );
        updateCommentsProps(replyTo || threadId, newReplies, displayedComments);
      }
    });
  };

  createThread = params => {
    const { createThread } = this.props;
    return createThread(params).then(res => {
      if (!res.payload.apiError) {
        this.getThreads(this.props);
      }

      return res.payload;
    });
  };

  handleReply = (params, callback) => {
    submitReply(params).then(res => {
      const { apiError, reply } = res.data;
      const { count } = this.props;
      if (!apiError) {
        const {
          discussions: { threadsList, commentsList, displayedComments },
          discussionsActions: { updateThreadsProps, updateCommentsProps },
        } = this.props;
        let newThreadsList = [].concat(threadsList);
        let page = 1;
        newThreadsList = newThreadsList.map(thread => {
          const newThread = Object.assign({}, thread);
          if (newThread.threadId === params.threadId) {
            newThread.replyToponlyCount += 1;
            if (!newThread.showComments) {
              newThread.showComments = true;
            }
            page = newThread.page;
          }
          return newThread;
        });
        updateThreadsProps(newThreadsList);

        const comments = Object.assign({}, commentsList);
        const displayed = displayedComments[params.threadId] || [];

        let newDisplayedComments = [].concat(displayed);
        let currentCommentsList = comments[params.threadId] || [];
        currentCommentsList = [].concat(
          currentCommentsList,
          Object.assign(
            {
              likesCount: 0,
              replyToponlyCount: 0,
              showComments: false,
              page: 1,
            },
            reply
          )
        );
        const lastPage = Math.ceil(currentCommentsList.length / count) || 1;
        if (page === lastPage) {
          // if there's only one page of comments, append the new comment to the displayed comments
          newDisplayedComments = [].concat(newDisplayedComments, reply.replyId);
        }
        updateCommentsProps(
          params.threadId,
          currentCommentsList,
          newDisplayedComments
        );

        this.getThreads(this.props);
        this.getReplies(params.threadId);
      }
      callback(res.data);
    });
  };

  handlePageChange = ({ activePage }) => {
    const { jumpToThreadId, discussionGroupId } = this.props;
    if (jumpToThreadId) {
      browserHistory.push(`/community-groups/${discussionGroupId}/discussions`);
    }
    this.getThreads(this.props, activePage, true);
    this.threadsContainer.scrollIntoView();
  };

  handleSearchEnterPress = e => {
    if (e.keyCode == 13) {
      this.getThreads(this.props);
    }
  };

  resetSearch = () => {
    this.searchInput.value = '';
    this.getThreads(this.props);
  };

  render() {
    const {
      callSource,
      count,
      createThreadFormParams,
      discussions,
      discussionsActions,
      errorMessage,
      forumId,
      isDesktop,
      isClub,
      topicId,
      user,
      validateResponseAccess,
      discussionGroupId,
      jumpToThreadId,
      t,
      canSubmitReplies,
      canPost
    } = this.props;
    const {
      fetching,
      activePage,
      showSearchTermResultHeading,
      searchTermResultHeading,
    } = this.state;

    const { threadsCount } = discussions;
   
    return (
      <div className="root">
        <div
          className="comments-bar"
          ref={node => {
            this.threadsContainer = node;
          }}
        >
          {showSearchTermResultHeading ? (
            <span>{searchTermResultHeading}</span>
          ) : (
            <span>
              {t('AskAnAstronomer.Comments')} ({threadsCount})
            </span>
          )}

          <div className="comments-search">
            <input
              placeholder="Search"
              ref={node => {
                this.searchInput = node;
              }}
              onKeyUp={this.handleSearchEnterPress}
            />
            {showSearchTermResultHeading ? (
              <Button onClick={this.resetSearch}>
                {t('AskAnAstronomer.Reset')}
              </Button>
            ) : (
              <Button onClick={() => this.getThreads(this.props)}>
                {t('Clubs.Search')}
              </Button>
            )}
          </div>
        </div>
        <div className="popular-discussion">
          <TopThreads
            
            topicId={topicId}
            isDesktop={isDesktop}
            discussionGroupId={discussionGroupId}
            className="popular-discussion"
          />
        </div>
        {canPost ? (CREATE_THREAD_FORM[callSource].render({
          ...createThreadFormParams,
          createThread: this.createThread,
          isDesktop,
          isClub,
          
        })) : null}

        
        {fetching && <div>{t('AskAnAstronomer.Loading')}</div>}
        {!fetching && threadsCount === 0 ? (
          <div>{t('AskAnAstronomer.NoThreads')}</div>
        ) : null}
        {!fetching && threadsCount > 0 && (
          <div>
            {discussions.threadsList.map(thread => {
              const likeParams = {
                forumId,
                callSource,
                threadId: thread.threadId,
                topicId,
              };
              const flagParams = {
                forumId,
                type: callSource === 'groups' ? 'group' : callSource,
                itemId: thread.threadId,
                topicId,
                discussionGroupId,
                itemType: 'thread',
              };
              return (
                <DiscussionsItem
                  {...thread}
                  key={discussions.discussionKey}
                  validateResponseAccess={validateResponseAccess}
                  discussionsActions={discussionsActions}
                  toggleComments={() =>
                    discussionsActions.toggleThreadComments(thread.threadId)
                  }
                  discussions={discussions}
                  callSource={callSource}
                  forumId={forumId}
                  isDesktop={isDesktop}
                  key={thread.threadId}
                  likeParams={likeParams}
                  flagParams={flagParams}
                  topicId={topicId}
                  count={count}
                  submitReply={this.handleReply}
                  page={thread.page}
                  user={user}
                  getThreads={this.getThreads}
                  getReplies={this.getReplies}
                  jumpToThreadId={jumpToThreadId}                  
                  allowReplies={canSubmitReplies}
                />
              );
            })}
          </div>
        )}
        {threadsCount && activePage ? (
          <div
            className="discussions-pagination"
            key={`discussion-pagination-${topicId}-${jumpToThreadId}`}
          >
            <Pagination
              pagesPerPage={4}
              activePage={activePage}
              onPageChange={this.handlePageChange}
              totalPageCount={Math.ceil(threadsCount / 10)}
            />
          </div>
        ) : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DiscussionsThreads;
