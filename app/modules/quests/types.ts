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
  editAnimationButtonTooltipText: string;
  editButtonTooltipText: string;
  enableDownloadButton: boolean;
  enableEditAnimationButton: boolean;
  enableEditButton: boolean;
  enableFastButton: boolean;
  enableFinishButton: boolean;
  enableMediumButton: boolean;
  enablePlayButton: boolean;
  enableSlowButton: boolean;
  fastButtonTooltipText: string;
  finishButtonTooltipText: string;
  mediumButtonTooltipText: string;
  playButtonTooltipText: string;
  showDownloadButton: boolean;
  showDownloadButtonTooltip: boolean;
  showEditAnimationButton: boolean;
  showEditAnimationButtonTooltip: boolean;
  showEditButton: boolean;
  showEditButtonTooltip: boolean;
  showFastButton: boolean;
  showFastButtonTooltip: boolean;
  showFinishButton: boolean;
  showFinishButtonTooltip: boolean;
  showMediumButton: boolean;
  showMediumButtonTooltip: boolean;
  showPlayButton: boolean;
  showPlayButtonTooltip: boolean;
  showSlowButton: boolean;
  showSlowButtonTooltip: boolean;
  slowButtonTooltipText: string;
  downloadButtonTooltipText: string;
  outputDownloadURL: string;
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
  left: number;
  top: number;
  zoom: number;
  activityState: string;
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

export declare interface ImageorderingModuleResponse extends StandardResponse {
  activityInstructions: string;
  activityPrompt: string;
  activityTitle: string;
  activityStatus: string;
  activityState: string;
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
  goBackButtonCaption: string;
  previewHeading: string;
  previewReviewButtonCaption: string;
  previewSubheading: string;
  previewURL: string;
  outputURL: string;
  questId: number;
  questIdIsValid: boolean;
  questUUID: string;

  previewButtonCaption: string;
  enablePreviewButton: boolean;
  showPreviewButton: boolean;
  previewButtonTooltipText: string;
  showPreviewButtonTooltip: boolean;

  downloadPreviewButtonIconURL: string;
  downloadPreviewButtonTooltipText: string;
  showDownloadPreviewButton: boolean;
  previewDownloadURL: string;
  enableDownloadPreviewButton: boolean;

  backToEditButtonCaption: string;
  enableBackToEditButton: boolean;
  showBackToEditButton: boolean;
  backToEditButtonTooltipText: string;
  showBackToEditButtonTooltip: boolean;

  finishButtonCaption: string;
  enableFinishButton: boolean;
  showFinishButton: boolean;
  finishButtonTooltipText: string;
  showFinishButtonTooltip: boolean;

  reviewWorkButtonCaption: string;
  enableReviewWorkButton: boolean;
  showReviewWorkButton: boolean;
  reviewWorkButtonTooltipText: string;
  showReviewWorkButtonTooltip: boolean;

  editWorkButtonCaption: string;
  enableEditWorkButton: boolean;
  showEditWorkButton: boolean;
  editWorkButtonTooltipText: string;
  showEditWorkButtonTooltip: boolean;

  exitReviewButtonCaption: string;
  enableExitReviewButton: boolean;
  showExitReviewButton: boolean;
  exitReviewButtonTooltipText: string;
  showExitReviewButtonTooltip: boolean;

  enableDownloadButton: boolean;
  showDownloadButton: boolean;
  downloadButtonTooltipText: string;
  showDownloadButtonTooltip: boolean;

  slotArray: Array<IQuestDataCollectionSlot>;
  slotCount: number;
  step: number;
}

export declare interface IQuestDataCollectionSlotImages
  extends StandardResponse {
  emptySetContentsDesc: {
    noImagesFoundPrompt: string;
    slotObjectMissionLinks: [
      { linkIndex: boolean; linkLabel: string; linkURL: string }
    ];
    sunObjectFlag: boolean;
  };
  noImagesFoundPrompt: string;
  slotObjectMissionLinks: [
    {
      linkIndex: number;
      linkLabel: string;
      linkURL: string;
    }
  ];
  sunObjectFlag: boolean;
  emptySetDisplay: string;
  emptySetFlag: boolean;
  firstImageNumber: number;
  gravityEarnedInThisRequest: boolean;
  imageCount: number;
  imageList: [];
  maxImageCount: number;
  moduleId: number;
  moduleIdIsValid: boolean;
  moduleType: string;
  moduleUUID: string;
  pagingMode: string;
  questId: number;
  questIdIsValid: boolean;
  questUUID: string;
  showEmptySetContentsDesc: boolean;
  showMoreButtonCaption: string;
  showMoreImagesIncrement: number;
  showShowMoreButton: boolean;
  showSlotContentsDesc: boolean;
  slotContentsDesc: string;
  slotContentsHeader: string;
  slotId: number;
  slotIdIsValid: boolean;
  slotType: string;
  totalImageCount: number;
}

