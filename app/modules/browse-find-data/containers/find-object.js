import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FindObject } from 'app/modules/browse-find-data/components/find-object';
import {
  fetchBrowseFindDataAction,
  resetBrowseFindDataAction,
} from 'app/modules/browse-find-data/actions';
import { makeBrowseFindDataSelector } from 'app/modules/browse-find-data/selectors';

const mapStateToProps = createStructuredSelector({
  browserFindData: makeBrowseFindDataSelector(),
});

const mapDispatchToProps = {
  fetchBrowseFindDataAction,
  resetBrowseFindDataAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FindObject);
