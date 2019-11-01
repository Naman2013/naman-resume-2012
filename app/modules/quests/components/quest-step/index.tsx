import { QuestStepBox } from 'app/modules/quests/components/quest-step-box';
import React from 'react';
import Modal from 'react-modal';
import { Spinner } from 'app/components/spinner/index';
import { browserHistory } from 'react-router';
import {QuestStepModule} from 'app/modules/quests/components/quest-step-module';
import {IQuestStep, IQuestStepModule} from 'app/modules/quests/types';
import { QuestStepHeader } from './header';
import { QuestStepFooter } from './footer';
import './styles.scss';


type TQuestStepProps = {
  moduleList: Array<IQuestStepModule[]>;
  stepData: IQuestStep;
  routeParams: any; // todo
  loading: boolean;
  resourceModal: any;
  questActions: any;
  closeModal: any;

  clearQuestStepData: () => Promise<any>;
  getQuestStep: (questId: string, step: string) => Promise<any>;
  setQuestCompleted: (arg0: any) => Promise<any>;
};

type TQuestStepState = {
  prevStepId: string;
  nextStepId: string;
  stepKey: string;
  stepId: string;
}
export class QuestStep extends React.PureComponent<TQuestStepProps,TQuestStepState> {
  state: TQuestStepState = {
    prevStepId: null,
    nextStepId: null,
    stepKey: null,
    stepId: null,
  };


  static getDerivedStateFromProps(props: TQuestStepProps): any {
    const { stepData, routeParams } = props;
    // eslint-disable-next-line
    if (stepData.stepMenuList?.length) {
      const prevStepIndex =
        stepData.stepMenuList.findIndex(
          (item: any) => item.stepModuleId === routeParams.step
        ) - 1;
      const nextStepIndex =
        stepData.stepMenuList.findIndex(
          (item: any) => item.stepModuleId === routeParams.step
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

  componentDidMount(): void {
    this.getQuestStep();
  }

  componentDidUpdate(prevProps: TQuestStepProps): void {
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

  componentWillUnmount(): void {
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

  setQuestCompleted = (event: Event) => {
    event.preventDefault();
    const { routeParams, setQuestCompleted, stepData } = this.props;
    const { questId } = routeParams;
    const { callSetQuestCompleted } = stepData;
    const moduleId = stepData.questCompletionList[0].questCompletionModuleId;

    setQuestCompleted({
      questId,
      callSetQuestCompleted,
      moduleId,
    });
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
      stepData,
      routeParams,
      resourceModal,
      closeModal,
      setQuestCompleted,
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
      callSetQuestCompleted,
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
          stepMenuList={stepData.stepMenuList}
          questCompletionList={stepData.questCompletionList}
          stepMenuTitle={stepData.stepMenuHeader}
          showHeaderNextButton={showHeaderNextButton}
          enableHeaderNextButton={enableHeaderNextButton}
          showHeaderLastButton={showHeaderLastButton}
          enableHeaderLastButton={enableHeaderLastButton}
          callSetQuestCompleted={callSetQuestCompleted}
          setQuestCompleted={setQuestCompleted}
        />

        <Modal
          ariaHideApp={false}
          isOpen={resourceModal.showModal}
          style={resourceModal.modalStyles}
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
          stepId === routeParams.step &&
          moduleList.map((modules, index) => (
            <div className="container step-container">
              <QuestStepBox
                stepData={stepData}
                completed={stepData.stepCompleted}
                questId={routeParams.questId}
                key={routeParams.questId}
                showHeader={index === 0}
                showFooterClaimButton={index === moduleList.length - 1}
                showModule={modules[0].moduleType}
                setQuestCompleted={this.setQuestCompleted}
              >
                {modules.map(module =>
                  <QuestStepModule
                    key={module.moduleId}
                    module={module}
                    readOnly={readOnly}
                    routeParams={routeParams}
                    navigateToNextStep={this.navigateToNextStep}
                    refreshQuestStep={this.getQuestStep}
                  />)}
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
