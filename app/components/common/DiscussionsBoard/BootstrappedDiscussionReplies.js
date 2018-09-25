/***********************************
* V4 Discussion Comments List Bootstrapped
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import take from 'lodash/take';
import { submitReply } from 'services/discussions/submit-reply';
import RepliesListItem from './RepliesListItem';
import Form from './ReplyForm';
import ShowMoreFullSet from '../../common/ShowMoreFullSet';
import Button from 'components/common/style/buttons/Button';
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

class DiscussionReplies extends Component {
  static propTypes = {
    allowReplies: bool,
    callSource: string,
    canSubmitReplies: bool,
    count: number,
    header: string,
    resultsCount: number,
    parentComments: arrayOf(shape({})),
    isDesktop: bool.isRequired,
    isSimple: bool,
    fetching: bool,
    forumId: oneOfType([number, string]),
    replies: arrayOf(shape({})),
    replyId: oneOfType([number, string]),
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
    canSubmitReplies: true,
    count: 10,
    header: 'Replies',
    isSimple: false,
    resultsCount: 0,
    fetching: false,
    forumId: null,
    replies: [],
    replyId: null,
    threadId: null,
    topicId: null,
  }

  state = {
    comments: [],
    displayedComments: [],
    page: 1,
    displayedResults: this.props.resultsCount,
  }

  componentWillReceiveProps(nextProps) {
    const { replies } = this.props;
    if (replies.length !== nextProps.replies.length) {
      const displayedComments = take([].concat(nextProps.replies), nextProps.count)
        .map(reply => reply.replyId);
        this.setState({
          displayedComments,
          comments: nextProps.replies,
        });
    }
    const { resultsCount } = nextProps;
    if (resultsCount !== this.state.displayedResults) {
      this.setState({
        displayedResults: resultsCount
      })
    }
  }

  get displayedCommentsObjs() {
    const { displayedComments, comments } = this.state;
    return [].concat(comments).filter(reply => displayedComments.indexOf(reply.replyId) > -1);
  }

  handleShowMore = (paginatedSet, page) => {
    this.setState({
      displayedComments: paginatedSet,
      page,
    });
  }

  handleReply = (params, callback) => {
    submitReply(params).then((res) => {
      const { apiError, reply } = res.data;
      if (!apiError) {
        const { count, replyId } = this.props;
        const { comments, page, displayedComments } = this.state;
        const lastPage = (Math.ceil(comments.length / count)) || 1;

        if (replyId === params.replyTo) {
          let newDisplayedReplies = [].concat(displayedComments);
          const newAllReplies = [].concat(comments, Object.assign({ likesCount: 0 }, reply));
          if (page === lastPage) {
            newDisplayedReplies = [].concat(newDisplayedReplies, reply.replyId);
          }
          this.setState(state => ({
            displayedComments: newDisplayedReplies,
            comments: newAllReplies,
            displayedResults: Number(state.displayedResults) + 1,
          }));
        }

      }
      callback(res.data);
    });
  }

  render() {
    const {
      allowReplies,
      callSource,
      canSubmitReplies,
      count,
      fetching,
      forumId,
      header,
      isDesktop,
      isSimple,
      renderToggle,
      resultsCount,
      replyTo,
      threadId,
      topicId,
      user,
    } = this.props;
    const {
      comments,
      page,
      displayedResults,
    } = this.state;
    const { displayedCommentsObjs } = this;
    return (
      <div className="comment" key={uniqueId()}>
        <div className="bordered-container">
          {canSubmitReplies ? <Form
            avatarURL={user.avatarURL}
            callSource={callSource}
            forumId={forumId}
            key={uniqueId()}
            replyTo={replyTo}
            submitReply={this.handleReply}
            threadId={threadId}
            topicId={topicId}
            user={user}
            isDesktop={isDesktop}
          /> : null}
        </div>
        {displayedResults > 0 ? <div className="replies-list-contanier">
          <div className="num-replies">
            <span className="replies-number">Replies: {displayedResults}</span>
          </div>
          <div className="replies-list">
            {displayedCommentsObjs.map((displayedComment) => {
              const likeParams = {
                callSource,
                replyId: displayedComment.replyId,
                topicId,
                forumId,
              };
              return (<RepliesListItem
                key={displayedComment.replyId}
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


export default DiscussionReplies;
