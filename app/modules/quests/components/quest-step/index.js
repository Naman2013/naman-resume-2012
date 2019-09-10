/* eslint-disable import/order */
// @flow

import { QuestStepBox } from 'app/modules/quests/components/quest-step-box';
import type { QuestStepModule } from 'app/modules/quests/types';
import { questModuleType } from 'app/modules/quests/types';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Modal from 'react-modal';
import { Spinner } from 'app/components/spinner/index';
import { browserHistory } from 'react-router';
import { QuestStepHeader } from './header';
import { QuestStepFooter } from './footer';
import cn from 'classnames';
import './styles.scss';
import QuestModuleTextOutput from '../../containers/quest-modules/textoutput';
import QuestModuleDataCollection from '../../containers/quest-modules/data-collection';
import QuestModuleQaFreeForm from '../../containers/quest-modules/qa-free-form';
import QuestModuleQaFillBlanks from '../../containers/quest-modules/qa-fill-blanks';
import QuestModuleQaMultipleChoice from '../../containers/quest-modules/qa-multiple-choice';
import QuestModuleGuidePanel from '../../containers/quest-modules/guide-panel';

type TQuestStep = {
  moduleList: QuestStepModule,
};

export class QuestStep extends Component<TQuestStep> {
  state = {
    prevStepId: null,
    nextStepId: null,
    stepKey: null,
    stepId: null,
  };

  static getDerivedStateFromProps(props) {
    const { stepData, routeParams } = props;
    if (stepData?.stepMenuList?.length) {
      const prevStepIndex =
        stepData.stepMenuList.findIndex(
          item => item.stepModuleId == routeParams.step
        ) - 1;
      const nextStepIndex =
        stepData.stepMenuList.findIndex(
          item => item.stepModuleId == routeParams.step
        ) + 1;
      return {
        prevStepId:
          prevStepIndex > -1
            ? stepData.stepMenuList[prevStepIndex].stepModuleId
            : null,
        nextStepId:
          nextStepIndex < stepData.stepMenuList.length - 1
            ? stepData.stepMenuList[nextStepIndex].stepModuleId
            : null,
      };
    }
    return null;
  }

  componentDidMount() {
    this.getQuestStep();
  }

  componentDidUpdate(prevProps) {
    const {
      routeParams: { step },
    } = this.props;
    const {
      routeParams: { step: prevStep },
    } = prevProps;
    if (prevStep !== step) {
      this.getQuestStep();
    }
  }

  componentWillUnmount() {
    const { clearQuestStepData } = this.props;
    clearQuestStepData();
  }

  getQuestStep = () => {
    const { getQuestStep, routeParams } = this.props;
    const { questId, step } = routeParams;
    getQuestStep(questId, step).then(data => {
      const {
        payload: { redirectStep, redirectStepURL },
      } = data;
      if (redirectStep === true) {
        browserHistory.push(redirectStepURL);
        return;
      }
      this.setState({
        stepKey: `quest-step-${step}-${Date.now()}`,
        stepId: step,
      });
    });
  };

