import { fetchAllWidgets } from 'app/modules/telescope-details/actions';
import { TelescopeOnline } from 'app/modules/telescope/components/telescope-online';
import { makeDayNightBarPanelSelector } from 'app/modules/telescope/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  dayNightBarPanel: makeDayNightBarPanelSelector(),
});

const mapDispatchToProps = {
  fetchAllWidgets,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TelescopeOnline);
