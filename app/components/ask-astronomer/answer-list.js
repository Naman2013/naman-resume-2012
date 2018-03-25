import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AnswerListItem from './answer-list-item';
import {
  toggleAllAnswersAndDisplay,
  updateAnswersDisplayList,
} from '../../modules/ask-astronomer-answers/actions';
import {
  toggleAndDisplayReplies,
  toggleAllAnswerRepliesAndDisplay,
} from '../../modules/ask-astronomer-answer-discuss/actions';
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
  showAllAnswers: astronomerAnswers.showAllAnswers,
  allReplies: astronomerDiscuss.allReplies,
  displayedReplies: astronomerDiscuss.allDisplayedReplies,
  paginationCount: astronomerAnswers.paginationCount,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toggleAllAnswerRepliesAndDisplay,
    toggleAllAnswersAndDisplay,
    toggleAndDisplayReplies,
    updateAnswersDisplayList,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)

class AnswerList extends Component {
  static defaultProps = {
    answers: {
      page: 0,
      replies: [],
      topAnswer: null,
    },
    displayedAnswers: [],
    threadId: null,
  }

  static propTypes = {
    answers: shape({
      page: number,
      replies: arrayOf(shape({
        avatarURL: string.isRequired,
        displayName: string.isRequired,
        content: string.isRequired,
        likesCount: number.isRequired,
        replyCount: number.isRequired,
        replyId: number.isRequired,
      })),
      topAnswer: number,
    }), // answers only pertaining to a single question
    threadId: number,
    displayedAnswers: arrayOf(any),
    objectId: string.isRequired,
  }

  constructor(props) {
    super(props)
  }

  handlePageChange = (paginatedSet, page) => {
    const {
      actions,
      threadId,
    } = this.props;
    // make call to update page and displayed answers here
    actions.updateAnswersDisplayList({
      page,
      threadId,
      displayedAnswers: paginatedSet,
    });
  }

  render () {
    const {
      actions,
      allReplies,
      answers,
      paginationCount,
      displayedAnswers,
      displayedReplies,
      objectId,
      threadId,
      topicId,
    } = this.props;
    const showAllAnswers = answers.showAllAnswers;
    const count = showAllAnswers ? paginationCount: 1;
    return <div key={threadId}>
      {displayedAnswers.map(answer => {
        const answerReplies = allReplies[answer.replyId] || { replies: [] };
        const allDisplayedRepliesObj = answerReplies
          .replies
          .filter(item => displayedReplies[answer.replyId] && displayedReplies[answer.replyId].indexOf(item.replyId) > -1);
        return (<AnswerListItem
          answer={answer}
          answerReplies={allReplies[answer.replyId]}
          displayedReplies={allDisplayedRepliesObj}
          isTopAnswer={answers.topAnswer && answer.replyId === answers.topAnswer}
          key={answer.replyId}
          objectId={objectId}
          showReplies={answer.showReplies}
          showAllReplies={answer.showAllReplies}
          showAllAnswers={showAllAnswers}
          threadId={threadId}
          toggleAllAnswerReplies={() => actions.toggleAllAnswerRepliesAndDisplay({ threadId: threadId, replyTo: answer.replyId, showAllReplies: true })}
          toggleAnswerReplies={() => actions.toggleAndDisplayReplies({ threadId: threadId, replyTo: answer.replyId, showReplies: !answer.showReplies })}
          toggleAnswers={() => actions.toggleAllAnswersAndDisplay({ threadId, showAllAnswers: true })}
          topicId={topicId}
        />)})}
      {showAllAnswers && displayedAnswers.length > 0 && <PaginateSet
        handlePageChange={this.handlePageChange}
        fullDataSet={answers.replies}
        count={count}
        totalCount={answers.replies.length}
        page={answers.page}
      />}
    </div>
  }
}

export default AnswerList;
