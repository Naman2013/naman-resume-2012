import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Telescope } from '../components/telescope';
import { getObservatoryList } from '../thunks';
import { makeTelescopeListSelector } from '../selectors';

const mapStateToProps = createStructuredSelector({
  telescopeList: makeTelescopeListSelector(),
});

const mapDispatchToProps = {
  getObservatoryList,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Telescope);
