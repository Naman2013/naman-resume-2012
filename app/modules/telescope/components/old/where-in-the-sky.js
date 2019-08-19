import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSkyChartWidget } from 'app/modules/Telescope-Overview';
import { ModuleContainer } from './module-container';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import style from './where-in-the-sky.style';

class WhereInTheSky extends Component {
  static propTypes = {
    obsId: PropTypes.string.isRequired,
    skyChartWidgetId: PropTypes.string.isRequired,
    scheduledMissionId: PropTypes.string.isRequired,
    fetchSkyChartWidget: PropTypes.func.isRequired,
  };

  state = {
    isOpen: false,
  };

  componentDidMount() {
    const { obsId, skyChartWidgetId, scheduledMissionId } = this.props;
    this.props.fetchSkyChartWidget({
      obsId,
      widgetUniqueId: skyChartWidgetId,
      scheduledMissionId,
    });
  }

  componentDidUpdate(prevProps) {
    const { obsId, skyChartWidgetId, scheduledMissionId } = this.props;
    if (
      obsId !== prevProps.obsId ||
      skyChartWidgetId !== prevProps.skyChartWidgetId ||
      scheduledMissionId !== prevProps.scheduledMissionId
    ) {
      this.props.fetchSkyChartWidget({
        obsId,
        scheduledMissionId,
        widgetUniqueId: skyChartWidgetId,
      });
    }
  }

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { skyChartWidgetData } = this.props;
    const { title, starChartURL } = skyChartWidgetData;
    const { isOpen } = this.state;

    return (
      <div className="sky-chart-widget">
        <ModuleContainer title={title}>
          <img src={starChartURL} onClick={this.toggleModal} />
          <ModalImg
            isOpen={isOpen}
            imageURL={starChartURL}
            onHide={this.toggleModal}
            customClassName="sky-chart-widget-modal"
          />
        </ModuleContainer>
        <style jsx>{style}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ telescopeOverview }) => ({
  skyChartWidgetData: telescopeOverview.skyChartWidgetResult,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSkyChartWidget }, dispatch);

const connectedWhereInTheSky = connect(
  mapStateToProps,
  mapDispatchToProps
)(WhereInTheSky);

export { connectedWhereInTheSky as WhereInTheSky };
