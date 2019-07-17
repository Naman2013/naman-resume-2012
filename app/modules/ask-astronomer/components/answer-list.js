import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  replyToAnswer,
  toggleAllAnswerRepliesAndDisplay,
} from '../reducers/ask-astronomer-answer-discuss/actions';
import {
  toggleAllAnswersAndDisplay,
  updateAnswersDisplayList,
} from '../reducers/ask-astronomer-answers/actions';
import AnswerListItem from './answer-list-item';
import messages from './answer-list.messages';
import styles from './answer-list.style';

const mapStateToProps = ({ astronomerAnswers, astronomerDiscuss, user }) => ({
  allReplies: astronomerDiscuss.allReplies,
  displayedReplies: astronomerDiscuss.allDisplayedReplies,
  fetchingReplies: astronomerDiscuss.fetchingObj,
  paginationCount: astronomerAnswers.paginationCount,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      toggleAllAnswerRepliesAndDisplay,
      toggleAllAnswersAndDisplay,
      updateAnswersDisplayList,
      replyToAnswer,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AnswerList extends Component {
  static defaultProps = {
    answers: {
      page: 0,
      replies: [],
      topAnswer: null,
    },
    allReplies: {},
    displayedReplies: {},
    fetchingReplies: {},
    displayedAnswers: [],
    threadId: null,
  };

  loadMore = (fullDataSet, page, count) => {
    const endIndex = count * page;
    const updatedDataSet = fullDataSet
      .slice(0, endIndex)
      .map(item => item.replyId);

    const { actions, threadId } = this.props;
    // make call to update page and displayed answers here
    actions.updateAnswersDisplayList({
      page,
      threadId,
      displayedAnswers: updatedDataSet,
    });
  };

  isLastPage = (totalCount, currentPage, numberOnPage) => {
    return totalCount <= currentPage * numberOnPage;
  };

  handlePageChange = (paginatedSet, page) => {
    const { actions, threadId } = this.props;
    // make call to update page and displayed answers here

    actions.updateAnswersDisplayList({
      page,
      threadId,
      displayedAnswers: paginatedSet,
    });
  };

  submitReply = (requestParams, callback) => {
    const { actions, objectId } = this.props;
    actions
      .replyToAnswer({ ...requestParams, objectId })
      .then(res => callback(res.payload));
  };

  render() {
    const {
      actions,
      allReplies,
      answers,
      canReplyToAnswers,
      displayedAnswers,
      displayedReplies,
      fetchingReplies,
      modalActions,
      isDesktop,
      numberOfAnswersToThread,
      objectId,
      paginationCount,
      threadId,
      topicId,
      user,
      updateQuestionsList,
    } = this.props;
    const { showAllAnswers } = answers;
    const count = showAllAnswers ? paginationCount : 1;
    const showPagination =
      showAllAnswers &&
      displayedAnswers.length > 0 &&
      count < answers.replies.length;

    return (
      <div key={threadId}>
        <div className="replies-list-contanier">
          <div className="num-replies">
            <span className="replies-number">
              <FormattedMessage {...messages.Answers} />:{' '}
              {numberOfAnswersToThread}
            </span>
          </div>
          <div className="replies-list">
            {displayedAnswers.map(answer => {
              const likeParams = {
                callSource: 'qanda',
                objectId,
                replyId: answer.replyId,
                topicId,
                replyType: 'answer',
              };
              const answerReplies = allReplies[answer.replyId] || {
                replies: [],
              };
              const allDisplayedRepliesObj = answerReplies.replies.filter(
                item =>
                  displayedReplies[answer.replyId] &&
                  displayedReplies[answer.replyId].indexOf(item.replyId) > -1
              );
              const toggleAllAnswerReplies = () =>
                actions.toggleAllAnswerRepliesAndDisplay({
                  threadId,
                  replyId: answer.replyId,
                  showAllReplies: !answerReplies.showAllReplies,
                });

              return (
                <AnswerListItem
                  answer={answer}
                  answerReplies={allReplies[answer.replyId]}
                  canReplyToAnswers={canReplyToAnswers}
                  displayedReplies={allDisplayedRepliesObj}
                  fetchingReplies={fetchingReplies[answer.replyId]}
                  isDesktop={isDesktop}
                  isTopAnswer={
                    answers.topAnswer && answer.replyId === answers.topAnswer
                  }
                  key={answer.replyId}
                  likeParams={likeParams}
                  numberOfRepliesToAnswer={answer.replyToponlyCount}
                  objectId={objectId}
                  showAllReplies={answerReplies.showAllReplies}
                  submitReply={this.submitReply}
                  threadId={threadId}
                  toggleAllAnswerReplies={toggleAllAnswerReplies}
                  topicId={topicId}
                  user={user}
                  modalActions={modalActions}
                  updateQuestionsList={updateQuestionsList}
                />
              );
            })}
            <div className="text-center mt-3 mb-3">
              {!this.isLastPage(
                answers.replies.length,
                answers.page,
                count
              ) && (
                <Button
                  onClick={() =>
                    this.loadMore(answers.replies, answers.page + 1, count)
                  }
                >
                  Load More
                </Button>
              )}
            </div>
            {/*{showPagination && (
                <PaginateSet
                  handlePageChange={this.handlePageChange}
                  fullDataSet={answers.replies}
                  count={count}
                  totalCount={answers.replies.length}
                  page={answers.page}
                />
              )}*/}
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AnswerList;
