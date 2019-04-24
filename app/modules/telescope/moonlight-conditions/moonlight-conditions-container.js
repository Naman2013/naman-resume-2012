import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeMoonlightWidgetDataSelector } from './selectors';
import { MoonlightWidget } from './moonlight-conditions';

const mapStateToProps = createStructuredSelector({
  moonlightWidget: makeMoonlightWidgetDataSelector(),
});

export const MoonlightConditions = connect(
  mapStateToProps,
  null
)(MoonlightWidget);
