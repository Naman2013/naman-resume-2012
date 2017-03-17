import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer } from 'redux-form';
import activeTelescopeMissions from './active-telescope-missions/active-telescope-missions-reducer';
import announcementBanner from './Announcement-Banner';
import appConfig from './app-config/reducer';
import authorization from './authorization/reducer';
import avatar from './avatar/reducer';
import bestPosts from './best-of-slooh/get-best-reducer';
import browseByPopularObjects from './browse-popular-objects/reducer';
import catalog from './catalog/get-catalog-reducer';
import communityContent from './community-content/get-community-content-reducer';
import communityObjectContent from './community-content/get-object-content-reducer';
import communityShowContent from './community-content/get-show-content-reducer';
import contactForm from './Contact';
import countdown from './CountdownModule';
import currentMission from './current-mission/get-current-mission-reducer';
import dashboard from './dashboard/reducer';
import discussionsForums from './discussions-forums/reducer';
import discussionsReplies from './discussions-replies/reducer';
import discussionsThread from './discussions-thread/reducer';
import discussionsTopics from './discussions-topics/reducer';
import eventInfo from './event-info/reducer';
import homeContent from './home-content/reducer';
import latestPosts from './pulse/get-latest-posts-reducer';
import liveShows from './live-shows/live-shows-reducer';
import login from './Login';
import mashupSettings from './mashup-settings/get-mashup-reducer';
import menu from './menu/reducer';
import missions from './Missions';
import missionSlotDates from './mission-slots-by-telescope/mission-slot-dates-reducer';
import missionSlotsByTelescope from './mission-slots-by-telescope/mission-slots-by-telescope-reducer';
import myPictures from './my-pictures/reducer';
import objectPostList from './object-post-list/reducer';
import objectTypeList from './object-type-list/reducer';
import otherFeaturedObjects from './other-featured-objects/reducer';
import piggyback from './Piggyback';
import post from './pulse/get-post-reducer';
import tags from './tag-management/Tags';
import telescopeOverview from './Telescope-Overview';
import telescopeSlots from './grab-telescope-slot/reducer';
import tierLimits from './tier-limits/reducer';
import upcomingEvents from './upcoming-events/upcoming-events-reducer';
import user from './User';
import usersUpcomingMission from './Users-Upcoming-Missions';

export default combineReducers({
  routing: routerReducer,
  form: reducer,
  activeTelescopeMissions,
  announcementBanner,
  appConfig,
  authorization,
  avatar,
  bestPosts,
  browseByPopularObjects,
  catalog,
  communityContent,
  communityObjectContent,
  communityShowContent,
  contactForm,
  countdown,
  currentMission,
  dashboard,
  discussionsForums,
  discussionsReplies,
  discussionsThread,
  discussionsTopics,
  eventInfo,
  homeContent,
  latestPosts,
  liveShows,
  login,
  mashupSettings,
  menu,
  missions,
  missionSlotDates,
  missionSlotsByTelescope,
  myPictures,
  objectPostList,
  objectTypeList,
  otherFeaturedObjects,
  piggyback,
  post,
  tags,
  telescopeOverview,
  telescopeSlots,
  tierLimits,
  upcomingEvents,
  user,
  usersUpcomingMission,
});
