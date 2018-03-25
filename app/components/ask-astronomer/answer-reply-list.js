import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  submittingReplies: astronomerDiscuss.submitting,
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
    objectId: string.isRequired,
    replyId: number.isRequired,
    threadId: number.isRequired,
    topicId: number.isRequired,
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
      showAllReplies,
      threadId,
      topicId,
      user,
    } = this.props;
    const count = showAllReplies ? paginationCount: 1;
    return <div key={replyId}>
      {displayedReplies.map(reply => <AnswerReplyListItem reply={reply} reply={reply.replyId} />)}
      <ReplyForm
        objectId={objectId}
        replyId={replyId}
        threadId={threadId}
        topicId={topicId}
        user={user}
        submitReply={actions.replyToAnswer}
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
