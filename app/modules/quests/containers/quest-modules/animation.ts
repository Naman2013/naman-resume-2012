import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { AnimationModule } from 'app/modules/quests/components/quest-modules/animation';
import { getAnimation, getAnimationFrames } from 'app/modules/quests/thunks';
import {
  makeQuestAnimationSelector,
  makeQuestAnimationFramesSelector,
  makeQuestsStepDataSelector,
  makeQuestAnimationActiveFrameSelector,
} from 'app/modules/quests/selectors';
import { ACTION } from '../../reducer';

const mapStateToProps = createStructuredSelector({
  questAnimation: makeQuestAnimationSelector(),
  questAnimationFrames: makeQuestAnimationFramesSelector(),
  stepData: makeQuestsStepDataSelector(),
  activeFrame: makeQuestAnimationActiveFrameSelector(),
});

const mapDispatchToProps = {
  getAnimation,
  getAnimationFrames,
  setActiveFrame: ACTION.setActiveFrame,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AnimationModule);
