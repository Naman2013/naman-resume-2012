import { QuestModuleDataCollection } from 'app/modules/quests/components/quest-modules/data-collection';
import {
  makeQuestsLoadingSelector,
  makeQuestsStepDataSelector,
  makeQuestsStepModuleListSelector,
  makeQuestDataCollectionSelector,
  makeQuestDataCollectionSlotImagesSelector,
} from 'app/modules/quests/selectors';
import {
  getDataCollection,
  getDataCollectionSlotImages,
  setDataCollectionSlotImages,
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
});

const mapDispatchToProps = {
  getDataCollection,
  getDataCollectionSlotImages,
  setDataCollectionSlotImages,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestModuleDataCollection);
