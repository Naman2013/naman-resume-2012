// @flow

import type { QuestStepModule } from 'app/modules/quests/types';
import { questModuleType } from 'app/modules/quests/types';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Spinner } from 'app/components/spinner/index';
import { browserHistory } from 'react-router';
import Btn from 'atoms/Btn/index';
import { QuestStepHeader } from './header';
import { QuestStepFooter } from './footer';
import './styles.scss';
import QuestModuleTextOutput from '../../containers/quest-modules/textoutput';
import QuestModuleDataCollection from '../../containers/quest-modules/data-collection';

type TQuestStep = {
  moduleList: QuestStepModule,
};

export class QuestStep extends Component<TQuestStep> {
  state = { prevStepId: null, nextStepId: null, lastStepId: null };

  componentDidMount = () => {
    this.refreshData(this.props);
  };

  refreshData = props => {
    const { getQuestStep, routeParams, getQuestOutput } = props;
    const { questId, step } = routeParams;
    getQuestStep(questId, step);
    getQuestOutput(questId, step);
  };

  componentWillReceiveProps(nextProps) {
    const { stepData, routeParams } = nextProps;
    const { routeParams: prevRouteParams } = this.props;
    if (routeParams.step !== prevRouteParams.step) {
      this.refreshData(nextProps);
    } else if (stepData?.stepMenuList?.length) {
      const prevStepIndex =
        stepData.stepMenuList.findIndex(
          item => item.stepModuleId == routeParams.step
        ) - 1;
      const nextStepIndex =
        stepData.stepMenuList.findIndex(
          item => item.stepModuleId == routeParams.step
        ) + 1;
      const lastStepIndex = stepData.stepMenuList.length - 1;
      this.setState({
        prevStepId:
          prevStepIndex > -1
            ? stepData.stepMenuList[prevStepIndex].stepModuleId
            : null,
        nextStepId:
          nextStepIndex < stepData.stepMenuList.length
            ? stepData.stepMenuList[nextStepIndex].stepModuleId
            : null,
        lastStepId:
          stepData.stepMenuList[lastStepIndex].stepModuleId != routeParams.step
            ? stepData.stepMenuList[lastStepIndex].stepModuleId
            : null,
      });
    }
  }

  navigateToPrevStep = () => {
    const { routeParams } = this.props;
    const { prevStepId } = this.state;
    if (prevStepId !== null) {
      browserHistory.push(
        `/quest-details/${routeParams.questId}/${prevStepId}`
      );
    }
  };

  navigateToNextStep = () => {
    const { routeParams } = this.props;
    const { nextStepId } = this.state;
    if (nextStepId !== null) {
      browserHistory.push(
        `/quest-details/${routeParams.questId}/${nextStepId}`
      );
    }
  };

  navigateToLastStep = () => {
    const { routeParams } = this.props;
    const { lastStepId } = this.state;
    if (lastStepId !== null) {
      browserHistory.push(
        `/quest-details/${routeParams.questId}/${lastStepId}`
      );
    }
  };

  render() {
    const { loading, moduleList, stepData, routeParams } = this.props;
    const { prevStepId, nextStepId, lastStepId } = this.state;
    console.log(moduleList);
    console.log(stepData);
    return (
      <div>
        <Spinner loading={loading} />

        <QuestStepHeader
          stepHeaderTitle={stepData?.stepHeaderTitle}
          navigateToPrevStep={this.navigateToPrevStep}
          navigateToNextStep={this.navigateToNextStep}
          questId={routeParams.questId}
          disablePrev={prevStepId === null}
          disableNext={nextStepId === null}
        />

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
                <QuestModuleTextOutput module={module} />
              )
          )}

          {moduleList.map(
            module =>
              module.moduleType === questModuleType.datacollectdifferent && (
                <QuestModuleDataCollection module={module} />
              )
          )}

          <hr />
        </Container>

        <QuestStepFooter
          stepFooterTitle={stepData?.stepFooterTitle}
          currentlyViewingCaption={stepData?.currentlyViewingCaption}
          navigateToNextStep={this.navigateToNextStep}
          disableNext={nextStepId === null}
          navigateToLastStep={this.navigateToLastStep}
          disableLast={lastStepId === null}
        />
      </div>
    );
  }
}
