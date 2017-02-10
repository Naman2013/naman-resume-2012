import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer } from 'redux-form';
import user from './User';
import login from './Login';
import missions from './Missions';
import countdown from './CountdownModule';
import telescopeOverview from './Telescope-Overview';
import announcementBanner from './Announcement-Banner';
import tags from './tag-management/Tags';
import usersUpcomingMission from './Users-Upcoming-Missions';
import piggyback from './Piggyback';
import missionSlotDates from './mission-slots-by-telescope/mission-slot-dates-reducer';
import missionSlotsByTelescope from './mission-slots-by-telescope/mission-slots-by-telescope-reducer';
import currentMission from './current-mission/get-current-mission-reducer';
import activeTelescopeMissions from './active-telescope-missions/active-telescope-missions-reducer';
import catalog from './catalog/get-catalog-reducer';
import communityObjectContent from './community-content/get-object-content-reducer';
import communityContent from './community-content/get-community-content-reducer';
import telescopeSlots from './grab-telescope-slot/reducer';
import latestPosts from './pulse/get-latest-posts-reducer';
import post from './pulse/get-post-reducer';
import bestPosts from './best-of-slooh/get-best-reducer';
import objectTypeList from './object-type-list/reducer';
import myPictures from './my-pictures/reducer';
import browseByPopularObjects from './browse-popular-objects/reducer';
import menu from './menu/reducer';
import objectPostList from './object-post-list/reducer';
import discussionsThread from './discussions-thread/reducer';
import discussionsReplies from './discussions-replies/reducer';

export default combineReducers({
  routing: routerReducer,
  form: reducer,
  countdown,
  menu,
  user,
  login,
  missions,
  telescopeOverview,
  announcementBanner,
  tags,
  usersUpcomingMission,
  piggyback,
  missionSlotDates,
  missionSlotsByTelescope,
  currentMission,
  activeTelescopeMissions,
  catalog,
  communityObjectContent,
  communityContent,
  telescopeSlots,
  latestPosts,
  post,
  bestPosts,
  myPictures,
  objectTypeList,
  objectPostList,
  browseByPopularObjects,
  discussionsThread,
  discussionsReplies,
});
