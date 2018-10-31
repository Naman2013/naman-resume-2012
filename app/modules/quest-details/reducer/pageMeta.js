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
    questUserStatus, // string ‘started’, ‘completed’, ‘notstarted’,’canceled’
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
    pageMeta: {
      ...state.pageMeta,
      questId: 9,
      questSubtitle: 'A planet is interesting',
      questTitle: 'Once Upon a Planet',
      status: 'published', // string ('draft','published')
      questIdUser: 10006, // integer (unsigned) - ID of this quest for this specific user (if started or completed, otherwise 0)
      questType: 'Explorer Quest', // string example: EXPLORER QUEST
      questUserStatus: 'notstarted', // string ‘started’, ‘completed’, ‘notstarted’,’canceled’
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
      aboutText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor justo quam, non ultrices mi lacinia ac. Mauris eget condimentum enim, in tempus eros. Morbi ut volutpat ex. Sed at tellus lacus. Etiam vel diam id felis congue feugiat sit amet sed sapien. Nullam lectus felis, semper tristique sollicitudin a, tincidunt et dolor. Mauris nec finibus arcu, tincidunt ultrices tortor. Fusce sed pretium erat. Suspendisse ut metus feugiat orci ultrices dictum a eu enim. Suspendisse sed vestibulum ante, id pellentesque tellus. Donec libero ante, eleifend a ultrices id, eleifend non libero. Donec eu ante pulvinar, varius libero vel, vulputate dolor. Integer mauris sapien, porta et augue posuere, lobortis placerat nunc. Proin placerat ipsum eget aliquet sodales. Nulla facilisi.

      Vestibulum tincidunt scelerisque erat, id consequat purus congue id. In elementum ipsum nec velit pulvinar, ut tempor justo lacinia. Proin auctor ultricies blandit. Nunc at tortor tellus. In cursus vitae risus non fringilla. Phasellus hendrerit quam vel orci dignissim, posuere pharetra dolor scelerisque. Mauris fermentum dui placerat, viverra lacus at, efficitur urna. Mauris ultricies mattis nisl, sed commodo velit luctus vitae. Morbi dignissim libero a justo venenatis, accumsan pulvinar leo laoreet. Curabitur sodales arcu eget quam tristique, sed ultricies nisi consequat. Etiam mattis augue dictum, fermentum ante vitae, condimentum est. Nam faucibus egestas magna, sit amet posuere sem mollis ut.

      Proin sit amet consectetur justo. Mauris cursus et sapien vel consequat. Pellentesque arcu purus, dapibus sit amet mauris sed, interdum placerat turpis. Phasellus euismod erat magna, ut vehicula nunc auctor vel. Nulla mattis id mauris vitae feugiat. Mauris a turpis ac elit tempor finibus eu nec sem. Donec magna mauris, lacinia tempor venenatis ac, posuere at massa.

      Quisque pharetra purus diam, quis feugiat nibh scelerisque maximus. Donec vestibulum maximus dui, id pharetra orci egestas sit amet. Donec imperdiet nibh nec enim gravida, non rutrum elit rutrum. Praesent commodo dapibus malesuada. Sed vel nisi a elit dictum tincidunt ut vel odio. Duis quis quam enim. Mauris pretium magna id sollicitudin aliquet. Nam congue, nulla sit amet dignissim placerat, sapien quam ultrices nunc, sit amet laoreet risus eros a nibh. Quisque laoreet varius ante a ultrices. Mauris sed nisi neque. Nullam dignissim, lectus ut mattis vestibulum, tortor ex accumsan velit, quis ullamcorper sapien est vitae sapien. Curabitur posuere, ante mollis egestas iaculis, risus erat tristique libero, at finibus libero purus eget tortor. Maecenas nec libero ex. Aenean gravida enim vitae placerat vestibulum. Mauris id vehicula metus. Curabitur convallis magna justo, consequat tempus arcu luctus sed.

      Integer scelerisque lobortis urna, vitae lobortis elit placerat eget. Sed lorem erat, vestibulum eget augue vel, lobortis laoreet dui. Donec ac viverra sapien, finibus tempus elit. Vestibulum sagittis neque sed tellus vehicula fermentum. Pellentesque nec felis at velit tristique venenatis porttitor eu est. Nunc ipsum ligula, sollicitudin non neque eget, efficitur varius diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet diam at metus sodales mattis. Donec sagittis nulla feugiat sollicitudin posuere. Suspendisse placerat volutpat orci, vitae iaculis nisl tincidunt a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed et sollicitudin velit. Morbi arcu sem, consectetur non lorem nec, viverra aliquam turpis. Phasellus finibus tristique velit, vel dignissim elit dapibus vitae.`, // (string) - raw , renderable html as-is  (like Guide AboutThisContent field in the response from /api/page/guide)
      aboutBulletPoints: ['Beginners and up', 'Complete in one day', 'All Year'],
      stepsHeader: 'Steps within this quest', // string  ex:  STEPS WITHIN THIS QUEST
      stepsSubheader: 'Complete each step to earn your badge!', // string  ex:     Complete each step to earn your badge!
      stepCount: 3, // integer (unsigned)
      stepList: [
        {
          stepModuleId: 1, //      integer (unsigned)

          stepModuleIdUser: 1005, //   ID of this step for this specific user (if started or completed, otherwise 0)

          stepSequence: 1, //     integer (unsigned)

          stepTitle: 'Data Collection', //        string     ex:  Data Collection

          stepFullTitle: 'Step 1. Data Collection', //    string    ex:  Step 1. Data Collection

          stepMenuTitle: '1. Data Collection', //   string   ex:  1. Data Collection

          stepCompleted: false, //    boolean

          stepStatusMsg: 'Step 1: Incomplete',//    string       ex:  STEP 3: COMPLETE

          stepActionMsg: 'review your work', //    string       ex:  REVIEW YOUR WORK
        },
        {
          stepModuleId: 2, //      integer (unsigned)

          stepModuleIdUser: 1025, //   ID of this step for this specific user (if started or completed, otherwise 0)

          stepSequence: 2, //     integer (unsigned)

          stepTitle: 'Montage', //        string     ex:  Data Collection

          stepFullTitle: 'Step 2. Montage', //    string    ex:  Step 1. Data Collection

          stepMenuTitle: '2. Montage', //   string   ex:  1. Data Collection

          stepCompleted: true, //    boolean

          stepStatusMsg: 'Step 2: Complete',//    string       ex:  STEP 3: COMPLETE

          stepActionMsg: 'Go To step', //    string       ex:  REVIEW YOUR WORK
        }
      ], // array
    }
  };
};

export const fetchPageMetaFailure = state => ({
  ...state,
  pageMeta: {},
});
