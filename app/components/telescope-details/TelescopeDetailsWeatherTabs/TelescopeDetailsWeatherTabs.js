import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import generateWeatherTabConfiguration from './generate-tab-configuration';
import DefaultTabs from '../../Tabs';

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

      <style jsx>{`
        .weatherTabsStyle {
              width: 100%;
              font-size: 0.8em;
              margin-left: 0;
        }
        .tab {
          height: '0.5em';
        }

      `}</style>
      </div>
    );
  }
}

export default TelescopeDetailsWeatherTabs;
