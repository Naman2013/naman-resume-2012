import { Slooh1000 } from 'app/modules/missions/components/slooh-1000';
import { makeBySlooh1000CategoryListSelector } from 'app/modules/missions/selectors';
import { getCategoryList } from 'app/modules/missions/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  categoryList: makeBySlooh1000CategoryListSelector(),
});

const mapDispatchToProps = {
  getCategoryList,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Slooh1000);
