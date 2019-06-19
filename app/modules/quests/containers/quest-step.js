import { QuestStep } from 'app/modules/quests/components/quest-step';
import { getQuestStep } from 'app/modules/quests/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  getQuestStep,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestStep);
