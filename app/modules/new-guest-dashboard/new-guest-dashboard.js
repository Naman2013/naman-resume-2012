import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { NewGuestDashboard } from './index.js';

const mapStateToProps = null;
// createStructuredSelector({})

const mapDispatchToProps = null;

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(NewGuestDashboard);