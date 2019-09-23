import { QuestModuleQaMultipleChoice } from 'app/modules/quests/components/quest-modules/qa-multiple-choice';
import {
  makeQuestsLoadingSelector,
  makeQuestsStepDataSelector,
  makeQuestsStepModuleListSelector,
  makeQuestQaMultipleChoiceSelector,
} from 'app/modules/quests/selectors';
import {
  getQaMultipleChoice,
  getQuestStep,
  setQaMultipleChoice,
} from 'app/modules/quests/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ACTION } from '../../reducer';

const mapStateToProps = createStructuredSelector({
  loading: makeQuestsLoadingSelector(),
  stepData: makeQuestsStepDataSelector(),
  moduleList: makeQuestsStepModuleListSelector(),
  questQaMultipleChoice: makeQuestQaMultipleChoiceSelector(),
});

const mapDispatchToProps = {
  getQaMultipleChoice,
  getQuestStep,
  setQaMultipleChoice,
  setQaFillBlanksAnswer: ACTION.setQaFillBlanksAnswer,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestModuleQaMultipleChoice);
