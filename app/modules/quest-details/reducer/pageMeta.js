export const fetchPageMetaStart = state => ({
  ...state,
});

export const fetchPageMetaSuccess = (state, { payload }) => {


  const {
    questSubtitle,
    questId, // integer (unsigned) - ID of the quest itself
    status, // string ('draft','published')
    questIdUser, // integer (unsigned) - ID of this quest for this specific user (if started or completed, otherwise 0)
    questTitle, // string
    questType, // string example: EXPLORER QUEST
    questStatus, // string ‘started’, ‘completed’, ‘notstarted’,’canceled’
                // (NOTE: ‘canceled’ is not currently implemented)
    started, // boolean
    completed, // boolean
    readOnly, // boolean
    iconURL, //  string    URL for the icon for this quest
    badgeId, // integer (unsigned)
    showStartQuestButton, //   boolean
    startQuestButtonCaption, // string  ex:  START QUEST
    showResources, // boolean (appendix)
    resourcesButtonCaption, // string   RESOURCES
    aboutTitle, // string example:  ABOUT THIS QUEST
    aboutText, // (string) - raw , renderable html as-is  (like Guide AboutThisContent field in the response from /api/page/guide)
    difficulty, // string or blank if not to be displayed - example: BEGINNERS AND UP
    completionTime, // string or blank if not to be displayed - example:  COMPLETE IN ONE DAY
    seasonality, // string or blank if not to be displayed - example: SEASONALITY: ALL YEAR
    stepsHeader, // string  ex:  STEPS WITHIN THIS QUEST
    stepsSubheader, // string  ex:     Complete each step to earn your badge!
    stepCount, // integer (unsigned)
    stepList, // array
  } = payload;

  return {
    ...state,
    questId: 9,
    questSubtitle: 'A planet is interesting',
    questTitle: 'Once Upon a Planet',
    status: 'published', // string ('draft','published')
    questIdUser: 10006, // integer (unsigned) - ID of this quest for this specific user (if started or completed, otherwise 0)
    questType: 'Explorer Quest', // string example: EXPLORER QUEST
    questStatus: 'notstarted', // string ‘started’, ‘completed’, ‘notstarted’,’canceled’
                // (NOTE: ‘canceled’ is not currently implemented)
    started: false, // boolean
    completed: false, // boolean
    readOnly: false, // boolean
    iconURL: 'https://vega.slooh.com/assets/v4/dashboard/icon_quests.svg', //  string    URL for the icon for this quest
    badgeId: 1, // integer (unsigned)
    showStartQuestButton: true, //   boolean
    startQuestButtonCaption: 'Start Quest', // string  ex:  START QUEST
    showResources: true, // boolean (appendix)
    resourcesButtonCaption: 'Resources', // string   RESOURCES
    aboutTitle: 'About this quest', // string example:  ABOUT THIS QUEST
    aboutText: 'Lorem ipsum...', // (string) - raw , renderable html as-is  (like Guide AboutThisContent field in the response from /api/page/guide)
    aboutBulletPoints: ['Beginners and up', 'Complete in one day', 'All Year'],
    stepsHeader: 'Steps within this quest', // string  ex:  STEPS WITHIN THIS QUEST
    stepsSubheader: 'Complete each step to earn your badge!', // string  ex:     Complete each step to earn your badge!
    stepCount: 3, // integer (unsigned)
    stepList: [], // array
  };
};

export const fetchPageMetaFailure = state => ({
  ...state,
});
