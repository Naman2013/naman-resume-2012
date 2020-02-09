import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { validateResponseAccess } from 'app/modules/authorization/actions';
import { makeUserSelector } from 'app/modules/user/selectors';
import { ObservationComments } from 'app/modules/observations/components/observation-comments';

const mapStateToProps = createStructuredSelector({
  user: makeUserSelector(),
});

const mapDispatchToProps = {
  validateResponseAccess,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ObservationComments);
