import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { AnimationModule } from 'app/modules/quests/components/quest-modules/animation';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AnimationModule);
