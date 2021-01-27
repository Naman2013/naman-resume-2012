import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { TopThreads } from '../components/topThreads';

import {
  makeTopThreadsDataSelector,
  makeTopThreadsLoadingSelector,
} from '../selectors';
import { getTopThreadList } from '../thunks';
import { setPublicCardStatusAction } from '../../upcoming-events/upcoming-events-actions';
import { TopThreadsNew } from '../components/topThreads-new';

const mapStateToProps = createStructuredSelector({
  topThreadsList: makeTopThreadsDataSelector(),
  isLoading: makeTopThreadsLoadingSelector(),
});

const mapDispatchToProps = {
  getTopThreadList,
  setPublicCardStatusAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TopThreadsNew);
