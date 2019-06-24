import TopicList from 'app/components/guides/TopicList';
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
    const { panelList } = questOutput;

    return <TopicList list={panelList} />;
  }
}

/*
moduleId: "16"
moduleIdUser: 0
moduleIndex: 4
moduleType: "textoutput"
 */
