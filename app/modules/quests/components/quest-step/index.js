// @flow

import type { QuestStepModule } from 'app/modules/quests/types';
import { questModuleType } from 'app/modules/quests/types';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Spinner } from 'app/components/spinner/index';
import QuestModuleTextOutput from '../../containers/quest-modules/textoutput';

type TQuestStep = {
  moduleList: QuestStepModule,
};

export class QuestStep extends Component<TQuestStep> {
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

          <hr />

          {moduleList.map(
            module =>
              module.moduleType === questModuleType.textoutput && (
                <QuestModuleTextOutput module={module}/>
              )
          )}

          <hr />
        </Container>

        <div>footer</div>
      </div>
    );
  }
}
