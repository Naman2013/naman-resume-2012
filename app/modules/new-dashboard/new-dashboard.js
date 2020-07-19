import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
    fetchStarPartyDataAction,
    getUserGravityDataAction,
    getMyPicturesDataAction,
    getDashboardFeaturedObjectsDataAction,
    getMyClubListDataAction,
    getBookmarkListDataAction,
    getPrivateProfileDataAction,
  } from './actions';

import { makeStarPartyListSelector,
    makeUserGravityStatusSelector ,
    makePhotoHubSelector,
    makeDashboardFeaturedObjectsSelector,
    makeMyClubListSelector,
    makeBookmarkListSelector,
    makePrivateProfileSelector,
    makeNewDashFetchingSelector,
  } from './selectors';
  
import { NewDashboard } from './index';
import { makeIsFetchingSelector } from '../account-settings/selectors';

const mapStateToProps = createStructuredSelector({
    upcomingStarPartyList: makeStarPartyListSelector(),
    userGravityStatus: makeUserGravityStatusSelector(),
    photoHub: makePhotoHubSelector(),
    dashboardFeaturedObjects: makeDashboardFeaturedObjectsSelector(),
    myClubList: makeMyClubListSelector(),
    bookmarkList: makeBookmarkListSelector(),
    privateProfile: makePrivateProfileSelector(),
    isFetching: makeNewDashFetchingSelector(),
});

const mapDispatchToProps = {
    fetchStarPartyDataAction, 
    getUserGravityDataAction,
    getMyPicturesDataAction,
    getDashboardFeaturedObjectsDataAction,
    getMyClubListDataAction,
    getBookmarkListDataAction,
    getPrivateProfileDataAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NewDashboard);