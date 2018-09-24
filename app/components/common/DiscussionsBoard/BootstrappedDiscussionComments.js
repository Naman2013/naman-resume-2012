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
import CommentListItem from './CommentListItem';
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

class CommentList extends Component {
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

        if (!replyId || replyId === params.replyTo) { // if it is a reply to a thread/comment
          let newDisplayedReplies = [].concat(displayedComments);
          const newAllReplies = [].concat(comments, Object.assign({ likesCount: 0 }, reply));
          if (page === lastPage) {
            newDisplayedReplies = [].concat(newDisplayedReplies, reply.replyId);
          }
          this.setState({
            displayedComments: newDisplayedReplies,
            comments: newAllReplies,
          });
        } else if (replyId === params.replyTo) { // if it is a reply to reply
          // open comments list of it is not already open and append comments
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
              return (<CommentListItem
                key={displayedComment.replyId}
                allowReplies={allowReplies && canSubmitReplies}
                {...displayedComment}
                likeParams={likeParams}
                isDesktop={isDesktop}
                isSimple={isSimple}
                threadId={threadId}
                topicId={topicId}
                replyTo={displayedComment.replyId}
                forumId={forumId}
                submitReply={this.handleReply}
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


export default CommentList;
