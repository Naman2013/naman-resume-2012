import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  deleteTag,
  getTags,
  setTag,
  getMissionDetails,
} from 'app/modules/mission-details/thunks';

import MissionDetailsNew from '../components/mission-details-new';
import {
  makeMissionDetailsLoadingSelector,
  makeMissionDetailsTitleSelector,
  makeMissionDetailsIconURLSelector,
  makeMissionDetailsDateCreatedSelector,
  makeMissionDetailsImageCountSelector,
  makeMissionDetailsImageListSelector,
  makeMissionDetailsApiURLSelector,
  makeTagListSelector,
  makeTagsFetchingSelector,
  makeMissionDetailsTotalImageCountSelector,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  isFetching: makeMissionDetailsLoadingSelector(),
  missionTitle: makeMissionDetailsTitleSelector(),
  missionIconURL: makeMissionDetailsIconURLSelector(),
  missionDateCreated: makeMissionDetailsDateCreatedSelector(),
  imageCount: makeMissionDetailsImageCountSelector(),
  imageList: makeMissionDetailsImageListSelector(),
  apiURL: makeMissionDetailsApiURLSelector(),
  tagList: makeTagListSelector(),
  tagsFetching: makeTagsFetchingSelector(),
  totalCount: makeMissionDetailsTotalImageCountSelector(),
});

const mapDispatchToProps = {
  getMissionDetails,
  getTags,
  setTag,
  deleteTag,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MissionDetailsNew);
