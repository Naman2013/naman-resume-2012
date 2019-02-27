import { Slooh1000 } from 'app/modules/missions/components/slooh-1000';
import {
  makeBySlooh1000CategoryListSelectOptsSelector,
  makeBySlooh1000CategoryListSelector,
} from 'app/modules/missions/selectors';
import { getCategoryList } from 'app/modules/missions/thunks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ACTION } from '../reducer';

const mapStateToProps = createStructuredSelector({
  categoryList: makeBySlooh1000CategoryListSelector(),
  categoryListOpts: makeBySlooh1000CategoryListSelectOptsSelector(),
});

const mapDispatchToProps = {
  getCategoryList,
  setCategory: ACTION.setCategory(),
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Slooh1000);
