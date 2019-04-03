import { validateResponseAccess } from 'app/modules/authorization/actions';
import { ImageDetails } from 'app/modules/image-details/components/image-details';
import { getImageDetails } from 'app/modules/image-details/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// const mapStateToProps = createStructuredSelector({});
const mapStateToProps = state => ({
  user: state.user,
  //  el: select()(state)
});

const mapDispatchToProps = {
  getImageDetails,
  validateResponseAccess,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ImageDetails);
