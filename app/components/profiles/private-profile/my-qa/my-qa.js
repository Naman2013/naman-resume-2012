import React, { Component, Fragment } from 'react';
import Request from '../../../common/network/Request';
import HubContainer from '../../../common/HubContainer';
import QuestionsList from '../../../ask-astronomer/question-list';
import QuestionFilter from '../../../ask-astronomer/question-filter';
import AskQuestionTile from '../../../ask-astronomer/AskQuestionTile';
import { DeviceContext } from '../../../../providers/DeviceProvider';
import CenterColumn from '../../../common/CenterColumn/CenterColumn';

import style from './my-qa.style';

const api = '/api/forum/getQuestionsList';

const filters = [
  {
    title: 'My questions',
    linkURL: '/qa/asked',
  },
  {
    title: 'My answers',
    linkURL: '/qa/answeredbyme',
  },
  {
    title: 'Questions to answer',
    linkURL: '/qa/allunanswered',
  },
];

export default class MyQa extends Component {
  state = {
    questions: [],
  };

  updateList = (resp) => {
    this.setState({
      questions: resp.threads,
      ...resp,
    });
  };

  appendToList = (resp) => {
    this.setState({
      questions: this.state.questions.concat(resp.threads),
    });
  };

  getTextCount = (count) => {
    switch (this.props.params.filter) {
      case 'asked':
        return `You asked ${count} questions`;
      case 'allunanswered':
        return 'ANSWER QUESTIONS, EARN GRAVITY';
      default:
        return null;
    }
  };

  render() {
    return (
      <HubContainer
        updateList={this.updateList}
        appendToList={this.appendToList}
        callSource="qanda"
        paginateURL={api}
        filterTypeFieldName="answerState"
        filterType={this.props.params.filter}
        useSort={false}
        showHeaderIcon={false}
        filterOptions={filters}
        pageTitle="MY Q&A HUB"
        pageTitleTheme={{
          fontFamily: 'BrandonGrotesque',
          fontSize: '14px',
          fontWeight: '500',
          letterSpacing: '1.8px',
          height: '62px',
        }}
        render={() => (
          <DeviceContext.Consumer>
            {context => (
              <CenterColumn theme={{ display: 'flex', flexDirection: 'row', paddingTop: '19px' }}>
                <div className="main-block">
                  {' '}
                  <QuestionFilter countText={this.getTextCount(this.state.threadCount)} />
                  <QuestionsList
                    {...context}
                    questions={this.state.questions}
                    toggleAllAnswersAndDisplay={() => {}}
                  />{' '}
                </div>
                <AskQuestionTile title="Ask an Astronomer" />
                <style jsx>{style}</style>
              </CenterColumn>
            )}
          </DeviceContext.Consumer>
        )}
      />
    );
  }
}
