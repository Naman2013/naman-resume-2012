import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventHero from '../../components/event-details/EventHero';
import EventDescription from '../../components/event-details/EventDescription';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import EventHosts from '../../components/event-details/EventHosts';
import MoreAboutObject from '../../components/common/MoreAboutObject/MoreAboutObject';
import PulseRecommended from '../../components/pulse/sidebar/pulse-recommends';
import s from './EventDetails.scss';
import * as eventInfoActions from '../../modules/event-info/actions';

const { func, object } = PropTypes;
class EventDetails extends Component {

  componentWillMount() {
    const { fetchEventInfo, routeParams: { showId } } = this.props;
    fetchEventInfo({
      showId
    });
  }

  render() {
    const { eventContent, likeEvent, routeParams: { showId } } = this.props;
    return (
      <div className={s.eventDetailsRoot}>
        <AnnouncementBanner />
        <EventHero eventContent={eventContent} />
        <section className="row">
          <section className="col-md-8">
            <EventDescription
              eventContent={eventContent}
              likeEvent={likeEvent}
              showId={showId}
            />
            <EventHosts hosts={eventContent.hosts} />
          </section>
          <aside className="col-md-4">
            {/* eventContent.hasReserve && <PulseRecommended /> */}
            {eventContent.hasMoreAbout && <MoreAboutObject
              slugLookupId={eventContent.moreAbout}
            />}
          </aside>
        </section>
      </div>
    );
  }
}

EventDetails.propTypes = {
  eventContent: object.isRequired,
  fetchEventInfo: func.isRequired,
  likeEvent: func.isRequired,
};

const mapStateToProps = ({ eventInfo }) => ({
  ...eventInfo,
});
const mapDispatchToProps = dispatch => (bindActionCreators(eventInfoActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
