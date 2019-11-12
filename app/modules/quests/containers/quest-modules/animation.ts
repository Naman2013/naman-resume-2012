import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { AnimationModule } from 'app/modules/quests/components/quest-modules/animation';
import {
  getAnimation,
  getAnimationFrames,
  setAnimation,
} from 'app/modules/quests/thunks';
import {
  makeQuestAnimationSelector,
  makeQuestAnimationFramesSelector,
  makeQuestsStepDataSelector,
  makeQuestAnimationActiveFrameSelector,
  makeQuestAnimationDataSelector,
} from 'app/modules/quests/selectors';
import { ACTION } from '../../reducer';

const mapStateToProps = createStructuredSelector({
  questAnimation: makeQuestAnimationSelector(),
  questAnimationFrames: makeQuestAnimationFramesSelector(),
  stepData: makeQuestsStepDataSelector(),
  activeFrame: makeQuestAnimationActiveFrameSelector(),
  questAnimationData: makeQuestAnimationDataSelector(),
});

const mapDispatchToProps = {
  getAnimation,
  getAnimationFrames,
  setActiveFrame: ACTION.setActiveFrame,
  setAnimation,
  setAnimationData: ACTION.setAnimationData,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AnimationModule);
