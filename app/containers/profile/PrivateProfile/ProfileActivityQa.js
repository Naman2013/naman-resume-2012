/* ********************************
 * V4 Private profile activity QA
 ********************************* */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';

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

const { func, shape } = PropTypes;

class ProfileActivityQa extends Component {
  static propTypes = {
    actions: shape({
      fetchAstronomerQuestions: func.isRequired,
    }).isRequired,
    askAnAstronomerData: shape({}).isRequired,
  };

  state = {
    showPrompt: false,
    promptComponent: null,
    promptStyles: customModalStylesV4,
  };

  componentDidMount() {
    this.props.actions.fetchAstronomerQuestions({});
  }

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
    const {
      actions,
    } = this.props;
    actions.fetchAstronomerQuestions({
      appendToList: false,
      page,
    });
  };

  render() {
    const {
      actions,
      allAnswers,
      allDisplayedAnswers,
      fetchingAnswers,
      fetchingQuestions,
      questions,
      questionFilter,
      totalCount,
      count,
      page,
      user,
      objectSpecialists,
      askAnAstronomerData,
    } = this.props;
    console.log(this);
    const { setModal, showModal, closeModal } = this;
    const modalActions = { setModal, showModal, closeModal };
    const { showPrompt, promptComponent, promptStyles } = this.state;

    console.log(this.props);
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
                // likeParams={likeParams}
                modalActions={modalActions}
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
  questionFilter: astronomerQuestions.filter,
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
)(ProfileActivityQa);
