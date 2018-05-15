/***********************************
* V4 Ask Astronomer Answer Reply List
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqueId from 'lodash/uniqueId'
import AnswerReplyListItem from './answer-reply-list-item';
import { updateAnswerRepliesDisplayList, replyToAnswer } from '../../modules/ask-astronomer-answer-discuss/actions';
import ReplyForm from './reply-form';
import PaginateSet from '../common/paginate-full-set/PaginateSet';

const {
  arrayOf,
  any,
  bool,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({
  astronomerAnswers,
  astronomerDiscuss,
  user,
}) => ({
  paginationCount: astronomerDiscuss.paginationCount,
  submitId: astronomerDiscuss.submitId,
  submitErrorId: astronomerDiscuss.submitErrorId,
  repliesSubmitted: astronomerDiscuss.submitted,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateAnswerRepliesDisplayList,
    replyToAnswer,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)

class AnswerReplyList extends Component {
  static defaultProps = {
    answerReplies: null,
    displayedReplies: [],
    showAllReplies: false,
    threadId: null,
    submitId: 0,
    submitErrorId: 0,
    repliesSubmitted: {},
  }

  static propTypes = {
    answerReplies: shape({
      page: number,
      replies: arrayOf(shape({
        avatarURL: string.isRequired,
        displayName: string.isRequired,
        content: string.isRequired,
        likesCount: number.isRequired,
        replyCount: number.isRequired,
        replyId: number.isRequired,
      })),
    }), // replies only pertaining to a single question
    threadId: number,
    showAllReplies: bool,
    displayedReplies: arrayOf(any),
    submitId: number,
    submitErrorId: number,
    objectId: string.isRequired,
    replyId: number.isRequired,
    threadId: number.isRequired,
    topicId: number.isRequired,
    repliesSubmitted: shape({})
  }

  constructor(props) {
    super(props)
  }

  handlePageChange = (paginatedSet, page) => {
    const {
      actions,
      replyId,
    } = this.props;
    // make call to update page and displayed replies here
    actions.updateAnswerRepliesDisplayList({
      page,
      replyId,
      displayedReplies: paginatedSet,
    });
  }

  render () {
    const {
      actions,
      answerReplies,
      displayedReplies,
      objectId,
      paginationCount,
      replyId,
      repliesSubmitted,
      showAllReplies,
      submitId,
      submitErrorId,
      threadId,
      topicId,
      user,
    } = this.props;
    const count = showAllReplies ? paginationCount: 1;
    const showSubmitLoader = submitId === replyId;
    const showSubmitError = submitErrorId === replyId;
    const disableReplyButton = !!(submitId && submitId !== replyId);

    return <div key={uniqueId()}>
      {displayedReplies.map(reply => {
        const likeParams = {
          callSource: 'qanda',
          objectId,
          replyId: reply.replyId,
          topicId,
          replyType: 'debate',
        };
        return <AnswerReplyListItem
          key={uniqueId()}
          likeParams={likeParams}
          reply={reply}
        />
      })}
      <ReplyForm
        avatarURL={user.avatarURL}
        disableButton={disableReplyButton}
        key={uniqueId()}
        objectId={objectId}
        replyId={replyId}
        showSubmitError={showSubmitError}
        showSubmitLoader={showSubmitLoader}
        submitReply={actions.replyToAnswer}
        submitted={repliesSubmitted[replyId]}
        threadId={threadId}
        topicId={topicId}
      />
      {showAllReplies && displayedReplies.length > 0 && <PaginateSet
        handlePageChange={this.handlePageChange}
        fullDataSet={answerReplies.replies}
        count={count}
        totalCount={answerReplies.replies.length}
        page={answerReplies.page}
      />}
      <style jsx>{`
      `}</style>
    </div>
  }
}

export default AnswerReplyList;
