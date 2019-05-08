import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModuleContainer } from './module-container';
import StaticCell from 'app/components/common/grid/StaticCell';
import { fetchSkyChartWidget } from 'app/modules/Telescope-Overview';
import { hawkesBlue } from 'app/styles/variables/colors_tiles_v4';
import style from './where-in-the-sky.style';

const cellTheme = {
  borderBottom: `1px solid ${hawkesBlue}`,
  minHeight: 'auto',
};

class WhereInTheSky extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    AllskyWidgetId: PropTypes.string.isRequired,
    scheduledMissionId: PropTypes.string.isRequired,
    fetchSkyChartWidget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { obsId, AllskyWidgetId, scheduledMissionId } = this.props;
    this.props.fetchSkyChartWidget({
      obsId,
      skyChartWidgetId: AllskyWidgetId,
      scheduledMissionId,
    });
  }

  componentDidUpdate(prevProps) {
    const { obsId, AllskyWidgetId, scheduledMissionId } = this.props;
    if (
      obsId !== prevProps.obsId ||
      AllskyWidgetId !== prevProps.AllskyWidgetId ||
      scheduledMissionId !== prevProps.scheduledMissionId
    ) {
      this.props.fetchSkyChartWidget({
        obsId,
        scheduledMissionId,
        skyChartWidgetId: AllskyWidgetId,
      });
    }
  }

  render() {
    return (
      <div>
        <ModuleContainer title="Where in the night&#39;s sky">
          <div
            style={{ border: '1px solid blue', width: '100%', height: '300px' }}
          />
          <StaticCell title="Distance from earth" theme={cellTheme}>
            <p>Deep space</p>
          </StaticCell>
          <StaticCell title="Apparent angular size" theme={cellTheme}>
            <p>0 31 50</p>
          </StaticCell>
          <StaticCell title="Actual size" theme={cellTheme}>
            <p>0 31 50</p>
          </StaticCell>
        </ModuleContainer>
        <style jsx>{style}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ telescopeOverview }) => ({
  skyChartWidgetResult: telescopeOverview.skyChartWidgetResult,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSkyChartWidget }, dispatch);

const connectedWhereInTheSky = connect(
  mapStateToProps,
  mapDispatchToProps
)(WhereInTheSky);

export { connectedWhereInTheSky as WhereInTheSky };
