import { AboutSection } from 'app/modules/about/components/about-section';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSectionDataSelector,
  makeSubSectionDataSelector,
} from 'app/modules/about/selectors';
import { ACTION } from 'app/modules/about/reducer';

const mapStateToProps = createStructuredSelector({
  sectionData: makeSectionDataSelector(),
  subSectionData: makeSubSectionDataSelector(),
});

const mapDispatchToProps = {
  getSubSectionDataAction: ACTION.getSubSectionData,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AboutSection);
