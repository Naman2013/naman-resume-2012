import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { NewGuestDashboard } from './index.js';
import { makeLandingPageDetailsSelector } from './selector.js';
import { fetchLandingPageAction } from './actions';

const mapStateToProps = createStructuredSelector({
  landingPageDetails: makeLandingPageDetailsSelector(),
});

const mapDispatchToProps = {
  fetchLandingPageAction
};

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(NewGuestDashboard);