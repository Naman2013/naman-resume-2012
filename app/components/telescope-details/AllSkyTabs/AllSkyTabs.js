import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllSkyAction } from '../../../modules/Telescope-Overview';
import generateAllSkyTabConfiguration from './generate-tab-configuration';
import DefaultTabs from '../../Tabs';
import './allsky-tabs.scss';

const mapStateToProps = ({ telescopeDetails }) => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchAllSkyAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class AllSkyTabs extends Component {
  state = {
    selectedTabIndex: 0,
  };

  constructor(props) {
    super(props);
  }

  handleTabClick = (selectedTabIndex) => {
    /* always refesh the first tab, as the first tab object doesn't know how to load itself due to multi-api call issue */
    switch(selectedTabIndex) {
        case 0:
          const { obsId, AllskyWidgetId } = this.props;
          this.props.actions.fetchAllSkyAction({
            obsId: obsId,
            AllskyWidgetId: AllskyWidgetId,
          });
          break;
    }

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
