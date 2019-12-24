import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAllSkyCam } from 'app/modules/telescope/thunks';
import { AllSkyCamWidget } from 'app/modules/telescope/components/widgets/all-sky-cam-widget';

const mapStateToProps = (state: any, props: any) => ({
  allSkyCamData: state.telescope.allSkyCamData[props.allSkyWidgetID] || {},
});

const mapDispatchToProps = { getAllSkyCam };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AllSkyCamWidget);
