import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getRichTextInputModule,
  setRichTextInputModule,
} from 'app/modules/quests/thunks';
import { makeQuestsStepDataSelector } from 'app/modules/quests/selectors';
import { Imageordering } from 'app/modules/quests/components/quest-modules/imageordering';

const mapStateToProps = (state: any, props: any) => ({
  stepData: makeQuestsStepDataSelector()(state),
  // richTextInputModule: state.quests.richTextInputModules[props.moduleId] || {},
});

const mapDispatchToProps = {
  // getRichTextInputModule,
  // setRichTextInputModule,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Imageordering);
