import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getObservatoryList } from '../modules/Telescope-Overview';

import AnnouncementBanner from '../components/common/announcement-banner';
import TelescopeFilterNav from '../components/telescope-overview/telescope-filter-nav';
import ObservatoryHero from '../components/telescope-overview/observatory-hero';
import TelescopeCards from '../components/telescope-overview/telescope-cards/telescope-cards';


function mapStateToProps(state) {
  console.log(state);
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getObservatoryList
    }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class TelescopeOverview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayBanner: true
    };
  }

  componentDidMount() {
    this.props.actions.getObservatoryList();
  }

  closeBanner() {
    this.setState({
      displayBanner: false
    });
  }

  render() {
    return(
      <div>

        <AnnouncementBanner
          display={this.state.displayBanner}
          closeBanner={this.closeBanner.bind(this)} />

        <TelescopeFilterNav />

        <ObservatoryHero />

        <TelescopeCards />

      </div>
    );
  }
}

export default TelescopeOverview;
