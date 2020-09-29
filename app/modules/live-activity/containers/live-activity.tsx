import { connect } from 'react-redux';
import { compose } from 'redux';
import { LiveActivity } from '../components/live-activity/index';
import { setPublicCardStatusAction } from '../../upcoming-events/upcoming-events-actions';

const mapDispatchToProps = {
  setPublicCardStatusAction
}

const mapStateToProps = (state: any)=>({
  showPublicCard: state.upcomingEvents.showPublicCard,
  customerUUID: state.upcomingEvents. customerUUID,
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(LiveActivity);
