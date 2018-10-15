/***********************************
* V4 Ask an Astronomer
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchObjectSpecialistsAction } from '../../modules/object-details/actions';
import { DeviceContext } from '../../providers/DeviceProvider';

import {
  fetchAstronomerQuestions,
} from '../../modules/ask-astronomer-questions/actions';
import {
  toggleAllAnswersAndDisplay,
} from '../../modules/ask-astronomer-answers/actions';

import AskQuestionTile from '../../components/ask-astronomer/AskQuestionTile';
import QuestionList from '../../components/ask-astronomer/question-list';
import AskAstronomerQuestionForm from '../../components/ask-astronomer/question-form';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from '../../../app/components/common/CenterColumn';
import MVPAstronomerList from '../../../app/components/common/MVPAstronomer/MVPAstronomerList';
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
    leftView: "show",
    rightView: "show",
    leftTab: "show",
    rightTab: "show",
  }



  constructor(props) {
    super(props);

    this.state = {
      leftView: "show",
      rightView: "show",
      "view": '',
    };  
  }

  componentWillReceiveProps(nextProps) {
    const {
      objectData: {
        faqTopicId,
      }
    } = nextProps;
    //fetch the question data, the object page has been changed.
    if (this.props.params.objectId != nextProps.params.objectId || this.props.objectData.faqTopicId != nextProps.objectData.faqTopicId) {
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
    if (faqTopicId && (this.props.objectData.objectId != objectId)) {
        //fetch questions only if the objectId changes.
        this.props.actions.fetchAstronomerQuestions({ topicId: faqTopicId });
    }
  }

  handlePageChange = (page) => {
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


  handleMobileClick = () => {
    let lefty = (this.state.leftView === "hidden") ? "show" : "hidden";
    let righty = (this.state.rightView === "hidden") ? "show" : "hidden";
    
    this.setState ({
      "leftView": lefty,
      "rightView": righty,
      "view": "mobile",
    });
  }

  handleTabletClick = () => {
    let left = (this.state.leftView === "hidden") ? "show" : "hidden";
    let right = (this.state.rightView === "hidden") ? "show" : "hidden";
    
    this.setState ({
      "leftView": left,
      "rightView": right,
      "view": "tablet",
    });
  }

  setMobileView = () => {
    this.setState ({
      "leftView": "show",
      "rightView": "hidden",
      "view": "mobile",
    });
  }

  setDesktopView = () => {
    this.setState ({
      "leftView": "show",
      "rightView": "show",
      "view": "desktop",
    });
  }

  setTabletView = () => {
    this.setState ({
      "leftView": "show",
      "rightView": "hidden",
      "view": "tablet",
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
        objectId,
      },
      objectData: {
        objectTitle,
      },
      questions,
      totalCount,
      count,
      page,
      objectSpecialists,
    } = this.props;

    return (
      <div className="full-bg">
          <ObjectDetailsSectionTitle title={objectTitle + "'s"} subTitle="Ask An Astronomer" />        
          <CenterColumn>
            <div className="ask-astronomer">

              <div className="ask-mobile-header">         
                <div className="icon-container">
                  <div className="border">
                    <div className="icon">
                      <img className="icon-content" alt="" width="180" height="180" src="https://vega.slooh.com/assets/v4/common/ask_mobile_bg.png" />
                    </div>
                  </div>
                </div>
                <div className="center-line" />
                <span className={'btn-nav ' + this.state.leftView} onClick={this.handleMobileClick}>Questions</span>
                <span className={'btn-nav ' + this.state.rightView} onClick={this.handleMobileClick}>Ask Now</span>      
              </div>  

              <div className={'right ' + this.state.rightView}>
                {/*<AskAstronomerQuestionForm
                  objectId={objectId}
                  topicId={faqTopicId}
                  objectTitle={objectTitle}
                  user={user}
                />*/}
                <AskQuestionTile></AskQuestionTile>
                <div className="ask-tablet-subnav">         
                  <div className="center-line" />
                  <span className={'btn-nav ' + this.state.leftView} onClick={this.handleTabletClick}>Questions</span>
                  <span className={'btn-nav ' + this.state.rightView} onClick={this.handleTabletClick}>MVP ASTRONOMERS</span>      
                </div>
                
                <div className="mvp">
                  <div className="mvp-header">
                    <h1>THIS OBJECT’S</h1>
                    <h2>MVP ASTRONOMERS</h2>
                  </div>
                  {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
                    <MVPAstronomerList {...objectSpecialists} />
                  ) : (
                    <div className="card-container__specialists">
                      Sorry, there are no MVP Astronomers available.
                    </div>
                  )}
                </div>
              </div>  

              <div className={'left ' + this.state.leftView}>
                {fetchingQuestions && <div className="fa fa-spinner loader" />}
                {!fetchingQuestions && <QuestionList
                  allAnswers={allAnswers}
                  allDisplayedAnswers={allDisplayedAnswers}
                  count={count}
                  fetchingAnswers={fetchingAnswers}
                  handlePageChange={this.handlePageChange}
                  objectId={objectId}
                  page={page}
                  questions={questions}
                  toggleAllAnswersAndDisplay={actions.toggleAllAnswersAndDisplay}
                  totalCount={totalCount}
                />}
              </div>

              <Fragment>
                <DeviceContext.Consumer>
                  {
                    (context) => {
                      if (context.isDesktop && this.state.view !== 'desktop') {
                        this.setDesktopView ();
                      } 
                      else if (context.isTablet && this.state.view !== 'tablet') {
                        this.setTabletView ();
                      }
                      else if (context.isMobile && this.state.view !== 'mobile') {
                        this.setMobileView ();
                      }
                    }
                  }
                </DeviceContext.Consumer>
              </Fragment>

            </div>
          </CenterColumn>
        <style jsx>{style}</style>
      </div>
    )
  }
}

export default AskAstronomer;
