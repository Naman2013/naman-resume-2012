import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TopThreads } from '../components/topThreads';

import {
  makeTopThreadsDataSelector,
  makeTopThreadsLoadingSelector,
} from '../selectors';
import { getTopThreadList } from '../thunks';

const mapStateToProps = createStructuredSelector({
  topThreadsList: makeTopThreadsDataSelector(),
  isLoading: makeTopThreadsLoadingSelector(),
});

const mapDispatchToProps = {
  getTopThreadList,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TopThreads);
