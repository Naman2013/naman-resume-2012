/* ********************************
 * V4 Private profile activity QA
 ********************************* */

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';

import {
  fetchAstronomerQuestions,
  askQuestion,
  changeAnswerState,
} from '../../modules/ask-astronomer-questions/actions';
import {
  toggleAllAnswersAndDisplay,
  submitAnswerToQuestion,
} from '../../modules/ask-astronomer-answers/actions';
import { DeviceContext } from '../../providers/DeviceProvider';
import { customModalStylesV4 } from '../../styles/mixins/utilities';

import styles from './QaContainer.styles';

const { func, shape } = PropTypes;

class QaContainer extends Component {
  static propTypes = {
    actions: shape({
      fetchAstronomerQuestions: func.isRequired,
    }).isRequired,
    children: func.isRequired,
  };

  state = {
    showPrompt: false,
    promptComponent: null,
    promptStyles: customModalStylesV4,
  };

  setModal = ({ promptComponent, promptStyles }) => {
    this.setState(state => ({
      promptComponent: promptComponent || state.promptComponent,
      promptStyles: promptStyles || state.promptComponent,
    }));
  };

  showModal = () => {
    this.setState(() => ({
      showPrompt: true,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showPrompt: false,
    }));
  };

  submitAnswer = (params, callback) => {
    const { actions } = this.props;
    actions.submitAnswerToQuestion(params).then(res => callback(res.payload));
  };

  handlePageChange = (page) => {
    const { actions } = this.props;
    actions.fetchAstronomerQuestions({
      appendToList: false,
      page,
    });
  };

  updateQuestionsList = () => {
    const { actions } = this.props;

    actions.fetchAstronomerQuestions({});
  };

  render() {
    const { setModal, showModal, closeModal } = this;
    const modalActions = { setModal, showModal, closeModal };
    const { showPrompt, promptComponent, promptStyles } = this.state;
    const promptProps = { showPrompt, promptComponent, promptStyles };

    return (
      <div className="root">
        <Modal
          ariaHideApp={false}
          isOpen={showPrompt}
          style={promptStyles}
          contentLabel="askAstronomer"
          onRequestClose={this.closeModal}
        >
          {promptComponent}
        </Modal>
        <DeviceContext.Consumer>
          {context =>
            cloneElement(this.props.children, {
              ...this.props,
              context,
              promptProps,
              modalActions,
              handlePageChange: this.handlePageChange,
              submitAnswer: this.submitAnswer,
              updateQuestionsList: this.updateQuestionsList,
            })
          }
        </DeviceContext.Consumer>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ astronomerAnswers, astronomerQuestions, user }) => ({
  allAnswers: astronomerAnswers.allAnswers,
  allDisplayedAnswers: astronomerAnswers.allDisplayedAnswers,
  questionFilter: astronomerQuestions.questionFilter,
  questions: astronomerQuestions.threadList,
  page: astronomerQuestions.page,
  totalCount: astronomerQuestions.threadCount,
  count: astronomerQuestions.count,
  canAnswerQuestions: astronomerQuestions.canAnswerQuestions,
  canReplyToAnswers: astronomerQuestions.canReplyToAnswers,
  fetchingQuestions: astronomerQuestions.fetching,
  fetchingAnswers: astronomerAnswers.fetchingObj,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      askQuestion,
      changeAnswerState,
      fetchAstronomerQuestions,
      toggleAllAnswersAndDisplay,
      submitAnswerToQuestion,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QaContainer);
