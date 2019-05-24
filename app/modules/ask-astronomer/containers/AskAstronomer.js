import CenterColumn from 'app/components/common/CenterColumn';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { Modal } from 'app/components/modal';
import ObjectDetailsSectionTitle from 'app/components/object-details/ObjectDetailsSectionTitle';
import ResponsiveTwoColumnContainer from 'app/components/ResponsiveTwoColumnContainer';
import TwoTabbedNav from 'app/components/TwoTabbedNav';
import AskQuestionTile from 'app/modules/ask-astronomer/components/AskQuestionTile';
import {
  submitAnswerToQuestion,
  toggleAllAnswersAndDisplay,
} from 'app/modules/ask-astronomer/reducers/ask-astronomer-answers/actions';
import {
  askQuestion,
  changeAnswerState,
  fetchAstronomerQuestions,
} from 'app/modules/ask-astronomer/reducers/ask-astronomer-questions/actions';
import {
  makeAskAstronomerFetchingSelector,
  makeAskAstronomerPageDataSelector,
  makeAskAstronomerQuestionsDataSelector,
} from 'app/modules/ask-astronomer/selectors';
import {
  getAllQuestions,
  getPageData,
} from 'app/modules/ask-astronomer/thunks';
import { fetchObjectSpecialistsAction } from 'app/modules/object-details/actions';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { customModalStylesV4 } from 'app/styles/mixins/utilities';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import messages from './AskAstronomer.messages';
import style from './AskAstronomer.style';
import AsideContainer from './partials/AsideContainer';
import MainContainer from './partials/MainContainer';

