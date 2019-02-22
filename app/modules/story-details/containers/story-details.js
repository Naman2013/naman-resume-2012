import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { StoryDetails } from '../components/story-details';
import {
  makePostSelector,
  makeStoryDetailsLoadingSelector,
} from '../selectors';
import { getStoryDetails } from '../thunks';

const mapStateToProps = createStructuredSelector({
  isFetching: makeStoryDetailsLoadingSelector(),
  post: makePostSelector(),
});

const mapDispatchToProps = {
  getStoryDetails,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(StoryDetails);
