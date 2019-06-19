import React, { Component } from 'react';

export class QuestStep extends Component {
  componentDidMount = () => {
    const { getQuestStep, routeParams } = this.props;
    const { questId, step } = routeParams;
    getQuestStep(questId, step);
  };

  render() {
    const { test } = this.props;
    return <div>hello</div>;
  }
}
