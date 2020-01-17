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
  largeStepDelay: number;
  largeStepRepeat: number;
  playButtonCaption: string;
  previewHeading: string;
  previewSubheading: string;
  previewDelaySlow: number;
  previewDelayMedium: number;
  previewDelayFast: number;
  previewZoomLevel: string;
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
  touched: boolean;
  xOffset: number;
  yOffset: number;
}

export declare interface IQuestAnimationFrames extends StandardResponse {
  activityCompleteIconURL: string;
  activityInstructions: string;
  activityPrompt: string;
  activitySequenceNumber: number;
  activitySequenceText: string;
  activityStatus: string;
  activityTitle: string;
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

export interface RichTextInputModuleResponse extends StandardResponse {
  activityCompleteIconURL: string;
  activityInstructions: string;
  activityPrompt: string;
  activitySequenceNumber: number;
  activitySequenceText: string;
  activityState: string;
  activityTitle: string;
  answerStatus: string;
  answerText: string;
  autoSaveMethod: string;
  autoSaveSeconds: number;
  cancelButtonCaption: string;
  cancelButtonTooltipText: string;
  editButtonCaption: string;
  editButtonTooltipText: string;
  enableCancelButton: boolean;
  enableEditButton: boolean;
  enableEditControls: boolean;
  enableSubmitButton: boolean;
  gravityEarnedInThisRequest: boolean;
  hasModuleBaseImage: boolean;
  isActivity: boolean;
  moduleBaseImageSlotId: number;
  moduleBaseImageType: string;
  moduleBaseImageURL: string;
  moduleBaseThumbnailURL: string;
  moduleHeader: string;
  moduleId: number;
  moduleIdIsValid: boolean;
  moduleInstructions: string;
  modulePrompt: string;
  moduleSubtitle: string;
  moduleTitle: string;
  moduleType: string;
  moduleUUID: string;
  questId: number;
  questIdIsValid: boolean;
  questUUID: string;
  scoringEnabled: boolean;
  scoringMode: string;
  scoringType: string;
  showCancelButton: boolean;
  showCancelButtonTooltip: boolean;
  showEditButton: boolean;
  showEditButtonTooltip: boolean;
  showEditControls: boolean;
  showSubmitButton: boolean;
  showSubmitButtonTooltip: boolean;
  submitButtonCaption: string;
  submitButtonTooltipText: string;
  textInputMaxChars: number;
  textInputPlaceholder: string;
  textInputReadOnly: boolean;
}

export declare interface IQuestAnimationData {
  zoom: number;
}

export declare interface ImageorderingModuleResponse {
  activityInstructions: string;
  activityPrompt: string;
  activityTitle: string;
  correctText: string;
  gravityEarnedInThisRequest: boolean;
  incorrectText: string;
  isActivity: boolean;
  moduleId: number;
  moduleIdIsValid: boolean;
  moduleType: string;
  moduleUUID: string;
  outputDownloadURL: string;
  outputHeading: string;
  outputSubheading: string;
  previewBackToTasksButtonCaption: string;
  previewEditButtonCaption: string;
  previewFinalButtonCaption: string;
  previewFinalHeading: string;
  previewFinalSubheading: string;
  previewFinishButtonCaption: string;
  previewGoBackButtonCaption: string;
  previewHeading: string;
  previewReviewButtonCaption: string;
  previewSubheading: string;
  previewURL: string;
  questId: number;
  questIdIsValid: boolean;
  questUUID: string;
  slotArray: [];
  slotCount: number;
  step: number;
}

export declare interface IImageOrderingSlot {
  slotId: number;
  slotSequence: number;
  showSlotTitle: boolean;
  slotTitle: string;
  slotHasImage: boolean;
  textPrompt: string;
  showTextPrompt: boolean;
  graphicalPromptURL: string;
  showGraphicalPrompt: boolean;
  slotIdentifier: string;
  QuestModuleImageOrderingSlotId: number;
  OverlayXpos: number;
  OverlayYpos: number;
  OverlayWidth: number;
  OverlayHeight: number;
  CorrectAnswer: number;
  enableSlotButton: boolean;
  showSlotButton: boolean;
  slotButtonCaption: string;
  showSlotButtonTooltip: boolean;
  slotButtonTooltipText: string;
  showSlotInfo: boolean;
  enableSlotInfo: boolean;
  slotInfoTitle: string;
  showSlotInfoTooltip: boolean;
  slotInfoTooltipText: string;
  slotInfo: {
    showSlotContentsDesc: boolean;
    slotContentsDesc: string;
    showObjectDetails: boolean;
    objectName: string;
    imageDate: string;
    imageTime: string;
    telescopeName: string;
    instrumentName: string;
  };
  showSlotDetails: boolean;
  slotDetails: [];
  showDotMenu: boolean;
  enableDotMenu: boolean;
  dotMenuTitle: string;
  showDotMenuTooltip: boolean;
  dotMenuTooltipText: string;
  dotMenu: {
    showCheckForMissions: boolean;
    enableCheckForMissions: boolean;
    checkForMissionsText: string;
    checkForMissionsUrl: string;
    showRemoveImage: boolean;
    enableRemoveImage: boolean;
    removeImageText: string;
    showDownloadImage: boolean;
    enableDownloadImage: boolean;
    downloadImageText: string;
    showObjectInfo: boolean;
    enableObjectInfo: boolean;
    objectInfo: {
      callSource: string;
      objectName: string;
      objectId: number;
      learnAboutText: string;
      learnAboutUrl: string;
      showFollowPromptFlag: boolean;
      followPrompt: string;
      followPromptIconUrl: string;
      followActionIconUrl: string;
      toggleFollowConfirmationFlag: boolean;
      toggleFollowConfirmationPrompt: string;
    };
  };
  contentType: string;
  contentCount: number;
  imageSource: string;
  objectId: number;
  customerImageId: number;
  imageURL: string;
  thumbnailURL: string;
}

export declare interface IQuestDotMenuItem {
  show: boolean;
  disabled: boolean;
  title: any;
  action?: () => void;
}

export declare interface IDeleteInvitationResponse {
  pageHeading1: string;
  pageHeading2: string;
  canDeleteInvitation: boolean;
  confirmationText: string;
  confirmButtonText: string;
  cancelButtonText: string;
  gravityEarnedInThisRequest: boolean;
}

export declare interface IInvitationCustomerLinks {
  publicProfileLinkUrl: string;
  name: string;
  firstname: string;
  lastname: string;
  emailaddress: string;
  invitationcode: string;
  showInvitationCode: boolean;
  status: string;
  lastactivity: string;
  showClubStatus: boolean;
  showAddButton: boolean;
  invitationPrompt: string;
  clubStatus: string;
  canDeleteInvitation: boolean;
}
