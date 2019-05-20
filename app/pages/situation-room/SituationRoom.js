import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/situation-room/Header';
import SituationVideoViewer from '../../components/situation-room/SituationVideoViewer';
import CommunityMashup from '../../components/situation-room/CommunityMashup';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import GoogleOutOfPageAd from '../../components/common/google-ads/GoogleOutOfPageAd';
import { fetchEvents } from '../../modules/upcoming-events/upcoming-events-actions';
import {
  fetchSituationRoom,
  fetchEventsAndSituationRoom,
} from '../../modules/SituationRoom';
import { previousShows } from '../../services/shows/previous-shows';
import { upcomingShows } from '../../services/shows/upcoming-shows';
import SponsoredBy from '../../components/common/sponsored-by';

import s from './SituationRoom.scss';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchEvents,
      fetchSituationRoom,
      fetchEventsAndSituationRoom,
    },
    dispatch
  ),
});

const mapStateToProps = (
  { user, upcomingEvents, liveShows, communityShowContent },
  ownProps
) => ({
  showId: ownProps.routeParams.showId,
  upcomingEventEventId: upcomingEvents.nextEvent.eventId,
  upcomingEventStartTime: upcomingEvents.nextEvent.eventStart,
  eventEndTime: upcomingEvents.nextEvent.eventEnd,
  eventIsLive: upcomingEvents.nextEvent.eventIsLive,
  currentLiveShow: liveShows.liveShowsResponse,
  communityPosts: communityShowContent.resultBody.posts,
  user,
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class SituationRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingShowsList: [],
      previousShowsList: [],
    };

    previousShows({
      page: 1,
      count: 4,
    }).then(res => {
      this.setState({
        previousShowsList: res.data.eventList,
      });
    });

    upcomingShows({
      page: 1,
      count: 4,
    }).then(res => {
      this.setState({
        upcomingShowsList: res.data.eventList,
      });
    });
  }

  componentWillMount() {
    this.props.actions.fetchEventsAndSituationRoom();
  }

  render() {
    const { user, currentLiveShow, communityPosts, eventIsLive } = this.props;
    const { upcomingShowsList, previousShowsList } = this.state;
    const { apiError } = currentLiveShow;

    if (apiError) {
      return null;
    }

    return (
      <section className={`${s.situationRoom} clearfix`}>
        {user && user.at == 9 && (
          <GoogleOutOfPageAd
            adURL={'/5626790/HP_Pop-up'}
            targetDivID={'div-gpt-ad-1516029782692-0'}
          />
        )}
        <div className="col-md-12">
          <Header videoInProgress={currentLiveShow.inProgressFlag} />
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
            eventIconURL={currentLiveShow.EventIconUrl}
            hasAdditionalFeeds={currentLiveShow.hasAdditionalFeeds}
          />

          {/** TODO: implement details once SSE is considered
              <EventDetails />
            */}

          <CommunityMashup
            hasSocialFlow={currentLiveShow.hasSocialFlow}
            hasPerspectives={currentLiveShow.hasPerspectives}
            hasUpcomingShows={currentLiveShow.hasUpcomingShows}
            hasRecentShows={currentLiveShow.hasRecentShows}
            hasRecommends={currentLiveShow.hasRecommends}
            communityPosts={communityPosts}
            upcomingShows={upcomingShowsList}
            recentShows={previousShowsList}
            colNum="6"
            recommends={currentLiveShow.recommends}
          />
        </div>

        <div className="col-md-3">
          {currentLiveShow.sponsorInformation.SponsorFlag ? (
            <SponsoredBy
              sponsorLogoURL={currentLiveShow.sponsorInformation.SponsorLogoURL}
              sponsorLinkURL={currentLiveShow.sponsorInformation.SponsorLinkURL}
            />
          ) : null}
          <GoogleAd
            adURL={'/5626790/SituationRoom'}
            adWidth={300}
            adHeight={600}
            targetDivID={'div-gpt-ad-1495111054219-0'}
          />
        </div>
      </section>
    );
  }
}

SituationRoom.defaultProps = {
  eventIsLive: false,
  showId: null,
  upcomingEventEventId: null,
  hasSponsor: false,
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
  communityPosts: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
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
