export type TQuestModuleType =
  | 'datacollectsame'
  | 'datacollectdifferent'
  | 'imageordering'
  | 'textinput'
  | 'textoutput'
  | 'qamultiplechoice'
  | 'qafreeform'
  | 'qafillblanks'
  | 'animation'
  | 'guidepanel';

export declare interface IQuestStepModule {
  moduleIndex: number;
  moduleId: number;
  moduleUUID: string;
  moduleIsComplete: boolean;
  moduleIdUser: number;
  progressMessage: string;
  moduleType: TQuestModuleType;
}

export declare interface IQuestStep extends StandardResponse {
  questId: number;
  questUUID: string;
  questIdUser: number;
  stepModuleId: number;
  moduleUUID: string;
  stepModuleIdUser: number;
  redirectStep: boolean;
  redirectStepURL: string;
  redirectQuest: boolean;
  redirectQuestUrl: string;
  iconURL: string;
  badgeId: number;
  readOnly: boolean;
  stepSequence: string;
  stepTitle: string;
  stepHeaderTitle: string;
  stepStatus: string;
  stepCompleted: boolean;
  stepIconURL: string;
  stepStatusMsg: string;
  stepActionMsg: string;
  stepCaption: string;
  stepShortDescription: string;
  stepLongDescription: string;
  showStepProgressMsg: boolean;
  stepProgressMsg: string;
  showStepCompleteMsg: boolean;
  stepCompleteMsg: string;
  showQuestCompletedShortDescription: boolean;
  questCompletedShortDescription: string;
  showQuestCompletedLongDescription: boolean;
  questCompletedLongDescription: string;
  showQuestCompletedProgressMsg: boolean;
  questCompletedProgressMsg: string;
  stepModulePrompt: string;
  stepModuleInstructions: string;
  showNextStepButtonTop: boolean;
  nextStepButtonTopCaption: string;
  nextStepButtonTopURL: string;
  claimBadgeButtonCaption: string;
  showClaimBadgeButtonTop: boolean;
  showClaimBadgeButtonBottom: boolean;
  claimBadgeButtonURL: string;
  callSetQuestCompleted: boolean;
  showHeaderNextButton: boolean;
  enableHeaderNextButton: boolean;
  headerNextButtonCaption: string;
  showHeaderLastButton: boolean;
  enableHeaderLastButton: boolean;
  headerLastButtonCaption: string;
  showNextButton: boolean;
  enableNextButton: boolean;
  nextButtonCaption: string;
  showLastButton: boolean;
  enableLastButton: boolean;
  lastButtonCaption: string;
  showResources: boolean;
  resourcesButtonCaption: string;
  resourcesModuleId: number;
  resourcesModuleUUID: string;
  currentlyViewingCaption: string;
  stepTopTitle: string;
  stepFooterTitle: string;
  userRecordWasUpdated: boolean;
  stepModuleCount: number;
  stepModuleList: IQuestStepModule[];
  stepMenuHeader: string;
  stepMenuCount: number;
  stepMenuList: StepMenuItem[];
  gravityEarnedInThisRequest: boolean;
  questCompletionList: { questCompletionModuleId: string }[];
  stepsInThisQuest: StepsInQuest;
}

export declare interface StepMenuItem {
  itemType: string;
  stepSequence: number;
  stepSelected: boolean;
  stepModuleId: number;
  stepModuleIdUser: number;
  stepMenuTitle: string;
  enableMenuItem: boolean;
  showMenuItem: boolean;
  stepCompleted: boolean;
  stepIconURL: string;
}

export declare interface StepsInQuest {
  customerId: number;
  questId: number;
  questUserStatus: string;
  questCompletionModuleId: string;
  stepCompletionOrder: string;
  allStepsAreComplete: boolean;
  stepModuleCount: number;
  stepModuleArray: {
    stepSequence: number;
    stepModuleId: number;
    currentStep: boolean;
    questModuleStepId: number;
    questModuleStepUserId: number;
    mandatoryStep: boolean;
    stepStatus: string;
    stepIsLocked: boolean;
  }[];
}

export declare interface IQuestAnimation extends StandardResponse {
  editAnimationButtonCaption: string;
  editButtonCaption: string;
  fastButtonCaption: string;
  finishButtonCaption: string;
  frameCaption: string;
  gravityEarnedInThisRequest: boolean;
  magnificationDefault: number;
  magnificationMax: number;
  magnificationMin: number;
  magnificationStep: number;
  magnificationUnitsCaption: string;
  mediumButtonCaption: string;
  moduleId: number;
  moduleIdIsValid: boolean;
  moduleUUID: string;
  offsetReference: string;
  outputHeading: string;
  outputSubheading: string;
  playButtonCaption: string;
  previewHeading: string;
  previewSubheading: string;
  questId: number;
  questIdIsValid: boolean;
  questUUID: string;
  showTutorial: boolean;
  slowButtonCaption: string;
  xOffsetDefault: number;
  xOffsetLargeStep: number;
  xOffsetMax: number;
  xOffsetMin: number;
  xOffsetSmallStep: number;
  yOffsetDefault: number;
  yOffsetLargeStep: number;
  yOffsetMax: number;
  yOffsetMin: number;
  yOffsetSmallStep: number;
}

export declare interface IAnimationFrame {
  base: boolean;
  caption: string;
  checkAlignment: boolean;
  dcId: number;
  empty: boolean;
  frameExplanation: string;
  frameId: number;
  frameIndex: number;
  iconURL: string;
  ignore: boolean;
  imageURL: string;
  infoArray: {
    objectName: string;
    imageDate: string;
    imageTime: string;
    telescopeName: string;
    instrumentName: string;
  };
  invalid: boolean;
  negative: boolean;
  objectId: number;
  offsetReference: string;
  serializedFrame: any;
  touched: boolean;
  xOffset: number;
  yOffset: number;
}

export declare interface IQuestAnimationFrames extends StandardResponse {
  animationId: number;
  animationUserId: number;
  frameCount: number;
  frameIndexOriginal: number;
  frameList: Array<IAnimationFrame>;
  gravityEarnedInThisRequest: boolean;
  moduleId: number;
  moduleIdIsValid: any;
  moduleUUID: string;
  questId: number;
  questIdIsValid: boolean;
  questUUID: string;
  requestType: string;
}
