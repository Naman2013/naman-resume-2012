import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer } from 'redux-form';
import about from './about/reducer';
import activeTelescopeMissions from './active-telescope-missions/active-telescope-missions-reducer';
import audioPlayer from './get-audio-player/reducer';
import authorPostsLayout from './author-posts-page-layout/reducer';
import authorContent from './author-content/reducer';
import adStats from './ad-management/ad-stats';
import announcementBanner from './Announcement-Banner';
import appConfig from './app-config/reducer';
import authorization from './authorization/reducer';
import avatar from './avatar/reducer';
import bestPosts from './best-of-slooh/get-best-reducer';
import browseByPopularObjects from './browse-popular-objects/reducer';
import browseTaggedData from './browse-tagged-data/reducer';
import catalog from './catalog/get-catalog-reducer';
import communityContent from './community-content/get-community-content-reducer';
import communityObjectContent from './community-content/community-object-content-reducer';
import communityShowContent from './community-content/get-show-content-reducer';
import contactForm from './Contact';
import countdown from './CountdownModule';
import currentMission from './current-mission/get-current-mission-reducer';
import dashboard from './dashboard/reducer';
import discussionsForums from './discussions-forums/reducer';
import discussionsNewThread from './discussions-new-thread/reducer';
import discussionsReplies from './discussions-replies/reducer';
import discussionsSearch from './discussions-search/reducer';
import discussionsThread from './discussions-thread/reducer';
import discussionsTopics from './discussions-topics/reducer';
import eventInfo from './event-info/reducer';
import guardian from './guardian/reducer';
import homeContent from './home-content/reducer';
import illuminationsPosts from './pulse/get-latest-posts-reducer';
import liveShows from './live-shows/live-shows-reducer';
import login from './Login';
import mashupSettings from './mashup-settings/get-mashup-reducer';
import menu from './menu/reducer';
import missions from './Missions';
import missionSlotDates from './mission-slots-by-telescope/mission-slot-dates-reducer';
import missionSlotsByTelescope from './mission-slots-by-telescope/mission-slots-by-telescope-reducer';
import myPictures from './my-pictures/reducer';
import myPicturesImageDetails from './my-pictures-image-details/reducer';
import myPicturesFilters from './my-pictures-filters/reducer';
import myPicturesVerifyOwner from './my-pictures-verify-owner/reducer';
import galleries from './my-pictures-galleries/reducer';
import userPublicGalleries from './my-pictures-user-public-galleries/reducer';
import galleryPictures from './my-pictures-gallery-pictures/reducer';
import galleryActions from './my-pictures-gallery-actions/reducer';
import objectDetails from './object-details/reducer';
import objectPostList from './object-post-list/reducer';
import objectTypeList from './object-type-list/reducer';
import otherFeaturedObjects from './other-featured-objects/reducer';
import pageLevelMetaContent from './pageLevelMetaContent/seo-reducer';
import piggyback from './Piggyback';
import post from './pulse/get-post-reducer';
import starshareCamera from './starshare-camera/starshare-camera-reducer';
import shareMemberPhoto from './share-member-photo/reducer';
import sharedMemberPhotos from './get-shared-member-photos/reducer';
import tags from './tag-management/Tags';
import telescopeDetails from './telescope-details/reducer';
import telescopeOverview from './Telescope-Overview';
import telescopeSlots from './grab-telescope-slot/reducer';
import tierLimits from './tier-limits/reducer';
import upcomingEvents from './upcoming-events/upcoming-events-reducer';
import user from './User';
import usersUpcomingMission from './Users-Upcoming-Missions';
import isLanding from './landing/reducer';
import videoViewerBrowser from './browse-video-viewer/reducer';
import videoViewerShow from './show-video-viewer/reducer';

export default combineReducers({
  routing: routerReducer,
  form: reducer,
  about,
  activeTelescopeMissions,
  adStats,
  announcementBanner,
  appConfig,
  audioPlayer,
  authorization,
  authorContent,
  authorPostsLayout,
  avatar,
  bestPosts,
  browseByPopularObjects,
  browseTaggedData,
  catalog,
  communityContent,
  communityObjectContent,
  communityShowContent,
  contactForm,
  countdown,
  currentMission,
  dashboard,
  discussionsForums,
  discussionsNewThread,
  discussionsReplies,
  discussionsSearch,
  discussionsThread,
  discussionsTopics,
  eventInfo,
  guardian,
  homeContent,
  illuminationsPosts,
  liveShows,
  login,
  mashupSettings,
  menu,
  missions,
  missionSlotDates,
  missionSlotsByTelescope,
  myPictures,
  myPicturesImageDetails,
  myPicturesFilters,
  myPicturesVerifyOwner,
  userPublicGalleries,
  galleries,
  galleryActions,
  galleryPictures,
  objectDetails,
  objectPostList,
  objectTypeList,
  otherFeaturedObjects,
  pageLevelMetaContent,
  piggyback,
  post,
  /* EK 8/9/17 registration is closed      roadtripRegistration, */
  shareMemberPhoto,
  sharedMemberPhotos,
  starshareCamera,
  tags,
  telescopeDetails,
  telescopeOverview,
  telescopeSlots,
  tierLimits,
  upcomingEvents,
  user,
  usersUpcomingMission,
  isLanding,
  videoViewerBrowser,
  videoViewerShow,
});
