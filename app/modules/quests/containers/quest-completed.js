import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { QuestCompleted } from 'app/modules/quests/components/quest-completed';
import { getQuestCompleted } from 'app/modules/quests/thunks';
import {
  makeQuestsLoadingSelector,
  makeQuestCompletedSelector,
} from 'app/modules/quests/selectors';

const mapStateToProps = createStructuredSelector({
  loading: makeQuestsLoadingSelector(),
  questCompletedData: makeQuestCompletedSelector(),
});

const mapDispatchToProps = {
  getQuestCompleted,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestCompleted);
