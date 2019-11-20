import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getImageorderingModule,
  setImageorderingModule,
} from 'app/modules/quests/thunks';
import { makeQuestsStepDataSelector } from 'app/modules/quests/selectors';
import { Imageordering } from 'app/modules/quests/components/quest-modules/imageordering';

const mapStateToProps = (state: any, props: any) => ({
  stepData: makeQuestsStepDataSelector()(state),
  imageorderingModule: state.quests.imageorderingModules[props.moduleId] || {},
});

const mapDispatchToProps = {
  getImageorderingModule,
  setImageorderingModule,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Imageordering);
