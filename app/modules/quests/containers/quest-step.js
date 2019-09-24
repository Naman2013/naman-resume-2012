import { QuestStep } from 'app/modules/quests/components/quest-step';
import {
  makeQuestsLoadingSelector,
  makeQuestsStepDataSelector,
  makeQuestsStepModuleListSelector,
  makeQuestsDetailsModalSelector,
} from 'app/modules/quests/selectors';
import {
  getQuestOutput,
  getQuestStep,
  setQuestCompleted,
} from 'app/modules/quests/thunks';
import modalActions from 'app/modules/quest-details/actions/modal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  loading: makeQuestsLoadingSelector(),
  stepData: makeQuestsStepDataSelector(),
  moduleList: makeQuestsStepModuleListSelector(),
  resourceModal: makeQuestsDetailsModalSelector(),
});

const mapDispatchToProps = {
  getQuestStep,
  setQuestCompleted,
  getQuestOutput,
  closeModal: modalActions.closeModal,
  clearQuestStepData: ACTION.clearQuestStepData,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestStep);
