import React, {Component, PropTypes} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getObservatoryList,
  getCurrentObservatory,
  fetchAllWidgetsByObservatory} from '../modules/Telescope-Overview';

import AnnouncementBanner from '../components/common/announcement-banner/announcement-banner';
import TelescopeFilterNav from '../components/telescope-overview/telescope-filter-nav';
import ObservatoryHero from '../components/telescope-overview/observatory-hero';
import TelescopeCards from '../components/telescope-overview/telescope-cards/telescope-cards';

import exampleUser from '../example-api-data/example-user'

function mapStateToProps(state, ownProps) {
  return {
    user: exampleUser, // TODO: state.user,
    observatoryList: state.telescopeOverview.observatoryList,
    currentObservatoryId: ownProps.params.observatoryId,
    currentObservatory: state.telescopeOverview.currentObservatory,
    moonPhaseWidgetResult: state.telescopeOverview.moonPhaseWidgetResult,
    satelliteViewWidgetResult: state.telescopeOverview.satelliteViewWidgetResult,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getObservatoryList,
      fetchAllWidgetsByObservatory,
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

  updateObservatory() {
    this.props.actions.getObservatoryList(
      this.props.user,
      this.props.currentObservatoryId
    );
  }

  componentDidMount() {
    this.updateObservatory();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.observatoryId !== this.props.currentObservatoryId) {
      const currentObservatory =
        getCurrentObservatory(nextProps.observatoryList, nextProps.params.observatoryId);
      this.props.actions.fetchAllWidgetsByObservatory(currentObservatory);
    }
  }

  render() {
    const {observatoryList, currentObservatoryId} = this.props;
    const currentObservatory =
      getCurrentObservatory(observatoryList, currentObservatoryId);

    return(
      <div>

        <AnnouncementBanner />

        <TelescopeFilterNav
          observatoryList={this.props.observatoryList} />

        <ObservatoryHero
          moonPhaseWidgetResult={this.props.moonPhaseWidgetResult}
          satelliteViewWidgetResult={this.props.satelliteViewWidgetResult}
          {...currentObservatory} />

        <TelescopeCards
          observatory={currentObservatory}/>

      </div>
    );
  }
}

export default TelescopeOverview;
