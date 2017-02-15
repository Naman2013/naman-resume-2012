import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SocialSidebar from '../../components/pulse/sidebar/social-sidebar';
import Header from '../../components/situation-room/Header';
import LiveSocial from '../../components/situation-room/live-social';
import LiveClub from '../../components/situation-room/live-club';
import VideoFeed from '../../components/situation-room/VideoFeed';
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
class Live extends Component {
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
          <LiveSocial />
          <LiveClub />
          <VideoFeed
            videoInProgress={currentLiveShow.inProgressFlag}
            videoEmbedCode={currentLiveShow.embedCode}
            eventTitle={currentLiveShow.title}
            hasSponsor={currentLiveShow.sponsorInformation.SponsorFlag}
            sponsorLogoURL={currentLiveShow.sponsorInformation.SponsorLogoURL}
            sponsorLinkURL={currentLiveShow.sponsorInformation.SponsorLinkURL}
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

Live.defaultProps = {
  showId: null,
  upcomingEventEventId: null,
};

Live.propTypes = {
  showId: PropTypes.string,
  upcomingEventEventId: PropTypes.number,
  currentLiveShow: PropTypes.shape({
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

export default Live;
