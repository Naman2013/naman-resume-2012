import React, { PureComponent } from 'react';

export class QuestModuleTextOutput extends PureComponent {
  componentDidMount = () => {
    const { module, params, getQuestOutput } = this.props;
    const { questId } = params;
    const { moduleId } = module;

    if (questId && moduleId) getQuestOutput(questId, moduleId);
  };

  render() {
    const { questOutput } = this.props;
    console.log(questOutput);

    return <div>TextOutput</div>;
  }
}

/*
moduleId: "16"
moduleIdUser: 0
moduleIndex: 4
moduleType: "textoutput"
 */
