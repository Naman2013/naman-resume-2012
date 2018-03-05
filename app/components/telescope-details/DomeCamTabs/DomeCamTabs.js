import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import generateDomecamTabConfiguration from './generate-tab-configuration';
import DefaultTabs from '../../Tabs';
import './domecam-tabs.scss';

const mapStateToProps = ({ telescopeDetails }) => ({
});

const mapDispatchToProps = dispatch => ({

});

@connect(mapStateToProps, mapDispatchToProps)
class DomeCamTabs extends Component {
  state = {
    selectedTabIndex: 0,
  };

  componentWillMount() {
    const {
      obsId,
      DomecamWidgetId,
      DomecamTimelapseWidgetId,
    } = this.props;
  }

  handleTabClick = (selectedTabIndex) => {
    this.setState({
      selectedTabIndex,
    });
  };

  render() {
    const { selectedTabIndex } = this.state;
    const tabConfiguration = generateDomecamTabConfiguration(this.props);

    return (
      <div className="domeCamTabsStyle">
        <DefaultTabs
          tabConfiguration={tabConfiguration}
          handleTabSelect={this.handleTabClick}
          selectedIndex={selectedTabIndex}
        />
      </div>
    );
  }
}

export default DomeCamTabs;
