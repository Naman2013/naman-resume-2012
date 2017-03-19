import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSkyChartWidget } from '../../../modules/Telescope-Overview';
import './TelescopeAllSky.scss';

const mapStateToProps = ({ telescopeOverview }) => ({
  skyChartWidgetResult: telescopeOverview.skyChartWidgetResult,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchSkyChartWidget,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class TelescopeAllSky extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    AllskyWidgetId: PropTypes.string.isRequired,
    scheduledMissionId: PropTypes.number.isRequired,
    skyChartWidgetResult: PropTypes.shape({
      apiError: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
      starChartURL: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      fetchSkyChartWidget: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    fetchSkyChartWidget: () => { console.warning('No method to fetch skychart info provided'); },
  }

  constructor(props) {
    super(props);
    const { obsId, AllskyWidgetId, scheduledMissionId } = this.props;
    console.log('trying to fetch content');
    this.props.actions.fetchSkyChartWidget({
      obsId,
      AllskyWidgetId,
      scheduledMissionId,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('got new props...');
    const { obsId, AllskyWidgetId, scheduledMissionId } = this.props;
    if (
      obsId !== nextProps.obsId ||
      AllskyWidgetId !== nextProps.AllskyWidgetId ||
      scheduledMissionId !== nextProps.scheduledMissionId) {
      this.props.actions.fetchSkyChartWidget({
        obsId: nextProps.obsId,
        AllskyWidgetId: nextProps.AllskyWidgetId,
        scheduledMissionId: nextProps.scheduledMissionId,
      });
    }
  }

  render() {
    console.log('dont forget to remove the test installation of all sky widget');
    const { apiError, title, subTitle, starChartURL  } = this.props.skyChartWidgetResult;

    return (
      <div className="where-sky">
        <div className="top">
          <h3>{title}</h3>
          <p>{subTitle}</p>
        </div>
        <div className="content">
          {
            starChartURL ?
              <img
                alt=""
                src={starChartURL}
                width="100%"
                className="main-image"
              /> : null
          }
        </div>
      </div>
    );
  }
}

export default TelescopeAllSky;
