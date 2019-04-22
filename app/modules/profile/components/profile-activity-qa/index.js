/* ********************************
 * V4 Private profile activity QA
 ********************************* */
// @flow
import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import _get from 'lodash/get';

import MainContainer from 'app/modules/ask-astronomer/containers/partials/MainContainer';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { customModalStylesV4 } from 'app/styles/mixins/utilities';

import styles from './index.style';

type TProfileActivityQa = {
  actions: {
    fetchAstronomerQuestions: Function,
  },
  askAnAstronomerData: Object,
  questionFilter: string,
  totalCount: number,
  questions: Array,
};

class ProfileActivityQa extends Component<TProfileActivityQa> {
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
      questions,
    } = this.props;
    if (!questions || !questions.length)
      return <h3 className="h-3">No questions</h3>;

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

export default ProfileActivityQa;
