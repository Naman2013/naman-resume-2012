import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
    fetchStarPartyDataAction,
} from './actions';
import { makeStarPartyListSelector } from './selectors';
import { NewDashboard } from './index';

const mapStateToProps = createStructuredSelector({
    upcomingStarPartyList: makeStarPartyListSelector(),
});

const mapDispatchToProps = {
    fetchStarPartyDataAction,  
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NewDashboard);