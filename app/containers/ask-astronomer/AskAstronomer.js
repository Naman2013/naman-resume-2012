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
import QuestionList from '../../components/ask-astronomer/question-list';

const {
  func,
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
  answers: astronomerAnswers.allReplies,
  appConfig,
  objectData: objectDetails.objectData,
  questions: astronomerQuestions.threadList,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchAstronomerQuestions,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class AskAstronomer extends Component {

  static propTypes = {
    params: shape({
      objectId: string,
    }).isRequired,
    actions: shape({
      fetchAstronomerQuestions: func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
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

  componentWillUpdate(nextProps) {

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

  render() {
    const {
      answers,
      params: {
        objectId,
      },
      questions,
    } = this.props;

    return (
      <div>
        <QuestionList
          answers={answers}
          questions={questions}
        />
      </div>
    )
  }
}

export default AskAstronomer;
