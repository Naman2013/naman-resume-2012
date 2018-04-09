import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeatherForecast } from '../../../modules/Telescope-Overview';
import generateWeatherTabConfiguration from './generate-tab-configuration';
import DefaultTabs from '../../Tabs';
import './weather-tabs.scss';

const mapStateToProps = ({ telescopeDetails }) => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchWeatherForecast,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class TelescopeDetailsWeatherTabs extends Component {
  state = {
    selectedTabIndex: 0,
  };

  componentWillMount() {
    const {
      obsId,
      miniWeatherPanelWidgetId,
      satelliteWidgetId,
      weatherConditionsWidgetId,
      missionControlStatusWidgetId
    } = this.props;
  }

  handleTabClick = (selectedTabIndex) => {
    /* always refesh the first tab, as the first tab object doesn't know how to load itself due to multi-api call issue */
    switch(selectedTabIndex) {
        case 0:
          const { obsId, miniWeatherPanelWidgetId } = this.props;
          this.props.actions.fetchWeatherForecast({
            obsId: obsId,
            MiniWeatherPanelWidgetId: miniWeatherPanelWidgetId,
          });
          break;
    }
    this.setState({
      selectedTabIndex,
    });
  };

  render() {
    const { selectedTabIndex } = this.state;
    const tabConfiguration = generateWeatherTabConfiguration(this.props);

    return (
      <div className="weatherTabsStyle">
        <DefaultTabs
          tabConfiguration={tabConfiguration}
          handleTabSelect={this.handleTabClick}
          selectedIndex={selectedTabIndex}
        />
      </div>
    );
  }
}

export default TelescopeDetailsWeatherTabs;
