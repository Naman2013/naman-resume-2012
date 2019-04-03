import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Telescope } from '../components/telescope';
import { getObservatoryList, setTelescope } from '../thunks';
import {
  makeTelescopeListSelector,
  makeTelescopeSelectedTelescopeSelector,
  makeTelescopeSelectedDateSelector,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  telescopeList: makeTelescopeListSelector(),
  selectedTelescope: makeTelescopeSelectedTelescopeSelector(),
  selectedDate: makeTelescopeSelectedDateSelector(),
});

const mapDispatchToProps = {
  getObservatoryList,
  setTelescope,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Telescope);
