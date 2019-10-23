import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { AnimationModule } from 'app/modules/quests/components/quest-modules/animation';
import { getAnimation, getAnimationFrames } from 'app/modules/quests/thunks';
import {
  makeQuestAnimationSelector,
  makeQuestAnimationFramesSelector,
  makeQuestsStepDataSelector,
} from 'app/modules/quests/selectors';

const mapStateToProps = createStructuredSelector({
  questAnimation: makeQuestAnimationSelector(),
  questAnimationFrames: makeQuestAnimationFramesSelector(),
  stepData: makeQuestsStepDataSelector(),
});

const mapDispatchToProps = { getAnimation, getAnimationFrames };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AnimationModule);
