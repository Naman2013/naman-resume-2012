import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventHero from '../../components/event-details/EventHero';
import EventDescription from '../../components/event-details/EventDescription';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import EventHosts from '../../components/event-details/EventHosts';
import PulseRecommended from '../../components/pulse/sidebar/pulse-recommends';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import s from './EventDetails.scss';
import * as eventInfoActions from '../../modules/event-info/actions';

const { func, object } = PropTypes;
class EventDetails extends Component {
  constructor(props) {
    super(props);
    const { fetchEventInfo, routeParams: { showId } } = props;
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
        {!fetching && <div>
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

const mapStateToProps = ({ eventInfo, post, user }) => ({
  ...eventInfo,
  user,
  moreAboutObject: post.moreAboutObject,
});
const mapDispatchToProps = dispatch => (bindActionCreators(eventInfoActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