export declare interface IQuestDataCollectionSlot {
  CorrectAnswer: number;
  OverlayHeight: number;
  OverlayWidth: number;
  OverlayXpos: number;
  OverlayYpos: number;
  QuestModuleImageOrderingSlotId: number;
  scoringText: string;
  scoringTextBold: boolean;
  contentCount: number;
  contentType: string;
  customerImageId: number;
  dotMenu: {
    checkForMissionsText: string;
    checkForMissionsUrl: string;
    downloadImageText: string;
    enableCheckForMissions: boolean;
    enableDownloadImage: boolean;
    enableObjectInfo: boolean;
    enableRemoveImage: boolean;
    objectInfo: {
      callSource: string;
      followActionIconUrl: string;
      followPrompt: string;
      followPromptIconUrl: string;
      learnAboutText: string;
      learnAboutUrl: string;
      objectId: number;
      objectName: string;
      showFollowPromptFlag: boolean;
      toggleFollowConfirmationFlag: boolean;
      toggleFollowConfirmationPrompt: string;
    };
    removeImageText: string;
    showCheckForMissions: boolean;
    showDownloadImage: boolean;
    showObjectInfo: boolean;
    showRemoveImage: boolean;
  };
  dotMenuTitle: string;
  dotMenuTooltipText: string;
  enableDotMenu: boolean;
  enableSlotButton: boolean;
  enableSlotInfo: boolean;
  graphicalPromptURL: string;
  imageSource: string;
  imageURL: string;
  objectId: number;
  showDotMenu: boolean;
  showDotMenuTooltip: boolean;
  showGraphicalPrompt: boolean;
  showSlotButton: boolean;
  showSlotButtonTooltip: boolean;
  showSlotDetails: boolean;
  showSlotInfo: boolean;
  showSlotInfoTooltip: boolean;
  showSlotTitle: boolean;
  showTextPrompt: boolean;
  slotButtonCaption: string;
  slotButtonTooltipText: string;
  slotDetails: [];
  slotHasImage: boolean;
  slotId: number;
  slotIdentifier: string;
  slotInfo: {
    imageDate: string;
    imageTime: string;
    instrumentName: string;
    objectName: string;
    showObjectDetails: boolean;
    showSlotContentsDesc: boolean;
    slotContentsDesc: string;
    telescopeName: string;
  };
  slotInfoTitle: string;
  slotInfoTooltipText: string;
  slotSequence: number;
  slotTitle: string;
  textPrompt: string;
  thumbnailURL: string;
  explanation: string;
}

export declare interface IQuestDataCollectionSlotImage {
  alreadyUsed: boolean;
  constellation: string;
  customerImageId: number;
  domeId: number;
  imageDownloadFilename: string;
  imageDownloadURL: string;
  imageId: number;
  imageIndex: number;
  imageTimeFormatted: {
    displayDate: string;
    displayDateTime: string;
    displayFullMonthDayYearUTC: string;
    displayLabel: string;
    displayOtherTimeZones: string;
    displayTime: string;
    displayTimeZone: string;
    displayUSEasternTime: string;
    displayUSPacificTime: string;
    displayWMDUSEasternTime: string;
    displayWMDUSPacificTime: string;
    displayWeekdayMonthDayUTC: string;
    displayWeekdayMonthDayYearUTC: string;
  };
  imageTimestamp: number;
  imageType: string;
  imageURL: string;
  instrumentName: string;
  objectIconURL: string;
  objectId: number;
  objectTitle: string;
  obsId: string;
  observatoryName: string;
  originX: null;
  originY: null;
  scheduledMissionId: number;
  selected: boolean;
  sysId: string;
  telescopeId: string;
  telescopeName: string;
  thumbnailURL: string;
  zoom: null;
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
