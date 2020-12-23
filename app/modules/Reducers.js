/* eslint-disable */
import profile from 'app/modules/profile/reducer';
import askAstronomer from 'app/modules/ask-astronomer/reducers/reducer';
import imageDetails from 'app/modules/image-details/reducer';
import telescope from 'app/modules/telescope/reducer';
import storyDetails from 'app/modules/story-details/reducer';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
// v4
import logIn from 'app/modules/login/reducer';
import accountSettings from 'app/modules/account-settings/reducer';
import customerAdminTools from 'app/modules/customer-admin-tools/reducer';
import about from './about/reducer';
import activeTelescopeMissions from './active-telescope-missions/active-telescope-missions-reducer';
import adStats from './ad-management/ad-stats';
import alerts from './alerts/reducer';
import announcementBanner from './Announcement-Banner';
import appConfig from './app-config/reducer';
import astronomerDiscuss from './ask-astronomer/reducers/ask-astronomer-answer-discuss/reducer';
import astronomerAnswers from './ask-astronomer/reducers/ask-astronomer-answers/reducer';
import astronomerQuestionList from './ask-astronomer/reducers/ask-astronomer-question-list/reducer';
import astronomerQuestions from './ask-astronomer/reducers/ask-astronomer-questions/reducer';
import authorContent from './author-content/reducer';
import authorPostsLayout from './author-posts-page-layout/reducer';
import authorization from './authorization/reducer';
import avatar from './avatar/reducer';
import bestPosts from './best-of-slooh/get-best-reducer';
import browseFindData from './browse-find-data/reducer';
import browseByPopularObjects from './browse-popular-objects/reducer';
import browseTaggedData from './browse-tagged-data/reducer';
import videoViewerBrowser from './browse-video-viewer/reducer';
import catalog from './catalog/get-catalog-reducer';
import clubs from './clubs/reducer';
import communityObjectContent from './community-content/community-object-content-reducer';
import communityShowContent from './community-content/get-show-content-reducer';
import communityGroupActivity from './community-group-activity-list/reducer';
import communityGroupOverview from './community-group-overview/reducer';
import communityGroups from './community-groups/reducer';
import contactForm from './Contact';
import countdown from './CountdownModule';
import currentMission from './current-mission/get-current-mission-reducer';
import dashboard from './dashboard/reducer';
import newDashboard from './new-dashboard/reducer';
import newGuestDashboard from './new-guest-dashboard/reducer';
import discussionsForums from './discussions-forums/reducer';
import discussionsNewThread from './discussions-new-thread/reducer';
import discussionsReplies from './discussions-replies/reducer';
import discussionsSearch from './discussions-search/reducer';
import discussionsThread from './discussions-thread/reducer';
import discussionsTopics from './discussions-topics/reducer';
import eventInfo from './event-info/reducer';
import audioPlayer from './get-audio-player/reducer';
import globalNavigation from './global-navigation/reducer';
import telescopeSlots from './grab-telescope-slot/reducer';
import guardian from './guardian/reducer';
import guides from './guides/reducer';
import guideDetails from './guide-details/reducer';
import homeContent from './home-content/reducer';
import isLanding from './landing/reducer';
import liveShows from './live-shows/live-shows-reducer';
import login from './Login';
import mashupSettings from './mashup-settings/get-mashup-reducer';
import menu from './menu/reducer';
import missionSlotDates from './mission-slots-by-telescope/mission-slot-dates-reducer';
import missionSlotsByTelescope from './mission-slots-by-telescope/mission-slots-by-telescope-reducer';
import missions from './missions/reducer';
import myPicturesFilters from './my-pictures-filters/reducer';
import galleries from './my-pictures-galleries/reducer';
import galleryActions from './my-pictures-gallery-actions/reducer';
import galleryPictures from './my-pictures-gallery-pictures/reducer';
import myPicturesImageDetails from './my-pictures-image-details/reducer';
import userPublicGalleries from './my-pictures-user-public-galleries/reducer';
import myPicturesVerifyOwner from './my-pictures-verify-owner/reducer';
import myPictures from './my-pictures/reducer';
import objectDetails from './object-details/reducer';
import objectPostList from './object-post-list/reducer';
import objectTypeList from './object-type-list/reducer';
import otherFeaturedObjects from './other-featured-objects/reducer';
import pageLevelMetaContent from './pageLevelMetaContent/seo-reducer';
import piggyback from './Piggyback';
import illuminationsPosts from './pulse/get-latest-posts-reducer';
import post from './pulse/get-post-reducer';
import questDetails from './quest-details/reducer';
import quests from './quests/reducer';
import starshareCamera from './starshare-camera/starshare-camera-reducer';
import shareMemberPhoto from './share-member-photo/reducer';
import videoViewerShow from './show-video-viewer/reducer';
import sharedMemberPhotos from './get-shared-member-photos/reducer';
import shows from './shows/reducer';
import stories from './stories/reducer';
import tags from './tag-management/Tags';
import telescopeDetails from './telescope-details/reducer';
import telescopeOverview from './Telescope-Overview';
import tierLimits from './tier-limits/reducer';
import upcomingEvents from './upcoming-events/upcoming-events-reducer';
import observatoryList from './observatory-list/observatory-reducer';
import user from './User';
import usersUpcomingMission from './Users-Upcoming-Missions';
import missionDetails from './mission-details/reducer';
import galleryDetails from './gallery-details/reducer';
import photoHubs from './profile-photos/reducer';
import leaderboard from './leaderboard/reducer';
import purchaseConfirmation from './purchase-confirmation/reducer';
import pubnubChat from '../modules/pubnub-handler/reducer'