const mapStateToProps = state => ({
  allAnswers: state.astronomerAnswers.allAnswers,
  allDisplayedAnswers: state.astronomerAnswers.allDisplayedAnswers,
  appConfig: state.appConfig,
  objectData: state.objectDetails.objectData,
  questionFilter: state.astronomerQuestions.questionFilter,
  questions: state.astronomerQuestions.threadList,
  page: state.astronomerQuestions.page,
  totalCount: state.astronomerQuestions.threadCount,
  count: state.astronomerQuestions.count,
  canAnswerQuestions: state.astronomerQuestions.canAnswerQuestions,
  canReplyToAnswers: state.astronomerQuestions.canReplyToAnswers,
  fetchingQuestions: state.astronomerQuestions.fetching,
  fetchingAnswers: state.astronomerAnswers.fetchingObj,
  fetchingAnswersBool: state.astronomerAnswers.fetching,
  user: state.user,
  objectDetails: state.objectDetails,
  objectSpecialists: state.objectDetails.objectSpecialists,

  fetching: makeAskAstronomerFetchingSelector()(state),
  pageData: makeAskAstronomerPageDataSelector()(state),
  questionsData: makeAskAstronomerQuestionsDataSelector()(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      askQuestion,
      changeAnswerState,
      fetchAstronomerQuestions,
      getAllQuestions,
      getPageData,
      toggleAllAnswersAndDisplay,
      fetchObjectSpecialistsAction,
      submitAnswerToQuestion,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AskAstronomer extends Component {
  static defaultProps = {
    fetchingQuestions: false,
    fetchingAnswers: {},
    page: 1,
    totalCount: 0,
    count: 0,
    actions: {},
    objectId: '',
    questionFilter: 'all',
  };

  constructor(props) {
    super();

    this.state = {
      showPrompt: false,
      promptComponent: null,
      promptStyles: customModalStylesV4,
      // aaaQuestionPrompt: {},
    };
  }

  componentDidMount() {
    const {
      params: { objectId },
      actions: { getPageData },
    } = this.props;

    getPageData(objectId);
    this.fetchQuestions();
  }

  fetchQuestions = filter => {
    const {
      actions,
      params: { objectId },
    } = this.props;
    const { getAllQuestions, fetchAstronomerQuestions } = actions;

    // getAllQuestions({ objectId, ...filter });
    return fetchAstronomerQuestions({ objectId, ...filter });
  };

  handlePageChange = page => {
    this.fetchQuestions({ currentPage: page });
  };

  submitAnswer = (params, callback) => {
    const { actions, page } = this.props;
    return actions
      .submitAnswerToQuestion(params)
      .then(res => callback(res.payload));
  };

  submitQuestion = (params, callback) => {
    const { actions } = this.props;
    this.closeModal();
    actions.askQuestion(params).then(res => callback(res.payload));
  };

  showModal = () =>
    this.setState(() => ({
      showPrompt: true,
    }));

  closeModal = () =>
    this.setState(() => ({
      showPrompt: false,
    }));

  setModal = ({ promptComponent, promptStyles }) =>
    this.setState(state => ({
      promptComponent: promptComponent || state.promptComponent,
      promptStyles: promptStyles || state.promptComponent,
    }));

  updateQuestionsList = filter => this.fetchQuestions({ ...filter });

  render() {
    const {
      actions,
      allAnswers,
      allDisplayedAnswers,
      fetchingAnswers,
      fetchingQuestions,
      params: { faqTopicId, objectId },
      objectData: { objectTitle },
      questions,
      questionFilter,
      totalCount,
      count,
      page,
      user,
      objectSpecialists,
      intl,

      fetching,
      pageData,
      questionsData,
      fetchingAnswersBool,
    } = this.props;

    const {
      showPrompt,
      promptComponent,
      promptStyles,
      // aaaQuestionPrompt,
    } = this.state;

    const likeParams = {
      callSource: 'qanda',
      objectId,
      topicId: faqTopicId,
    };

    const { setModal, showModal, closeModal } = this;
    const modalActions = { setModal, showModal, closeModal };

    return (
      <div style={{ position: 'relative' }}>
        <Modal show={showPrompt} onHide={this.closeModal}>
          {promptComponent}
        </Modal>

        <DeviceContext.Consumer>
          {context => (
            <div className="full-bg">
              <ObjectDetailsSectionTitle
                title={`${objectTitle}'s`}
                subTitle="Ask An Astronomer"
                theme={{ padding: '25px' }}
              />
              <CenterColumn
                widths={['768px', '940px', '940px']}
                theme={{ paddingTop: '25px' }}
              >
                <div className="ask-astronomer">
                  <DisplayAtBreakpoint screenSmall>
                    <div className="ask-mobile-header">
                      <div className="icon-container">
                        <div className="border">
                          <div className="icon">
                            <img
                              className="icon-content"
                              alt=""
                              width="180"
                              height="180"
                              src="https://vega.slooh.com/assets/v4/common/ask_mobile_bg.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DisplayAtBreakpoint>
                  <DisplayAtBreakpoint screenMedium>
                    <div className="ask-tablet-header">
                      <AskQuestionTile
                        modalActions={modalActions}
                        objectId={objectId}
                        user={user}
                        submitQuestion={this.submitQuestion}
                        updateQuestionsList={this.updateQuestionsList}
                        {...pageData}
                      />
                    </div>
                  </DisplayAtBreakpoint>
                  <ResponsiveTwoColumnContainer
                    renderNavigationComponent={navProps => (
                      <TwoTabbedNav
                        firstTitle={intl.formatMessage(messages.Questions)}
                        secondTitle={
                          context.isMobile
                            ? intl.formatMessage(messages.AskNow)
                            : intl.formatMessage(messages.MVPAstronomers)
                        }
                        firstTabIsActive={navProps.showMainContainer}
                        firstTabOnClick={navProps.onShowMainContainer}
                        secondTabIsActive={navProps.showAsideContainer}
                        secondTabOnClick={navProps.onShowAsideContainer}
                      />
                    )}
                    renderAsideContent={() => (
                      <div>
                        <AsideContainer
                          {...this.props}
                          {...context}
                          modalActions={modalActions}
                          objectId={objectId}
                          user={user}
                          submitQuestion={this.submitQuestion}
                          aaaQuestionPrompt={pageData}
                          updateQuestionsList={this.updateQuestionsList}
                        />
                      </div>
                    )}
                    isScreenSize={context.isScreenLarge}
                    renderMainContent={() => (
                      <MainContainer
                        {...this.props}
                        {...context}
                        questionFilter={questionFilter}
                        handlePageChange={this.handlePageChange}
                        actions={actions}
                        user={user}
                        submitAnswer={this.submitAnswer}
                        likeParams={likeParams}
                        modalActions={modalActions}
                        updateQuestionsList={this.updateQuestionsList}
                        changeAnswerState={this.updateQuestionsList}
                        fetchingAnswersBool={fetchingAnswersBool}
                      />
                    )}
                  />
                </div>
              </CenterColumn>
              <style jsx>{style}</style>
            </div>
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}

export default injectIntl(AskAstronomer);
