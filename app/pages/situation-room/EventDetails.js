import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventHero from '../../components/event-details/EventHero';
import EventDescription from '../../components/event-details/EventDescription';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import EventHosts from '../../components/event-details/EventHosts';
import PulseRecommended from '../../components/pulse/sidebar/pulse-recommends';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
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

  componentWillReceiveProps(nextProps) {
    const { fetchEventInfo, routeParams: { showId } } = this.props;
    const { routeParams: { showId: nextShowId } } = nextProps;

    if (showId !== nextShowId) {
      fetchEventInfo({
        showId: nextShowId
      });
    }
  }

  render() {
    const { eventContent, likeEvent, routeParams: { showId }, fetching, moreAboutObject } = this.props;

    return (
      <div className={s.eventDetailsRoot}>
        {fetching && <GenericLoadingBox />}
        {!fetching && <div>
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
  likeEvent: func.isRequired,
};

const mapStateToProps = ({ eventInfo, post }) => ({
  ...eventInfo,
  moreAboutObject: post.moreAboutObject,
});
const mapDispatchToProps = dispatch => (bindActionCreators(eventInfoActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
