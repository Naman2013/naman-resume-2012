import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import SocialSidebar from '../../components/pulse/sidebar/social-sidebar';
import Header from '../../components/situation-room/Header';
import SituationVideoViewer from '../../components/situation-room/SituationVideoViewer';
import EventDetails from '../../components/situation-room/EventDetails';
import CommunityMashup from '../../components/situation-room/CommunityMashup';
import MissionAd from '../../components/missions/mission-ad';
import { fetchEvents } from '../../modules/upcoming-events/upcoming-events-actions';
import { fetchSituationRoom, fetchEventsAndSituationRoom } from '../../modules/SituationRoom';
import s from './SituationRoom.scss';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchEvents,
    fetchSituationRoom,
    fetchEventsAndSituationRoom,
  }, dispatch),
});

const mapStateToProps = ({ upcomingEvents, liveShows, communityShowContent }, ownProps) => ({
  showId: ownProps.routeParams.showId,
  upcomingEventEventId: upcomingEvents.nextEvent.eventId,
  upcomingEventStartTime: upcomingEvents.nextEvent.eventStart,
  eventEndTime: upcomingEvents.nextEvent.eventEnd,
  eventIsLive: upcomingEvents.nextEvent.eventIsLive,
  currentLiveShow: liveShows.liveShowsResponse,
  communityPosts: communityShowContent.resultBody.posts,
});

@connect(mapStateToProps, mapDispatchToProps)
class SituationRoom extends Component {
  componentWillMount() {
    this.props.actions.fetchEventsAndSituationRoom();
  }

  render() {
    const { currentLiveShow, communityPosts, eventIsLive } = this.props;

    return (
      <section className={`${s.situationRoom} clearfix`}>

        <div className="col-md-12">
          <Header
            videoInProgress={currentLiveShow.inProgressFlag}
          />
        </div>

        <div className="col-md-9 nopadding">
          <SituationVideoViewer
            videoInProgress={eventIsLive}
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

          {
            /** TODO: implement details once SSE is considered
              <EventDetails />
            */
          }

          <CommunityMashup
            hasSocialFlow={currentLiveShow.hasSocialFlow}
            hasPerspectives={currentLiveShow.hasPerspectives}
            hasUpcomingShows={currentLiveShow.hasUpcomingShows}
            hasRecommends={currentLiveShow.hasRecommends}
            communityPosts={communityPosts}
            recommends={currentLiveShow.recommends}
          />
        </div>

        <div className="col-md-3">
          <MissionAd size="300x600" />
          {/* <SocialSidebar /> */}
        </div>

      </section>
    );
  }
}

SituationRoom.defaultProps = {
  eventIsLive: false,
  showId: null,
  upcomingEventEventId: null,
  communityPosts: [],
  currentLiveShow: {
    recommends: [],
    hasSocialFlow: false,
    hasPerspectives: false,
    hasUpcomingShows: false,
    hasRecommends: false,
    hasAdditionalFeeds: false,
  },
};

SituationRoom.propTypes = {
  eventIsLive: PropTypes.bool,
  showId: PropTypes.string,
  upcomingEventEventId: PropTypes.number,
  communityPosts: PropTypes.arrayOf(PropTypes.shape({
    postId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  currentLiveShow: PropTypes.shape({
    hasSocialFlow: PropTypes.bool.isRequired,
    hasPerspectives: PropTypes.bool.isRequired,
    hasUpcomingShows: PropTypes.bool.isRequired,
    hasRecommends: PropTypes.bool.isRequired,
    hasAdditionalFeeds: PropTypes.bool.isRequired,

    recommends: PropTypes.arrayOf(PropTypes.number.isRequired),

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
