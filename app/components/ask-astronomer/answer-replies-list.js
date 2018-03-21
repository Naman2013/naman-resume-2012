import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AnswerListItem from './answer-list-item';

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
  showAllReplies: astronomerDiscuss.showAllReplies,
  showReplies: astronomerDiscuss.showReplies,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({

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
      actions,
      answers,
      showAllAnswers,
      displayedAnswers,
      threadId,
    } = this.props;
    const count = showAllAnswers ? 1 : 2;
    return <div>

    </div>
  }
}

export default AnswerList;
