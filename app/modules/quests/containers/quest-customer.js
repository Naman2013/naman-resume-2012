import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCustomerQuests } from 'app/modules/quests/thunks';
import { QuestCustomer } from 'app/modules/quests/components/quest-customer';
import {
  makeQuestsLoadingSelector,
  makeCustomerQuestsSelector,
} from 'app/modules/quests/selectors';

const mapStateToProps = createStructuredSelector({
  loading: makeQuestsLoadingSelector(),
  customerQuestsData: makeCustomerQuestsSelector(),
});

const mapDispatchToProps = {
  getCustomerQuests,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuestCustomer);
