import { QuestModuleTextOutput } from 'app/modules/quests/components/quest-modules/textoutput';
import {
  makeQuestOutputSelector,
  makeQuestsLoadingSelector,
  makeQuestsStepDataSelector,
  makeQuestsStepModuleListSelector,
} from 'app/modules/quests/selectors';
import { getQuestOutput } from 'app/modules/quests/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  // loading: makeQuestsLoadingSelector(),
  // stepData: makeQuestsStepDataSelector(),
  // moduleList: makeQuestsStepModuleListSelector(),
  questOutput: makeQuestOutputSelector(),
});

const mapDispatchToProps = {
  getQuestOutput,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(QuestModuleTextOutput);
