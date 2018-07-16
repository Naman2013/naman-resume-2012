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
import { astronaut, romance, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import { dropShadowContainer, customModalStylesV4 } from 'styles/mixins/utilities';
import Button from 'components/common/style/buttons/Button';


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
    isOpen: false,
    prompt: '',
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

  openModal = (prompt) => {
    this.setState({
      isOpen: true,
      prompt,
    });
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const {
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
      isOpen,
      prompt,
      page,
      submitError,
      submitted,
      submitting,
    } = this.state;
    const { displayedCommentsObjs } = this;
    return (
      <div className="comment" key={threadId}>
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
          disableButton={submitting}
          forumId={forumId}
          key={uniqueId()}
          replyTo={threadId}
          showSubmitError={submitError}
          showSubmitLoader={submitting}
          submitReply={this.handleReply}
          submitted={submitted}
          threadId={threadId}
          topicId={topicId}
          user={user}
          isDesktop={isDesktop}
        />
        <Modal
          ariaHideApp={false}
          isOpen={isOpen}
          style={customModalStylesV4}
          contentLabel="Comment Item"
          onRequestClose={this.closeModal}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          <p className="" dangerouslySetInnerHTML={{ __html: prompt }} />
        </Modal>
        <style jsx>{`
          .root {
            font-family: ${primaryFont};
            color: ${astronaut};
            margin-bottom: 10px;
          }
          .comments-bar {
            font-size: 12px;
            text-transform: uppercase;
            color: ${romance};
            background-color: ${astronaut};
            font-weight: bold;
            padding: 25px;
            ${dropShadowContainer}
          }
        `}</style>

      </div>
    );
  }
}


export default CommentList;
