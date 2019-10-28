import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FuncComponent } from 'app/modules/feature-module/components/func-comp';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FuncComponent);
