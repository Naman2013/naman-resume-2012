import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import generateAllSkyTabConfiguration from './generate-tab-configuration';
import DefaultTabs from '../../Tabs';
import './allsky-tabs.scss';

const mapStateToProps = ({ telescopeDetails }) => ({
});

const mapDispatchToProps = dispatch => ({

});

@connect(mapStateToProps, mapDispatchToProps)
class AllSkyTabs extends Component {
  state = {
    selectedTabIndex: 0,
  };

  componentWillMount() {
    const {
      obsId,
      AllskyWidgetId,
      AllskyTimelapseWidgetId,
    } = this.props;
  }

  handleTabClick = (selectedTabIndex) => {
    this.setState({
      selectedTabIndex,
    });
  };

  render() {
    const { selectedTabIndex } = this.state;
    const tabConfiguration = generateAllSkyTabConfiguration(this.props);

    return (
      <div className="allSkyTabsStyle">
        <DefaultTabs
          tabConfiguration={tabConfiguration}
          handleTabSelect={this.handleTabClick}
          selectedIndex={selectedTabIndex}
        />
      </div>
    );
  }
}

export default AllSkyTabs;
