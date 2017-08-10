import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventHero from '../../components/event-details/EventHero';
import EventDescription from '../../components/event-details/EventDescription';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import EventHosts from '../../components/event-details/EventHosts';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import s from './EventDetails.scss';
import { fetchEventInfo } from '../../modules/event-info/actions';
import SponsoredBy from '../../components/common/sponsored-by';

const { func, object } = PropTypes;
class EventDetails extends Component {
  constructor(props) {
    super(props);
    const { fetchEventInfo, routeParams: { showId } } = this.props;
    if (showId) {
      fetchEventInfo({
        showId,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchEventInfo, routeParams: { showId } } = this.props;
    const { routeParams: { showId: nextShowId } } = nextProps;

    if (!showId && (this.props.nextEvent.eventId !== nextProps.nextEvent.eventId)) {
      if (nextProps.nextEvent.eventId !== 0) {
        fetchEventInfo({
          showId: nextProps.nextEvent.eventId
        });
      }
    }

    if (showId !== nextShowId) {
      fetchEventInfo({
        showId: nextShowId
      });
    }
  }

  render() {
    const {
      eventContent,
      routeParams: { showId },
      fetching,
      moreAboutObject,
      user,
     } = this.props;

    const { recommends, title } = eventContent;

    return (
      <div className={s.eventDetailsRoot}>
        {fetching && <GenericLoadingBox />}
        {!fetching && !title && <GenericLoadingBox text="Details about this event are currently unavailable." />}
        {!fetching && title && <div>
          <EventHero eventContent={eventContent} />
          <section className="row">
            <section className="col-md-8">
              <EventDescription
                eventContent={eventContent}
                showId={showId}
              />
              <EventHosts hosts={eventContent.hosts} />
            </section>
            <aside className="sideBar col-md-4">



              {
                eventContent.sponsorInformation &&  eventContent.sponsorInformation.SponsorFlag ?
                    <SponsoredBy
                        sponsorLogoURL={eventContent.sponsorInformation.SponsorLogoURL}
                        sponsorLinkURL={eventContent.sponsorInformation.SponsorLinkURL}
                        />

                    : null
              }


              <GoogleAd
                adURL={'/5626790/EventPages'}
                adWidth={300}
                adHeight={250}
                targetDivID={'div-gpt-ad-1495118105329-0'}
              />
              {
                recommends.length > 0 ?
                  <SloohRecommends
                    title="Reserve A Mission Now"
                    subTitle={`See ${title} through Slooh's Telescopes`}
                    user={user}
                    recommendations={recommends}
                  /> : null
              }

              {(eventContent.hasMoreAbout &&
                moreAboutObject.itemList.length > 0) &&
                  <PulsePopular
                    tag={moreAboutObject.sectionObjectTitle}
                    list={moreAboutObject.itemList}
                    subtitle={moreAboutObject.sectionSubtitle}
                    title={moreAboutObject.sectionTitle}
                    slugLookupId={eventContent.moreAbout}
                  />
              }
            </aside>
          </section>
        </div>}
      </div>
    );
  }
}

EventDetails.propTypes = {
  eventContent: object.isRequired,
  fetchEventInfo: func.isRequired,
};

const mapStateToProps = ({ eventInfo, post, user, upcomingEvents }) => ({
  ...eventInfo,
  user,
  moreAboutObject: post.moreAboutObject,
  nextEvent: upcomingEvents.nextEvent,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchEventInfo
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
