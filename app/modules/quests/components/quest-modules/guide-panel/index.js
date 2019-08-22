import TopicList from 'app/components/guides/TopicList';
import React, { PureComponent } from 'react';
import './styles.scss';

export class QuestModuleGuidePanel extends PureComponent {
  componentDidMount = () => {
    const { module, params, getQuestGuidePanel } = this.props;
    const { questId } = params;
    const { moduleId } = module;

    if (questId && moduleId) getQuestGuidePanel({ questId, moduleId });
  };

  render() {
    const { questGuidePanel, module } = this.props;
    const { moduleId } = module;
    const { panelList } = questGuidePanel[moduleId] || {};
    console.log(this.props);
    return <div className="quest-output-module">sfsdfsd</div>;
  }
}