export default combineReducers({
  routing: routerReducer,
  form: reducer,
  about,
  activeTelescopeMissions,
  adStats,
  alerts,
  announcementBanner,
  appConfig,
  astronomerQuestions,
  astronomerQuestionList,
  astronomerAnswers,
  astronomerDiscuss,
  audioPlayer,
  authorization,
  authorContent,
  authorPostsLayout,
  avatar,
  bestPosts,
  browseByPopularObjects,
  browseTaggedData,
  browseFindData,
  catalog,
  clubs,
  communityGroups,
  communityGroupActivity,
  communityGroupOverview,
  communityObjectContent,
  communityShowContent,
  contactForm,
  countdown,
  currentMission,
  dashboard,
  newDashboard,
  newGuestDashboard,
  discussionsForums,
  discussionsNewThread,
  discussionsReplies,
  discussionsSearch,
  discussionsThread,
  discussionsTopics,
  eventInfo,
  galleries,
  galleryActions,
  galleryPictures,
  globalNavigation,
  guardian,
  guides,
  guideDetails,
  homeContent,
  isLanding,
  illuminationsPosts,
  liveShows,
  login,
  mashupSettings,
  menu,
  missionSlotDates,
  missionSlotsByTelescope,
  myPictures,
  myPicturesImageDetails,
  myPicturesFilters,
  myPicturesVerifyOwner,
  questDetails,
  quests,
  objectDetails,
  objectPostList,
  objectTypeList,
  otherFeaturedObjects,
  pageLevelMetaContent,
  piggyback,
  post,
  /* EK 8/9/17 registration is closed      roadtripRegistration, */
  profile,
  shareMemberPhoto,
  sharedMemberPhotos,
  starshareCamera,
  shows,
  stories,
  tags,
  telescopeDetails,
  telescopeOverview,
  telescopeSlots,
  tierLimits,
  userPublicGalleries,
  upcomingEvents,
  observatoryList,
  user,
  usersUpcomingMission,
  videoViewerBrowser,
  videoViewerShow,
  logIn,
  storyDetails,
  telescope,
  missions,
  accountSettings,
  customerAdminTools,
  missionDetails,
  imageDetails,
  galleryDetails,
  askAstronomer,
  photoHubs,
  leaderboard,
  purchaseConfirmation,
  pubnubChat,
});
