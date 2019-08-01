import { QuestModuleQaFillBlanks } from 'app/modules/quests/components/quest-modules/qa-fill-blanks';
import {
  makeQuestsLoadingSelector,
  makeQuestsStepDataSelector,
  makeQuestsStepModuleListSelector,
  makeQuestQaFillBlanksSelector,
} from 'app/modules/quests/selectors';
import {
  getQaFillBlanks,
  getQuestStep,
  setQaFillBlanks,
} from 'app/modules/quests/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ACTION } from '../../reducer';

const mapStateToProps = createStructuredSelector({
  loading: makeQuestsLoadingSelector(),
  stepData: makeQuestsStepDataSelector(),
  moduleList: makeQuestsStepModuleListSelector(),
  questQaFillBlanks: makeQuestQaFillBlanksSelector(),
});

const mapDispatchToProps = {
  getQaFillBlanks,
  getQuestStep,
  setQaFillBlanks,
  setQaFreeFormAnswer: ACTION.setQaFreeFormAnswer,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestModuleQaFillBlanks);
