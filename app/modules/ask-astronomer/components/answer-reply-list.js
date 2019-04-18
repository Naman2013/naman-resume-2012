import uniqueId from 'lodash/uniqueId';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  replyToAnswer,
  updateAnswerRepliesDisplayList,
} from '../reducers/ask-astronomer-answer-discuss/actions';
import styles from './answer-list.style';
import AnswerReplyListItem from './answer-reply-list-item';
import messages from './answer-reply-list.messages';

const mapStateToProps = ({ astronomerAnswers, astronomerDiscuss, user }) => ({
  paginationCount: astronomerDiscuss.paginationCount,
  submitId: astronomerDiscuss.submitId,
  submitErrorId: astronomerDiscuss.submitErrorId,
  repliesSubmitted: astronomerDiscuss.submitted,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      updateAnswerRepliesDisplayList,
      replyToAnswer,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AnswerReplyList extends Component {
  static defaultProps = {
    answerReplies: null,
    displayedReplies: [],
    showAllReplies: false,
    threadId: null,
    submitId: 0,
    submitErrorId: 0,
    repliesSubmitted: {},
  };

  handlePageChange = (paginatedSet, page) => {
    const { actions, replyId } = this.props;
    // make call to update page and displayed replies here
    actions.updateAnswerRepliesDisplayList({
      page,
      replyId,
      displayedReplies: paginatedSet,
    });
  };

  loadMore = (fullDataSet, page, count) => {
    const endIndex = count * page;
    const updatedDataSet = fullDataSet
      .slice(0, endIndex)
      .map(item => item.replyId);

    const { actions, replyId } = this.props;
    // make call to update page and displayed answers here
    actions.updateAnswerRepliesDisplayList({
      page,
      replyId,
      displayedReplies: updatedDataSet,
    });
  };

  isLastPage = (totalCount, currentPage, numberOnPage) => {
    return totalCount <= currentPage * numberOnPage;
  };

  render() {
    const {
      actions,
      answerReplies,
      displayedReplies,
      objectId,
      paginationCount,
      numberOfRepliesToAnswer,
      replyId,
      isDesktop,
      modalActions,
      repliesSubmitted,
      showAllReplies,
      submitId,
      submitErrorId,
      threadId,
      topicId,
      user,
    } = this.props;
    const count = showAllReplies ? paginationCount : 1;
    const showPagination =
      showAllReplies &&
      displayedReplies.length > 0 &&
      count < answerReplies.replies.length;

    return (
      <div key={uniqueId()}>
        {numberOfRepliesToAnswer > 0 ? (
          <div className="replies-list-contanier">
            <div className="num-replies">
              <span className="replies-number">
                <FormattedMessage {...messages.Replies} />:{' '}
                {numberOfRepliesToAnswer}
              </span>
            </div>
            <div className="replies-list">
              {displayedReplies.map(reply => {
                const likeParams = {
                  callSource: 'qanda',
                  objectId,
                  replyId: reply.replyId,
                  topicId,
                  replyType: 'debate',
                };
                return (
                  <AnswerReplyListItem
                    key={uniqueId()}
                    isDesktop={isDesktop}
                    likeParams={likeParams}
                    reply={reply}
                    user={user}
                    modalActions={modalActions}
                  />
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="text-center mt-3 mb-3">
          {!this.isLastPage(
            answerReplies.replies.length,
            answerReplies.page,
            count
          ) && (
            <Button
              onClick={() =>
                this.loadMore(
                  answerReplies.replies,
                  answerReplies.page + 1,
                  count
                )
              }
            >
              Load More
            </Button>
          )}
        </div>

        {/*{showPagination && (
          <PaginateSet
            handlePageChange={this.handlePageChange}
            fullDataSet={answerReplies.replies}
            count={count}
            totalCount={answerReplies.replies.length}
            page={answerReplies.page}
          />
        )}*/}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AnswerReplyList;
