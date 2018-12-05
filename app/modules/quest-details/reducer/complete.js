export const fetchCompleteStart = state => ({
  ...state,
});

export const fetchCompleteSuccess = (state, { payload }) => {
  return {
    ...state,
    complete: {
      ...state.complete,
      ...payload,
    },
  };
};

export const fetchCompleteFailure = state => ({
  ...state,
  complete: {
    congratulationsCaption: 'CONGRATULATIONS!',
    questCompletedTitle: 'QUEST COMPLETED',
    youAreAwardedCaption: 'YOU ARE AWARDED THE:  xxxxxxx badge',
    earnedInCaption: 'Earned in the yyyyyyy Quest',
    didYouKnowCaption: 'DID YOU KNOW?',
    didYouKnowText: 'string',
    reviewQuestButtonCaption: 'REVIEW QUEST',
    learnMoreButtonCaption: 'LEARN MORE',
    viewMoreButtonCaption: 'VIEW MORE',
    relatedQuestsCaption: 'Ready for more Quests?!',
    relatedQuestsCount: 1,
    relatedQuestsList: [
      {
        questIndex: 0,
        questId: 3,
        questTitle: 'Something about stars!',
        questType: 'EXPLORER',
        questIconURL: '',

      },
    ],
    stepList: [
      {
        stepFullTitle: 'You\'ve Collected Data',
        stepIconURL: 'https://vega.slooh.com/assets/v4/icons/complete_icon.svg',
      },
      {
        stepFullTitle: 'You\'ve Collected Data',
        stepIconURL: 'https://vega.slooh.com/assets/v4/icons/complete_icon.svg',
      },
      {
        stepFullTitle: 'You\'ve Collected Data',
        stepIconURL: 'https://vega.slooh.com/assets/v4/icons/complete_icon.svg',
      },
      {
        stepFullTitle: 'You\'ve Collected Data',
        stepIconURL: 'https://vega.slooh.com/assets/v4/icons/complete_icon.svg',
      },
      {
        stepFullTitle: 'You\'ve Collected Data',
        stepIconURL: 'https://vega.slooh.com/assets/v4/icons/complete_icon.svg',
      },
    ]
  },
});
