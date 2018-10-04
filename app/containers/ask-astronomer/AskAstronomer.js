/***********************************
* V4 Ask an Astronomer Wrapper
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchAstronomerQuestions,
} from '../../modules/ask-astronomer-questions/actions';
import {
  toggleAllAnswersAndDisplay,
} from '../../modules/ask-astronomer-answers/actions';
import AskQuestionTile from '../../components/ask-astronomer/AskQuestionTile';
import QuestionList from '../../components/ask-astronomer/question-list';
import AskAstronomerQuestionForm from '../../components/ask-astronomer/question-form';
import { DeviceContext } from '../../providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from '../../../app/components/common/CenterColumn';
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


  constructor(props) {
    super(props);

    this.state = {
      leftView: "show",
      rightView: "show",
      "mobile": false,
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
      "mobile": true,
    });
  }

  setMobileView = () => {
    this.setState ({
      "leftView": "show",
      "rightView": "hidden",
      "mobile": true,
    });
  }

  setDesktopView = () => {
    this.setState ({
      "leftView": "show",
      "rightView": "show",
      "mobile": false,
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
        faqTopicId,
        objectTitle,
      },
      questions,
      totalCount,
      count,
      page,
      user,
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
                  <span className={'btn-nav ' + this.state.leftView} onClick={this.handleMobileClick}>Questions</span>
                  <span className={'btn-nav ' + this.state.rightView} onClick={this.handleMobileClick}>MVP ASTRONOMERS</span>      
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
                      if (context.isScreenMedium && this.state.mobile === true) {
                        this.setDesktopView ();
                      } 
                      else if (!context.isScreenMedium && this.state.mobile === false) {
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
