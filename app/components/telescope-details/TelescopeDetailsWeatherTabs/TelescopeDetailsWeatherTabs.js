import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import generateWeatherTabConfiguration from './generate-tab-configuration';
import DefaultTabs from '../../Tabs';
import './weather-tabs.scss';

const mapStateToProps = ({ telescopeDetails }) => ({
});

const mapDispatchToProps = dispatch => ({

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
