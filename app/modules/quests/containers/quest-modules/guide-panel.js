import { QuestModuleGuidePanel } from 'app/modules/quests/components/quest-modules/guide-panel';
import { makeQuestGuidePanelSelector } from 'app/modules/quests/selectors';
import { getQuestGuidePanel } from 'app/modules/quests/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  questGuidePanel: makeQuestGuidePanelSelector(),
});

const mapDispatchToProps = {
  getQuestGuidePanel,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(QuestModuleGuidePanel);
