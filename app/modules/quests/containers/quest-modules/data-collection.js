import { QuestModuleDataCollection } from 'app/modules/quests/components/quest-modules/data-collection';
import {
  makeQuestsLoadingSelector,
  makeQuestsStepDataSelector,
  makeQuestsStepModuleListSelector,
  makeQuestDataCollectionSelector,
  makeQuestDataCollectionSlotImagesSelector,
} from 'app/modules/quests/selectors';

import { makeUserSelector } from 'app/modules/user/selectors';
import {
  getDataCollection,
  getDataCollectionSlotImages,
  setDataCollectionSlotImages,
  getQuestStep,
} from 'app/modules/quests/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  loading: makeQuestsLoadingSelector(),
  stepData: makeQuestsStepDataSelector(),
  moduleList: makeQuestsStepModuleListSelector(),
  questDataCollection: makeQuestDataCollectionSelector(),
  questDataCollectionSlotImages: makeQuestDataCollectionSlotImagesSelector(),
  user: makeUserSelector(),
});

const mapDispatchToProps = {
  getDataCollection,
  getDataCollectionSlotImages,
  setDataCollectionSlotImages,
  getQuestStep,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestModuleDataCollection);
