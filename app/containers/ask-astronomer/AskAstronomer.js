/***********************************
* V4 Ask an Astronomer
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import TwoTabbedNav from 'components/TwoTabbedNav';
import { fetchObjectSpecialistsAction } from 'modules/object-details/actions';
import { DeviceContext } from 'providers/DeviceProvider';
import {
  fetchAstronomerQuestions,
} from 'modules/ask-astronomer-questions/actions';
import {
  toggleAllAnswersAndDisplay,
} from 'modules/ask-astronomer-answers/actions';
import AskAstronomerQuestionForm from 'components/ask-astronomer/AskQuestionForm';
import ObjectDetailsSectionTitle from 'components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from 'components/common/CenterColumn';
import MainContainer from './partials/MainContainer';
import AskQuestionTile from 'components/ask-astronomer/AskQuestionTile';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import AsideContainer from './partials/AsideContainer';
import style from './AskAstronomer.style';

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
  questions: astronomerQuestions.threadList,
  page: astronomerQuestions.page,
  totalCount: astronomerQuestions.threadCount,
  count: astronomerQuestions.count,
  fetchingQuestions: astronomerQuestions.fetching,
  fetchingAnswers: astronomerAnswers.fetchingObj,
  user,
  objectDetails,
  objectSpecialists: objectDetails.objectSpecialists,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchAstronomerQuestions,
    toggleAllAnswersAndDisplay,
    fetchObjectSpecialistsAction,
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
  }

  static defaultProps = {
    fetchingQuestions: false,
    fetchingAnswers: {},
    page: 1,
    totalCount: 0,
    count: 0,
    actions: { },
    objectId: '',
  }

  state = {
    showPrompt: false ,
  }

  componentWillReceiveProps(nextProps) {
    const {
    } = nextProps;
    //fetch the question data, the object page has been changed.
    if (this.props.params.objectId != nextProps.params.objectId) {
      this.props.actions.fetchAstronomerQuestions({ answerState: 'all' });
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
        this.props.actions.fetchAstronomerQuestions({ answerState: 'all' });
    }
  }

  handlePageChange = (page) => {
    const {
      actions,
    } = this.props;
    actions.fetchAstronomerQuestions({
      appendToList: false,
      page,
      answerState: 'all',
    });
  };


  showModal = () => {
    this.setState({
      showPrompt: true,
    });
  }

  closeModal = () => {
    this.setState({
      showPrompt: false,
    });
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
      totalCount,
      count,
      page,
      user,
      objectSpecialists,
    } = this.props;

    const { showPrompt } = this.state;
    const likeParams = {};
    return (
      <Fragment>
        <DeviceContext.Consumer>
          {(context) => (
          <div className="full-bg">
              <ObjectDetailsSectionTitle title={`${objectTitle}'s`} subTitle="Ask An Astronomer" theme={{ padding: '25px' }} />
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
                      <AskQuestionTile showModal={this.showModal} />
                    </div>
                  </DisplayAtBreakpoint>
                  <AskAstronomerQuestionForm
                    open={showPrompt}
                    hideModal={this.closeModal}
                    objectId={objectId}
                    topicId={faqTopicId}
                    objectTitle={objectTitle}
                    user={user}
                  />
                  <ResponsiveTwoColumnContainer
                    renderNavigationComponent={navProps =>
                      (<TwoTabbedNav
                        firstTitle="Questions"
                        secondTitle={context.isMobile ? 'Ask Now' : 'MVP Astronomers'}
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
                          showModal={this.showModal}
                          showPrompt={showPrompt}
                        />
                      </div>
                    )}
                    isScreenLarge={context.isScreenLarge}
                    renderMainContent={() => <MainContainer
                      {...this.props}
                      {...context}
                      handlePageChange={this.handlePageChange}
                      actions={actions}
                      user={user}
                      likeParams={likeParams}
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

export default AskAstronomer;
