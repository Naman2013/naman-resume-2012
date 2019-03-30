import { EditHeader } from 'app/modules/image-details/components/edit/edit-header';
import { deleteImage } from 'app/modules/image-details/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';

// const mapStateToProps = createStructuredSelector({});
const mapStateToProps = state => ({
  //  el: select()(state)
});

const mapDispatchToProps = {
  deleteImage,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditHeader);
