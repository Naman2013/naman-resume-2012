import { Imageordering } from 'app/modules/quests/components/quest-modules/imageordering';
import {
  setImageorderingModule,
  getDataCollectionSlotImages,
  setDataCollectionSlotImages,
} from 'app/modules/quests/thunks';
import {
  makeQuestsLoadingSelector,
  makeQuestDataCollectionSlotImagesSelector,
  makeQuestsStepDataSelector,
} from 'app/modules/quests/selectors';
import { makeUserSelector } from 'app/modules/user/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ACTION } from '../../reducer';

const mapStateToProps = (state: any, props: any) => ({
  loading: makeQuestsLoadingSelector()(state),
  stepData: makeQuestsStepDataSelector()(state),
  imageorderingModule: state.quests.imageorderingModules[props.moduleId] || {},
  questDataCollectionSlotImages: makeQuestDataCollectionSlotImagesSelector()(
    state
  ),
  user: makeUserSelector()(state),
});

const mapDispatchToProps = {
  getImageorderingModule: ACTION.getImageorderingModule,
  setImageorderingModule,
  setImageOrderingActivityState: ACTION.setImageOrderingActivityState,
  setDataCollectionSlotImages,
  getDataCollectionSlotImages,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Imageordering);
