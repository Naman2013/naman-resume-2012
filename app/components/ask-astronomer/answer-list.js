import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AnswerListItem from './answer-list-item';
import {
  toggleAllAnswers,
  updateAnswersDisplayList,
} from '../../modules/ask-astronomer-answers/actions';
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
  user,
}) => ({
  showAllAnswers: astronomerAnswers.showAllAnswers,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toggleAllAnswers,
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
    showAllAnswers: false,
    threadId: null,
  }

  static propTypes = {
    answers: shape({
      page: number,
      replies: arrayOf(shape({})),
      topAnswer: number,
    }), // answers only pertaining to a single question
    threadId: number,
    showAllAnswers: bool,
    displayedAnswers: arrayOf(any),
  }

  constructor(props) {
    super(props)
  }

  handlePageChange (paginatedSet, page) {
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
      answers,
      showAllAnswers,
      displayedAnswers,
    } = this.props;
    const count = showAllAnswers ? 1 : 2;
    return <div>
      {displayedAnswers.map(answer => <AnswerListItem
        answer={answer}
        key={answer.replyId}
        showAllAnswers={showAllAnswers}
        isTopAnswer={answers.topAnswer && answer.replyId === answers.topAnswer}
      />)}
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
