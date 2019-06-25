/* eslint-disable import/order */
// @flow

import { QuestStepBox } from 'app/modules/quests/components/quest-step-box';
import type { QuestStepModule } from 'app/modules/quests/types';
import { questModuleType } from 'app/modules/quests/types';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Spinner } from 'app/components/spinner/index';
import { browserHistory } from 'react-router';
import { QuestStepHeader } from './header';
import { QuestStepFooter } from './footer';
import cn from 'classnames';
import './styles.scss';
import QuestModuleTextOutput from '../../containers/quest-modules/textoutput';

type TQuestStep = {
  moduleList: QuestStepModule,
};

export class QuestStep extends Component<TQuestStep> {
  state = { prevStepId: null, nextStepId: null, lastStepId: null };

  static getDerivedStateFromProps(props) {
    const { stepData, routeParams } = props;
    if (stepData?.stepMenuList?.length) {
      const prevStepIndex =
        stepData.stepMenuList.findIndex(
          item => item.stepModuleId === routeParams.step
        ) - 1;
      const nextStepIndex =
        stepData.stepMenuList.findIndex(
          item => item.stepModuleId === routeParams.step
        ) + 1;
      const lastStepIndex = stepData.stepMenuList.length - 1;
      return {
        prevStepId:
          prevStepIndex > -1
            ? stepData.stepMenuList[prevStepIndex].stepModuleId
            : null,
        nextStepId:
          nextStepIndex < stepData.stepMenuList.length
            ? stepData.stepMenuList[nextStepIndex].stepModuleId
            : null,
        lastStepId:
          stepData.stepMenuList[lastStepIndex].stepModuleId !== routeParams.step
            ? stepData.stepMenuList[lastStepIndex].stepModuleId
            : null,
      };
    }
    return null;
  }

  componentDidMount() {
    this.refreshData();
  }

  componentDidUpdate(prevProps) {
    const {
      routeParams: { step },
    } = this.props;
    const {
      routeParams: { step: prevStep },
    } = prevProps;
    if (prevStep !== step) {
      this.refreshData();
    }
  }

  refreshData() {
    const { getQuestStep, routeParams, getQuestOutput } = this.props;
    const { questId, step } = routeParams;
    getQuestStep(questId, step);
    getQuestOutput(questId, step);
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
    const { loading, moduleList, stepData = {}, routeParams } = this.props;
    const { prevStepId, nextStepId, lastStepId } = this.state;
    console.log(stepData);

    return (
      <div className="quest-step-page">
        <Spinner loading={loading} />

        <QuestStepHeader
          stepHeaderTitle={stepData?.stepHeaderTitle}
          navigateToPrevStep={this.navigateToPrevStep}
          navigateToNextStep={this.navigateToNextStep}
          questId={routeParams.questId}
          disablePrev={prevStepId === null}
          disableNext={nextStepId === null}
          stepId={routeParams.step}
          stepMenuList={stepData?.stepMenuList}
          stepMenuTitle={stepData?.stepMenuHeader}
        />

        <div className="top-v-line d-none d-md-flex">
          <div />
          <div />
        </div>

        <div className="container step-container">
          <QuestStepBox
            subTitle="some text"
            title={stepData.stepHeaderTitle}
            completed={stepData.stepCompleted}
          >
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
                  <QuestModuleTextOutput
                    module={module}
                    key={module.moduleId}
                  />
                )
            )}
          </QuestStepBox>
        </div>

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
