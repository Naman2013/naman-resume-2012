import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TopThreads } from '../components/topThreads';

import {
  makeTopThreadsDataSelector,
  makeTopThreadsLoadingSelector,
} from '../selectors';
import { getTopThreadList } from '../thunks';
import { setPublicCardStatusAction } from '../../../modules/upcoming-events/upcoming-events-actions';

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
)(TopThreads);
