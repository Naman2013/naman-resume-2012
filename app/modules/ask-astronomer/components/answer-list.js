import {
  loadMore,
  toggleAllAnswersAndDisplay,
  updateAnswersDisplayList,
} from 'app/modules/ask-astronomer/reducers/ask-astronomer-answers/actions';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  replyToAnswer,
  toggleAllAnswerRepliesAndDisplay,
} from '../reducers/ask-astronomer-answer-discuss/actions';

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
      loadMore,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation
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
    threadId: null,
  };

  isLoadMoreVisible = () => {
    const { answers = [], visibleAnswersCount } = this.props;
    return visibleAnswersCount < answers.length;
  };

  submitReply = (requestParams, callback) => {
    const { actions, objectId } = this.props;
    actions.replyToAnswer({ ...requestParams, objectId }).then(callback);
  };

  render() {
    const {
      actions,
      allReplies,
      answers,
      visibleAnswersCount,
      canReplyToAnswers,
      displayedReplies,
      fetchingReplies,
      modalActions,
      isDesktop,
      numberOfAnswersToThread,
      objectId,
      threadId,
      topicId,
      user,
      updateQuestionsList,
      t,
    } = this.props;

    const { loadMore } = actions;

    return (
      <div key={threadId}>
        <div className="replies-list-contanier">
          <div className="num-replies">
            {Boolean(+numberOfAnswersToThread) && (
              <span className="replies-number">
                {t('.Answers')}
                {numberOfAnswersToThread}
              </span>
            )}
          </div>
          <div className="replies-list">
            {answers.slice(0, visibleAnswersCount).map((answer, ind) => {
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
                    // answers.topAnswer && answer.replyId === answers.topAnswer
                    ind === 0 // todo currently top answer is the first one
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
            {this.isLoadMoreVisible() && (
              <div className="text-center mt-3 mb-3">
                <Button onClick={loadMore}>Load More</Button>
              </div>
            )}
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AnswerList;