  setQuestCompleted = event => {
    event.preventDefault();
    const { routeParams, setQuestCompleted, stepData } = this.props;
    const { questId } = routeParams;
    const { callSetQuestCompleted } = stepData;

    if (!callSetQuestCompleted) {
      setQuestCompleted({ questId }).then(data => {
        browserHistory.push(
          `/quest-completion/${routeParams.questId}/${stepData.questCompletionList[0].questCompletionModuleId}`
        );
      });
    } else {
      browserHistory.push(
        `/quest-completion/${routeParams.questId}/${stepData.questCompletionList[0].questCompletionModuleId}`
      );
    }
  };

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
    const { routeParams, stepData } = this.props;
    const { nextStepId } = this.state;
    const { questCompletionList } = stepData;
    if (nextStepId !== null) {
      if (nextStepId !== questCompletionList[0].questCompletionModuleId) {
        browserHistory.push(
          `/quest-details/${routeParams.questId}/${nextStepId}`
        );
      } else {
        browserHistory.push(
          `/quest-completion/${routeParams.questId}/${stepData.questCompletionList[0].questCompletionModuleId}`
        );
      }
    }
  };

  render() {
    const {
      loading,
      moduleList,
      stepData = {},
      routeParams,
      resourceModal,
      questActions,
      closeModal,
    } = this.props;
    const { prevStepId, nextStepId, stepKey, stepId } = this.state;
    const {
      readOnly,
      stepHeaderTitle,
      stepFooterTitle,
      currentlyViewingCaption,
      nextButtonCaption,
      lastButtonCaption,
      enableNextButton,
      enableLastButton,
      showHeaderNextButton,
      enableHeaderNextButton,
      showHeaderLastButton,
      enableHeaderLastButton,
      redirectStep,
    } = stepData;

    return (
      <div className="quest-step-page" key={stepKey}>
        <Spinner loading={loading || redirectStep} />

        <QuestStepHeader
          stepHeaderTitle={stepHeaderTitle}
          navigateToPrevStep={this.navigateToPrevStep}
          navigateToNextStep={this.navigateToNextStep}
          questId={routeParams.questId}
          disablePrev={prevStepId === null}
          disableNext={nextStepId === null}
          stepId={routeParams.step}
          stepMenuList={stepData?.stepMenuList}
          questCompletionList={stepData?.questCompletionList}
          stepMenuTitle={stepData?.stepMenuHeader}
          showHeaderNextButton={showHeaderNextButton}
          enableHeaderNextButton={enableHeaderNextButton}
          showHeaderLastButton={showHeaderLastButton}
          enableHeaderLastButton={enableHeaderLastButton}
        />

        <Modal
          ariaHideApp={false}
          isOpen={resourceModal?.showModal}
          style={resourceModal?.modalStyles}
          contentLabel="quests details"
          onRequestClose={closeModal}
        >
          {resourceModal.modalComponent}
        </Modal>

        <div className="top-v-line d-none d-md-flex">
          <div />
          <div />
        </div>

        {stepKey &&
          !redirectStep &&
          stepId == routeParams.step &&
          moduleList.map((modules, index) => (
            <div className="container step-container">
              <QuestStepBox
                stepData={stepData}
                completed={stepData.stepCompleted}
                questId={routeParams.questId}
                showHeader={index === 0}
                showModule={modules[0]?.moduleType}
                setQuestCompleted={this.setQuestCompleted}
              >
                {modules.map(module => (
                  <>
                    {(module.moduleType === questModuleType.datacollectsame ||
                      module.moduleType ===
                        questModuleType.datacollectdifferent) && (
                      <QuestModuleDataCollection
                        module={module}
                        key={`quest-data-collection-${module.moduleId}`}
                        questId={routeParams.questId}
                        navigateToNextStep={this.navigateToNextStep}
                        readOnly={readOnly}
                        refreshQuestStep={this.getQuestStep}
                      />
                    )}

                    {module.moduleType === questModuleType.textoutput && (
                      <QuestModuleTextOutput
                        module={module}
                        key={`quest-text-output-${module.moduleId}`}
                        readOnly={readOnly}
                      />
                    )}

                    {module.moduleType === questModuleType.qafreeform && (
                      <QuestModuleQaFreeForm
                        module={module}
                        key={`quest-qa-freeform-${module.moduleId}`}
                        questId={routeParams.questId}
                        refreshQuestStep={this.getQuestStep}
                        readOnly={readOnly}
                      />
                    )}

                    {module.moduleType === questModuleType.qafillblanks && (
                      <QuestModuleQaFillBlanks
                        module={module}
                        key={`quest-qa-fillblanks-${module.moduleId}`}
                        questId={routeParams.questId}
                        refreshQuestStep={this.getQuestStep}
                        readOnly={readOnly}
                      />
                    )}

                    {module.moduleType === questModuleType.qamultiplechoice && (
                      <QuestModuleQaMultipleChoice
                        module={module}
                        key={`quest-qa-multiplechoice-${module.moduleId}`}
                        questId={routeParams.questId}
                        refreshQuestStep={this.getQuestStep}
                      />
                    )}

                    {module.moduleType === questModuleType.guidepanel && (
                      <QuestModuleGuidePanel
                        module={module}
                        key={`quest-text-output-${module.moduleId}`}
                        readOnly={readOnly}
                      />
                    )}
                  </>
                ))}
              </QuestStepBox>
            </div>
          ))}

        <QuestStepFooter
          stepFooterTitle={stepFooterTitle}
          currentlyViewingCaption={currentlyViewingCaption}
          navigateToNextStep={this.navigateToNextStep}
          disableNext={nextStepId === null}
          navigateToLastStep={this.navigateToPrevStep}
          disableLast={prevStepId === null}
          nextButtonCaption={nextButtonCaption}
          lastButtonCaption={lastButtonCaption}
          enableNextButton={enableNextButton}
          enableLastButton={enableLastButton}
        />
      </div>
    );
  }
}
