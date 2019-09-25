import { QuestDetails } from 'app/modules/quests/components/quest-details';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { setQuestCompleted } from 'app/modules/quests/thunks';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  setQuestCompleted,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestDetails);
