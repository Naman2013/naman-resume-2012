import { connect } from 'react-redux';
import { compose } from 'redux';
import DiscussionsCard from './DiscussionsCard';
import { setPublicCardStatusAction } from '../../../modules/upcoming-events/upcoming-events-actions';

const mapDispatchToProps = {
    setPublicCardStatusAction
}

export default compose(connect(null, mapDispatchToProps))(DiscussionsCard);
