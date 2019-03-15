import { AllSkyTimelapse } from 'app/modules/telescope/components/all-sky-timelapse';
import { makeAllSkyTimelapseURLSelector } from 'app/modules/telescope/selectors';
import { getAllSkyTimelapse } from 'app/modules/telescope/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  allskyTimelapseURL: makeAllSkyTimelapseURLSelector(),
});

const mapDispatchToProps = {
  getAllSkyTimelapse,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AllSkyTimelapse);
