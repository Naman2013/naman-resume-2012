import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Spinner } from 'app/components/spinner/index';

export class QuestStep extends Component {
  componentDidMount = () => {
    const { getQuestStep, routeParams, getQuestOutput } = this.props;
    const { questId, step } = routeParams;
    getQuestStep(questId, step);
    getQuestOutput(questId, step);
  };

  render() {
    const { loading, moduleList, stepData } = this.props;
    console.log(moduleList);
    // console.log(stepData);
    return (
      <div>
        <Spinner loading={loading} />

        <div>header</div>

        <Container>
          <h2>Modules</h2>
          <ul>
            {moduleList.map(m => (
              <li key={m.moduleId}>
                {m.moduleId} - {m.moduleType}
              </li>
            ))}
          </ul>
        </Container>

        <div>footer</div>
      </div>
    );
  }
}
