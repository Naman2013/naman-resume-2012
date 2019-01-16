/***********************************
* V4 Ask an Astronomer
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { intlShape, injectIntl } from 'react-intl';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import TwoTabbedNav from 'components/TwoTabbedNav';
import { fetchObjectSpecialistsAction } from 'modules/object-details/actions';
import { DeviceContext } from 'providers/DeviceProvider';
import {
  fetchAstronomerQuestions,
  askQuestion,
  changeAnswerState,
} from 'modules/ask-astronomer-questions/actions';
import {
  toggleAllAnswersAndDisplay,
  submitAnswerToQuestion,
} from 'modules/ask-astronomer-answers/actions';
import AskQuestionTile from 'components/ask-astronomer/AskQuestionTile';
import ObjectDetailsSectionTitle from 'components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from 'components/common/CenterColumn';
import MainContainer from './partials/MainContainer';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { getAskAnAstronomer } from 'services/objects/ask-astronomer';
import AsideContainer from './partials/AsideContainer';
import { customModalStylesV4 } from 'styles/mixins/utilities';
import style from './AskAstronomer.style';
import messages from './AskAstronomer.messages';

const {
  bool,
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
  objectDetails,
  objectSpecialists: objectDetails.objectSpecialists,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    askQuestion,
    changeAnswerState,
    fetchAstronomerQuestions,
    toggleAllAnswersAndDisplay,
    fetchObjectSpecialistsAction,
    submitAnswerToQuestion,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)

class AskAstronomer extends Component {

  static propTypes = {
    fetchingQuestions: bool,
    fetchingAnswers: shape({}),
    page: number,
    totalCount: number,
    count: number,
    params: shape({
      objectId: string,
    }).isRequired,
    actions: shape({
      fetchAstronomerQuestions: func.isRequired,
    }).isRequired,
    serviceUrl: string,
    questionFilter: string,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    fetchingQuestions: false,
    fetchingAnswers: {},
    page: 1,
    totalCount: 0,
    count: 0,
    actions: { },
    objectId: '',
    questionFilter: 'all',
  }

  constructor(props) {
    super();

    const {
      params: {
        objectId,
      },
    } = props;

    this.state = {
      showPrompt: false,
      promptComponent: null,
      promptStyles: customModalStylesV4,
      aaaQuestionPrompt: {},
    }

    getAskAnAstronomer({
      objectId: objectId
    }).then((res) => {
      this.setState(() => ({
        aaaQuestionPrompt: res.data,
      }));
      props.actions.fetchAstronomerQuestions({ objectId });
    })
  }

  componentWillReceiveProps(nextProps) {
    const {
      questionFilter,
      params: {
        objectId,
      },
    } = nextProps;
    //fetch the question data, the object page has been changed.
    if (this.props.params.objectId != nextProps.params.objectId || this.props.questionFilter !== nextProps.questionFilter) {
      this.props.actions.fetchAstronomerQuestions({ objectId });
    }
  }

  componentWillMount() {
    const {
      params: {
        objectId,
      },
    } = this.props;
    if (this.props.objectData.objectId != objectId) {
        //fetch questions only if the objectId changes.
        this.props.actions.fetchAstronomerQuestions({ objectId });
    }
  }

  handlePageChange = (page) => {
    const {
      actions,
      params: {
        objectId,
      },
    } = this.props;
    actions.fetchAstronomerQuestions({
      appendToList: false,
      page,
      objectId,
    });
  };

  submitAnswer = (params, callback) => {
    const { actions } = this.props;
    actions.submitAnswerToQuestion(params).then(res => callback(res.payload));
  }

  submitQuestion = (params, callback) => {
    const { actions } = this.props;
    actions.askQuestion(params).then(res => callback(res.payload));
  }

  showModal = () => {
    this.setState(() => ({
      showPrompt: true,
    }));
  }

  closeModal = () => {
    this.setState(() => ({
      showPrompt: false,
    }));
  }

  setModal = ({ promptComponent, promptStyles }) => {
    this.setState(state => ({
      promptComponent: promptComponent || state.promptComponent,
      promptStyles: promptStyles || state.promptComponent,
    }));
  }

  render() {
    const {
      actions,
      allAnswers,
      allDisplayedAnswers,
      fetchingAnswers,
      fetchingQuestions,
      params: {
        faqTopicId,
        objectId,
      },
      objectData: {
        objectTitle,
      },
      questions,
      questionFilter,
      totalCount,
      count,
      page,
      user,
      objectSpecialists,
      intl,
    } = this.props;

    const { showPrompt, promptComponent, promptStyles, aaaQuestionPrompt } = this.state;
    const likeParams = {
      callSource: 'qanda',
      objectId,
      topicId: faqTopicId,
    };
    const {
      setModal,
      showModal,
      closeModal,
    } = this;
    const modalActions = { setModal, showModal, closeModal};

    return (
      <Fragment>
        <DeviceContext.Consumer>
          {(context) => (
          <div className="full-bg">
              <ObjectDetailsSectionTitle title={`${objectTitle}'s`} subTitle="Ask An Astronomer" theme={{ padding: '25px' }} />
              <Modal
                ariaHideApp={false}
                isOpen={showPrompt}
                style={promptStyles}
                contentLabel="askAstronomer"
                onRequestClose={this.closeModal}
              >
                {promptComponent}
              </Modal>
              <CenterColumn
                widths={['768px', '940px', '940px']}
                theme={{ paddingTop: '25px' }}
              >
                <div className="ask-astronomer">
                  <DisplayAtBreakpoint
                    screenSmall
                  >
                    <div className="ask-mobile-header">
                      <div className="icon-container">
                        <div className="border">
                          <div className="icon">
                            <img className="icon-content" alt="" width="180" height="180" src="https://vega.slooh.com/assets/v4/common/ask_mobile_bg.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DisplayAtBreakpoint>
                  <DisplayAtBreakpoint
                    screenMedium
                  >
                    <div className="ask-tablet-header">
                      <AskQuestionTile
                        modalActions={modalActions}
                        objectId={objectId}
                        user={user}
                        submitQuestion={this.submitQuestion}
                        {...aaaQuestionPrompt}
                      />
                    </div>
                  </DisplayAtBreakpoint>
                  <ResponsiveTwoColumnContainer
                    renderNavigationComponent={navProps =>
                      (<TwoTabbedNav
                        firstTitle={intl.formatMessage(messages.Questions)}
                        secondTitle={context.isMobile ? intl.formatMessage(messages.AskNow) : intl.formatMessage(messages.MVPAstronomers)}
                        firstTabIsActive={navProps.showMainContainer}
                        firstTabOnClick={navProps.onShowMainContainer}
                        secondTabIsActive={navProps.showAsideContainer}
                        secondTabOnClick={navProps.onShowAsideContainer}
                      />)
                    }
                    renderAsideContent={() => (
                      <div>
                        <AsideContainer
                          {...this.props}
                          {...context}
                          modalActions={modalActions}
                          objectId={objectId}
                          user={user}
                          submitQuestion={this.submitQuestion}
                          aaaQuestionPrompt={aaaQuestionPrompt}
                        />
                      </div>
                    )}
                    isScreenLarge={context.isScreenLarge}
                    renderMainContent={() => <MainContainer
                      {...this.props}
                      {...context}
                      questionFilter={questionFilter}
                      handlePageChange={this.handlePageChange}
                      actions={actions}
                      user={user}
                      submitAnswer={this.submitAnswer}
                      likeParams={likeParams}
                      modalActions={modalActions}
                    />}
                  />
                </div>
              </CenterColumn>
            <style jsx>{style}</style>
          </div>
        )}
        </DeviceContext.Consumer>
      </Fragment>
    )
  }
}

export default injectIntl(AskAstronomer);
