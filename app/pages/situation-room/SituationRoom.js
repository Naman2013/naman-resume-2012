import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SocialSidebar from '../../components/pulse/sidebar/social-sidebar';
import Header from '../../components/situation-room/Header';
import SituationVideoViewer from '../../components/situation-room/SituationVideoViewer';
import CommunityMashup from '../../components/situation-room/CommunityMashup';
import MissionAd from '../../components/missions/mission-ad';
import { fetchLiveShowInfo } from '../../modules/live-shows/live-shows-actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchLiveShowInfo,
  }, dispatch),
});

const mapStateToProps = ({ countdown, liveShows }, ownProps) => ({
  showId: ownProps.routeParams.showId,
  upcomingEventEventId: countdown.activeOrUpcomingEvent.eventId,
  currentLiveShow: liveShows.liveShowsResponse,
});

@connect(mapStateToProps, mapDispatchToProps)
class SituationRoom extends Component {
  componentWillMount() {
    const { showId } = this.props;
    if (showId) {
      this.fetchEventInformation(showId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { showId, upcomingEventEventId } = this.props;
    if (showId) {
      return;
    }

    if (nextProps.upcomingEventEventId !== upcomingEventEventId) {
      this.fetchEventInformation(nextProps.upcomingEventEventId);
    }
  }

  fetchEventInformation(eventId) {
    this.props.actions.fetchLiveShowInfo(eventId);
  }

  render() {
    const { currentLiveShow } = this.props;
    return (
      <section className="clearfix live">

        <div className="col-md-12">
          <Header
            videoInProgress={currentLiveShow.inProgressFlag}
          />
        </div>

        <div className="col-md-9 nopadding">
          <SituationVideoViewer
            videoInProgress={currentLiveShow.inProgressFlag}
            videoEmbedCode={currentLiveShow.embedCode}
            eventTitle={currentLiveShow.title}
            hasSponsor={currentLiveShow.sponsorInformation.SponsorFlag}
            sponsorLogoURL={currentLiveShow.sponsorInformation.SponsorLogoURL}
            sponsorLinkURL={currentLiveShow.sponsorInformation.SponsorLinkURL}

            additionalFeeds={currentLiveShow.additionalFeeds}
            starShareAvailable={currentLiveShow.canStarShare}
            initialStreamCode={currentLiveShow.showStreamCode}
            initialStreamURL={currentLiveShow.showStreamURL}

            hasAdditionalFeeds={currentLiveShow.hasAdditionalFeeds}
          />

          <CommunityMashup
            hasSocialFlow={currentLiveShow.hasSocialFlow}
            hasPerspectives={currentLiveShow.hasPerspectives}
            hasUpcomingShows={currentLiveShow.hasUpcomingShows}
            hasRecommends={currentLiveShow.hasRecommends}
          />
        </div>

        <div className="col-md-3">
          <MissionAd />
          {/* <SocialSidebar /> */}
        </div>

      </section>
    );
  }
}

SituationRoom.defaultProps = {
  showId: null,
  upcomingEventEventId: null,
};

SituationRoom.propTypes = {
  showId: PropTypes.string,
  upcomingEventEventId: PropTypes.number,
  currentLiveShow: PropTypes.shape({
    hasSocialFlow: PropTypes.bool.isRequired,
    hasPerspectives: PropTypes.bool.isRequired,
    hasUpcomingShows: PropTypes.bool.isRequired,
    hasRecommends: PropTypes.bool.isRequired,
    hasAdditionalFeeds: PropTypes.bool.isRequired,

    embedCode: PropTypes.string,
    apiError: PropTypes.bool,
    title: PropTypes.string,
    mode: PropTypes.string,
    inProgressFlag: PropTypes.bool,
    expires: PropTypes.number,
    serverTime: PropTypes.number,
    sponsorInformation: PropTypes.shape({
      SponsorFlag: PropTypes.number,
      SponsorLogoURL: PropTypes.string,
      SponsorLinkURL: PropTypes.string,
    }),
    twitterLink: PropTypes.string,
    additionalFeeds: PropTypes.array,
  }),
};

export default SituationRoom;
