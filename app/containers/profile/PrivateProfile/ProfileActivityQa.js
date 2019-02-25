/* ********************************
 * V4 Private profile activity QA
 ********************************* */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import _get from 'lodash/get';

import MainContainer from '../../ask-astronomer/partials/MainContainer';
import {
  fetchAstronomerQuestions,
  askQuestion,
  changeAnswerState,
} from '../../../modules/ask-astronomer-questions/actions';
import {
  toggleAllAnswersAndDisplay,
  submitAnswerToQuestion,
} from '../../../modules/ask-astronomer-answers/actions';
import { DeviceContext } from '../../../providers/DeviceProvider';
import { customModalStylesV4 } from '../../../styles/mixins/utilities';

import styles from './PrivateProfile.styles';

const { func, shape, string, number } = PropTypes;

class ProfileActivityQa extends Component {
  static propTypes = {
    actions: shape({
      fetchAstronomerQuestions: func.isRequired,
    }).isRequired,
    askAnAstronomerData: shape({}).isRequired,
    questionFilter: string.isRequired,
    totalCount: number.isRequired,
  };

  state = {
    showPrompt: false,
    promptComponent: null,
    promptStyles: customModalStylesV4,
  };

  componentDidMount() {
    const { actions, askAnAstronomerData } = this.props;
    actions.fetchAstronomerQuestions({
      answerState: askAnAstronomerData.defaultAnswerState,
    });
  }

  getTextCount = count => {
    const txt = _get(
      this.props,
      'askAnAstronomerData.askAnAstronomerDataHeading',
      ''
    );
    return txt.replace(' x ', ` ${count} `);
  };

  getFilterOptions = () => {
    const { askAnAstronomerData } = this.props;
    const options = Object.keys(askAnAstronomerData.answerStateOptions).map(
      key => {
        return {
          label: askAnAstronomerData.answerStateOptions[key],
          value: key,
        };
      }
    );

    return options;
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

  handlePageChange = page => {
    const { actions } = this.props;
    actions.fetchAstronomerQuestions({
      appendToList: false,
      currentPage: page,
    });
  };

  updateQuestionsList = () => {
    const { actions } = this.props;

    actions.fetchAstronomerQuestions({});
  };

  render() {
    const {
      actions,
      questionFilter,
      totalCount,
      user,
      askAnAstronomerData,
    } = this.props;

    const { setModal, showModal, closeModal } = this;
    const modalActions = { setModal, showModal, closeModal };
    const { showPrompt, promptComponent, promptStyles } = this.state;

    return (
      <div className="root">
        <DeviceContext.Consumer>
          {context => (
            <Fragment>
              <Modal
                ariaHideApp={false}
                isOpen={showPrompt}
                style={promptStyles}
                contentLabel="askAstronomer"
                onRequestClose={this.closeModal}
              >
                {promptComponent}
              </Modal>
              <MainContainer
                {...this.props}
                {...context}
                questionFilter={questionFilter}
                handlePageChange={this.handlePageChange}
                actions={actions}
                user={user}
                submitAnswer={this.submitAnswer}
                countText={this.getTextCount(totalCount)}
                likeParams={{
                  callSource: 'qanda',
                }}
                modalActions={modalActions}
                showDropdown={askAnAstronomerData.hasAnswerStateDropdown}
                dropdownOptions={this.getFilterOptions()}
                changeAnswerState={actions.fetchAstronomerQuestions}
                updateQuestionsList={this.updateQuestionsList}
                canAnswerQuestions={askAnAstronomerData.canAnswerQuestions}
              />
            </Fragment>
          )}
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
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileActivityQa);
