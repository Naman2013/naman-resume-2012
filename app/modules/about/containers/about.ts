import { About } from 'app/modules/about/components/about';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeAboutDataSelector } from 'app/modules/about/selectors';
import { ACTION } from 'app/modules/about/reducer';

const mapStateToProps = createStructuredSelector({
  aboutData: makeAboutDataSelector(),
});

const mapDispatchToProps = {
  getAboutDataAction: ACTION.getAboutData,
  getSectionDataAction: ACTION.getSectionData,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(About);
