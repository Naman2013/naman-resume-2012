import { QuestModuleQaFreeForm } from 'app/modules/quests/components/quest-modules/qa-free-form';
import {
  makeQuestsLoadingSelector,
  makeQuestsStepDataSelector,
  makeQuestsStepModuleListSelector,
  makeQuestQaFreeFormSelector,
} from 'app/modules/quests/selectors';
import {
  getQaFreeForm,
  getQuestStep,
  setQaFreeForm,
} from 'app/modules/quests/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  loading: makeQuestsLoadingSelector(),
  stepData: makeQuestsStepDataSelector(),
  moduleList: makeQuestsStepModuleListSelector(),
  questQaFreeForm: makeQuestQaFreeFormSelector(),
});

const mapDispatchToProps = {
  getQaFreeForm,
  getQuestStep,
  setQaFreeForm,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestModuleQaFreeForm);
