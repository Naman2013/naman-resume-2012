import TopicList from 'app/components/guides/TopicList';
import React, { PureComponent } from 'react';
import './styles.scss';

export class QuestModuleQaFreeForm extends PureComponent {
  componentDidMount = () => {
    const { module, questId, getQaFreeForm } = this.props;
    const { moduleId } = module;
    if (questId && moduleId) getQaFreeForm({ questId, moduleId });
  };

  render() {
    const { questQaFreeForm, module } = this.props;
    const { moduleId } = module;
    const { moduleUUID } = questQaFreeForm[moduleId] || {};
    console.log(this.props);
    // const { panelList } = questOutput;

    return <div className="quest-qa-free-form">{moduleUUID}</div>;
  }
}
