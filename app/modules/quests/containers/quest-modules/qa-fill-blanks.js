import { QuestModuleQaFillBlanks } from 'app/modules/quests/components/quest-modules/qa-fill-blanks';
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
import { ACTION } from '../../reducer';

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
  setQaFreeFormAnswer: ACTION.setQaFreeFormAnswer,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestModuleQaFillBlanks);
