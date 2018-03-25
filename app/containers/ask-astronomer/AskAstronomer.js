/***********************************
* V4 Ask an Astronomer Wrapper
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import {
  fetchAstronomerQuestions,
} from '../../modules/ask-astronomer-questions/actions';
import {
  toggleAllAnswersAndDisplay,
} from '../../modules/ask-astronomer-answers/actions';
import QuestionList from '../../components/ask-astronomer/question-list';

const {
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({
  appConfig,
  astronomerAnswers,
  astronomerQuestions,
  objectDetails,
  user,
}) => ({
  allAnswers: astronomerAnswers.allAnswers,
  allDisplayedAnswers: astronomerAnswers.allDisplayedAnswers,
  appConfig,
  objectData: objectDetails.objectData,
  questions: astronomerQuestions.threadList,
  page: astronomerQuestions.page,
  totalCount: astronomerQuestions.threadCount,
  count: astronomerQuestions.count,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchAstronomerQuestions,
    toggleAllAnswersAndDisplay,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class AskAstronomer extends Component {

  static propTypes = {
    page: number,
    totalCount: number,
    count: number,
    params: shape({
      objectId: string,
    }).isRequired,
    actions: shape({
      fetchAstronomerQuestions: func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    page: 1,
    totalCount: 0,
    count: 0,
    actions: { },
    objectId: '',
  }
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const {
      objectData: {
        faqTopicId,
      }
    } = nextProps;

    //fetch the question data, the object page has been changed.
    if (this.props.params.objectId != nextProps.params.objectId) {
      this.props.actions.fetchAstronomerQuestions({ topicId: faqTopicId });
    }
  }


  componentWillMount() {
    const {
      params: {
        objectId,
      },
      objectData: {
        faqTopicId,
      }
    } = this.props;

    if (this.props.objectData.objectId != objectId) {
        //fetch questions only if the objectId changes.
        this.props.actions.fetchAstronomerQuestions({ topicId: faqTopicId });
    }
  }

  handlePageChange = (page) => {
    debugger;
    const {
      actions,
      objectData: {
        faqTopicId,
      },
    } = this.props;
    actions.fetchAstronomerQuestions({
      appendToList: false,
      page,
      topicId: faqTopicId,
    });
  };

  render() {
    const {
      actions,
      allAnswers,
      allDisplayedAnswers,
      params: {
        objectId,
      },
      questions,
      totalCount,
      count,
      page,
    } = this.props;

    return (
      <div>
        <QuestionList
          allAnswers={allAnswers}
          allDisplayedAnswers={allDisplayedAnswers}
          count={count}
          handlePageChange={this.handlePageChange}
          objectId={objectId}
          page={page}
          questions={questions}
          toggleAllAnswersAndDisplay={actions.toggleAllAnswersAndDisplay}
          totalCount={totalCount}
        />
      </div>
    )
  }
}

export default AskAstronomer;
