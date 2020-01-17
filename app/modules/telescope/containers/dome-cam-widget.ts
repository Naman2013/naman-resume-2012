import { connect } from 'react-redux';
import { compose } from 'redux';
import { getDomeCam } from 'app/modules/telescope/thunks';
import { DomeCamWidget } from 'app/modules/telescope/components/widgets/dome-cam-widget';

const mapStateToProps = (state: any, props: any) => ({
  domeCamData: state.telescope.domeCamData[props.domeCamWidgetId] || {},
});

const mapDispatchToProps = { getDomeCam };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DomeCamWidget);
