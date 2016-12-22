import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer } from 'redux-form';
import menu from './Menu';
import user from './User';
import login from './Login';
import missions from './Missions';
import telescopeOverview from './Telescope-Overview';
import announcementBanner from './Announcement-Banner';
import tags from './tag-management/Tags';
import popularObjects from './browse-by-popular-objects/Popular-Objects';
import usersUpcomingMission from './Users-Upcoming-Missions';
import piggyback from './Piggyback';
import missionSlotDates from './mission-slots-by-telescope/mission-slot-dates-reducer';
import missionSlotsByTelescope from './mission-slots-by-telescope/mission-slots-by-telescope-reducer';
import currentMission from './current-mission/get-current-mission-reducer';
import activeTelescopeMissions from './active-telescope-missions/active-telescope-missions-reducer';
import catalog from './catalog/get-catalog-reducer';
import communityObjectContent from './community-content/get-object-content-reducer';
import publishPost from './community-content/publish-post';

export default combineReducers({
  routing: routerReducer,
  form: reducer,
  menu,
  user,
  login,
  missions,
  telescopeOverview,
  announcementBanner,
  tags,
  popularObjects,
  usersUpcomingMission,
  piggyback,
  missionSlotDates,
  missionSlotsByTelescope,
  currentMission,
  activeTelescopeMissions,
  catalog,
  communityObjectContent,
  publishPost
});
