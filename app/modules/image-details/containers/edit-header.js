import { EditHeader } from 'app/modules/image-details/components/edit/edit-header';
import {
  makeTagListSelector,
  makeTagsFetchingSelector,
} from 'app/modules/image-details/selectors';
import {
  deleteImage,
  deleteTag,
  getTags,
  setTag,
} from 'app/modules/image-details/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// const mapStateToProps = createStructuredSelector({});
const mapStateToProps = createStructuredSelector({
  //  el: select()(state)
  tagList: makeTagListSelector(),
  tagsFetching: makeTagsFetchingSelector(),
});

const mapDispatchToProps = {
  deleteImage,
  getTags,
  setTag,
  deleteTag,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditHeader);
