import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { StoryDetails } from '../components/story-details';
import { getStoryDetails } from '../thunks';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  getStoryDetails,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(StoryDetails);
