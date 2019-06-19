import { QuestStep } from 'app/modules/quests/components/quest-step';
import {
  makeQuestsLoadingSelector,
  makeQuestsStepDataSelector,
  makeQuestsStepModuleListSelector,
} from 'app/modules/quests/selectors';
import { getQuestOutput, getQuestStep } from 'app/modules/quests/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  loading: makeQuestsLoadingSelector(),
  stepData: makeQuestsStepDataSelector(),
  moduleList: makeQuestsStepModuleListSelector(),
});

const mapDispatchToProps = {
  getQuestStep,
  getQuestOutput,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestStep);
