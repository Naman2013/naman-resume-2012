import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDomeCamAction } from '../../../modules/Telescope-Overview';
import generateDomecamTabConfiguration from './generate-tab-configuration';
import DefaultTabs from '../../Tabs';
import './domecam-tabs.scss';

const mapStateToProps = ({ telescopeDetails }) => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchDomeCamAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class DomeCamTabs extends Component {
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
          const { obsId, DomecamWidgetId } = this.props;
          this.props.actions.fetchDomeCamAction({
            obsId: obsId,
            DomecamWidgetId: DomecamWidgetId,
          });
          break;
    }

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
