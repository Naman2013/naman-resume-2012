import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { ACTION } from 'app/modules/about/reducer';
import {
  makeActiveSubSectionSelector,
  makeSubSectionDataSelector,
} from 'app/modules/about/selectors';
import { AboutSection } from 'app/modules/about/components/about-section';

const mapStateToProps = (state: any, props: any) => ({
  sectionData: state.about.aboutSloohSections[props.sectionTag] || {},
  activeSubSection: makeActiveSubSectionSelector()(state),
  subSectionData: makeSubSectionDataSelector()(state),
});

const mapDispatchToProps = {
  getSectionData: ACTION.getSectionData,
  getSubSectionData: ACTION.getSubSectionData,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AboutSection);
