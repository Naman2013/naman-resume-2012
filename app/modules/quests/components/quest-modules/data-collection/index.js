import React, { PureComponent } from 'react';
import { QuestStepInfo } from '../../quest-step-info';

export class QuestModuleDataCollection extends PureComponent {
  componentDidMount() {
    const { module, questId, getDataCollection } = this.props;
    const { moduleId } = module;

    if (questId && moduleId) getDataCollection(questId, moduleId);
  }

  render() {
    const { questDataCollection } = this.props;
    const { modulePrompt, moduleInstructions } = questDataCollection;
    console.log(questDataCollection);
    return (
      <div className="data-collection-module">
        <QuestStepInfo title={modulePrompt} description={moduleInstructions} />
        DataCollection
      </div>
    );
  }
}
