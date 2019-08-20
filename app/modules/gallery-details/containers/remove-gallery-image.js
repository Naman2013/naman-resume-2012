import { removeImageFromGallery } from 'app/modules/gallery-details/thunks';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RemoveGalleryImageBtn } from 'app/modules/gallery-details/components/remove-gallery-image-btn';

const mapStateToProps = () => {};

const mapDispatchToProps = {
  removeImageFromGallery,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RemoveGalleryImageBtn);
