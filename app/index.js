import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// polyfills
import 'event-source-polyfill/eventsource.min';
import './utils/manual-polyfills';

// utilities
import firePageview from './utils/ga-wrapper';

// redux store
import store from './store';

import RedirectConfirmation from './pages/redirect-confirmation/RedirectConfirmation';

// containers
import App from './containers/App';

import StaticAppContainer from './containers/static-app-container';
import Reservations from './containers/Reservations';
import SloohRecommends from './containers/SloohRecommends';
import MyPictures from './containers/MyPictures';
import ObjectList from './containers/object-post/ObjectList';

// V4 containers
import AskAstronomer from './containers/ask-astronomer/AskAstronomer';
import ObjectDetailsOverview from './containers/object-details/ObjectDetailsOverview';
import ObjectDetailsMissions from './containers/object-details/ObjectDetailsMissions';
import ObjectDetailsQuests from './containers/object-details/ObjectDetailsQuests';
import ObjectDetailsStories from './containers/object-details/ObjectDetailsStories';
import ObjectDetailsShows from './containers/object-details/ObjectDetailsShows';
import ObjectDetailsObservations from './containers/object-details/ObjectDetailsObservations';

// pages
import TelescopeOverview from './pages/telescope-overview';
import { ConnectedTelescopeDetails } from './pages/telescope-details/telescope-details';
import NewMissions from './pages/new-missions';
import ExistingMissions from './pages/existing-missions';
import ReserveByTelescope from './pages/reserve-by-telescope';
import ReserveObjects from './pages/reserve/reserve-by-objects';
import ReserveByCatalog from './pages/reserve/reserve-by-catalog';

import SituationRoom from './pages/situation-room/SituationRoom';
import EventDetails from './pages/situation-room/EventDetails';

import RecentShows from './pages/browse-video-viewer/RecentShows';
import SloohMotion from './pages/browse-video-viewer/SloohMotion';
import UpcomingShows from './pages/browse-video-viewer/UpcomingShows';

import BrowseShowsWrapper from './pages/browse-video-viewer/BrowseShowsWrapper';

import Job from './pages/about/job';
import Contact from './pages/about/contact';
import Leadership from './pages/about/leadership';
import Mission from './pages/about/mission';
import News from './pages/about/news';

import PhotoRoll from './pages/my-pictures/PhotoRoll';
import Galleries from './pages/my-pictures/Galleries';
import GalleryImages from './pages/my-pictures/GalleryImages';
import Missions from './pages/my-pictures/Missions';
import MissionImages from './pages/my-pictures/MissionImages';
import PublicGalleries from './pages/my-pictures/PublicGalleries';
import GalleryImageDetails from './pages/my-pictures/GalleryImageDetails';

import UpgradeApprentice from './pages/registration/UpgradeApprentice';
import UpgradeAstronomer from './pages/registration/UpgradeAstronomer';
import SignIn from './pages/registration/SignIn';
import Upgrade from './pages/registration/Upgrade';

import Join from './pages/registration/Join';
import JoinStep1 from './pages/registration/JoinStep1';
import JoinStep1SchoolSelection from './pages/registration/JoinStep1SchoolSelection';
import JoinStep2 from './pages/registration/JoinStep2';
import JoinStep3 from './pages/registration/JoinStep3';
import JoinByLandingPage from './pages/registration/JoinByLandingPage';
import JoinInviteByEmailStep1 from './pages/registration/JoinInviteByEmailStep1';
import JoinInviteByCodeStep1 from './pages/registration/JoinInviteByCodeStep1';
import JoinInviteByCodeStep2 from './pages/registration/JoinInviteByCodeStep2';
import Memberships from './pages/registration/Memberships';
import MembershipPlanDetailsStep from './pages/registration/MembershipPlanDetailsStep';
import ResetPassword from './pages/registration/ResetPassword';

import Notifications from './pages/settings/Notifications';
import PaymentInfo from './pages/settings/PaymentInfo';
import Profile from './pages/settings/Profile';
import SocialNetwork from './pages/settings/SocialNetwork';

import AuthorList from './containers/pulse/AuthorList';
import AuthorWrapper from './containers/pulse/AuthorWrapper';
import AuthorPostList from './pages/pulse/AuthorPostList';

import PublishPost from './pages/publish-post/publish-post';
import PulsePostList from './pages/pulse/pulse-post-list';
import PulseByObject from './pages/pulse/pulse-by-object';
import PulseSearch from './pages/pulse/pulse-search';
import ObjectPosts from './pages/object-posts/ObjectPosts';

import ObjectCategoryGuide from './containers/guides/ObjectCategoryGuide';
import SubjectGuides from './containers/guides/SubjectGuides';
import TopicGuides from './containers/guides/TopicGuides';

import Landing from './pages/landing/Landing';

import Welcome from './pages/welcome/Welcome';

import PostingGuidelines from './pages/help/PostingGuidelines';
import NewToSlooh from './pages/help/NewToSlooh';
import TelescopesAndReservations from './pages/help/TelescopesAndReservations';
import Community from './pages/help/Community';
import SpaceSituationRoom from './pages/help/SpaceSituationRoom';
import MembershipLevels from './pages/help/MembershipLevels';
import CustomerService from './pages/help/CustomerService';
import SiteFeedback from './pages/help/SiteFeedback';
import TermsAndConditions from './pages/help/TermsAndConditions';
import Privacy from './pages/help/Privacy';
import BookclubHandoff from './pages/bookclub-handoff/BookclubHandoff';

// V4 pages
import GuideDetails from './pages/guide-details/GuideDetails';
import ObjectDetails from './pages/object-details/ObjectDetails';
import UserPrivateProfile from './pages/profiles/private-profile';
import UserPublicProfile from './pages/profiles/public-profile';
import Quest from './pages/quest-details';
import QuestComplete from './containers/quest-complete';

import CommunityGroupOverview from './pages/community-groups/GroupOverview';
import GroupOverviewInfo from './pages/community-groups/GroupOverviewInfo';
import GroupCreate from './pages/community-groups/GroupCreate';
import GroupImportGoogleClassrooms from './pages/community-groups/GroupImportGoogleClassrooms';

import ImageDetails from './pages/image-details';
import Show from './pages/show';
import StoryDetails from './containers/story-details';
import QuestsHub from './containers/quests-hub';
import GuidesHub from './containers/guides-hub';
import StoriesHub from './containers/stories-hub';
import GroupsHub from './containers/groups-hub';
import ShowsHub from './containers/shows-hub';
import CreateStory from './containers/create-story';
import PlaceholderPage from './pages/Placeholder';
import QuestStep from './containers/quest-step';
import { About, AboutSloohSection } from './containers/about';
import { PrivateProfile } from './containers/profile';
import PrivateProfilePhotos from './components/profile-photos/PrivateProfilePhotos';
import ImagesLayout from './components/profile-photos/ImagesLayout';
import MissionDetails from './containers/mission-details/MissionDetails';

import DashboardPage from 'components/Dashboard';

// providers
import I18nProvider from './providers/I18nProvider';

// router functions
import validateUser from './route-functions/validateUser';
import { fetchPlayer } from './modules/get-audio-player/actions';

import globalOnRouteUpdate from './route-functions/globalOnRouteUpdate';
import validateRegistrationPaths from './route-functions/validateRegistrationPaths';

// global styles
import 'bootstrap/dist/css/bootstrap.css';
import './styles/app.scss';
import './styles/interface.css';
import './styles/animations.scss';
import './styles/static.scss';

// load monitoring and global error handling
import './monitoring';
import MyQa from './components/profiles/private-profile/my-qa/my-qa';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// handle to the listen callback on changes to the history
history.listen((location) => {
  const { pathname } = location;

  firePageview({
    location: pathname,
  });
  store.dispatch(fetchPlayer({ pageURL: pathname }));
});

ReactDOM.render(
  <I18nProvider>
    <Provider store={store}>
      <Router history={browserHistory} onUpdate={globalOnRouteUpdate}>
        <Route path="redirect-confirmation" component={RedirectConfirmation} />

        <Route
          path="registration"
          component={StaticAppContainer}
          onEnter={validateRegistrationPaths}
        >
          <Route path="sign-in" component={SignIn} />
          <Route path="upgrade-apprentice" component={UpgradeApprentice} />
          <Route path="upgrade-astronomer" component={UpgradeAstronomer} />
          <Route path="upgrade" component={Upgrade} />
        </Route>

        <Route path="/" component={App}>
          <IndexRoute component={DashboardPage} onEnter={validateUser} />

          <Route path="about" component={About} onEnter={validateUser}>
            <IndexRedirect to="about-slooh" />
            <Route path="memberships" component={Memberships} />
            <Route
              path=":aboutSloohSectionId"
              component={AboutSloohSection}
              onEnter={validateUser}
            />
          </Route>

          <Route path="join" component={Join}>
            <Route path="step1" component={JoinStep1} />
            <Route path="step1SchoolSelection" component={JoinStep1SchoolSelection} />
            <Route path="step2" component={JoinStep2} />
            <Route path="step3" component={JoinStep3} />
            <Route path="byLandingPage/:subscriptionPlanHashCode" component={JoinByLandingPage} />
            <Route
              path="inviteByEmail/:invitationCodeHash/:invitationCreationEpoch"
              component={JoinInviteByEmailStep1}
            />
            <Route path="inviteByCodeStep1" component={JoinInviteByCodeStep1} />
            <Route path="inviteByCodeStep2" component={JoinInviteByCodeStep2} />
            <Route path="membershipPlanDetailsStep" component={MembershipPlanDetailsStep} />
            <Route path="resetPassword/:cid/:passwordResetToken" component={ResetPassword} />
          </Route>

          <Route
            path="telescope-overview/:observatoryId"
            component={TelescopeOverview}
            onEnter={validateUser}
          />

          <Route path="reservations" component={Reservations} onEnter={validateUser}>
            <IndexRedirect to="reserve-by-objects" />

            <Route path="slooh-recommends" component={SloohRecommends}>
              <IndexRedirect to="new" />
              <Route path="existing" name="existing-missions" component={ExistingMissions} />
              <Route path="new" name="new-missions" component={NewMissions} />
            </Route>

            <Route path="reserve-by-objects" component={ReserveObjects} />
            <Route path="reserve-by-catalog" component={ReserveByCatalog} />
          </Route>

          <Route
            path="reservations/reserve-by-telescope"
            component={Reservations}
            onEnter={validateUser}
          >
            <IndexRedirect to="telescope/d7f673a5-7908-11e6-a635-0eb2b1774883/1ff72faa-7909-11e6-a635-0eb2b1774883" />
            <Route path="telescope/:obsUniqueId/:teleUniqueId" component={ReserveByTelescope} />
          </Route>

          <Route
            path="telescope-details/:obsUniqueId/:teleUniqueId"
            component={ConnectedTelescopeDetails}
            onEnter={validateUser}
          />

          {/**
            example id: 6
            Entry types: latest-entries | all-time-best
            /objects/all-time-best/6/all
          */}
          <Route path="objects" component={ObjectList} onEnter={validateUser}>
            <Route path=":entryType/:SlugLookupId/:filterType" component={ObjectPosts} />
          </Route>

          <Route path="shows/video-viewer(/:showId)" component={Show} onEnter={validateUser} />

          <Route
            path="my-pictures/show-image/:customerImageId/:shareToken(/:scheduledMissionId)"
            component={ImageDetails}
            onEnter={validateUser}
          />

          <Route
            path="my-pictures/popular/show-image(/:customerImageId)(/:shareToken)"
            component={ImageDetails}
            onEnter={validateUser}
          />

          <Route path="my-pictures" component={MyPictures} onEnter={validateUser}>
            <IndexRedirect to="missions" />
            <Route path="photo-roll" title="Photo roll" component={PhotoRoll} />
            <Route path="galleries" tite="Galleries" component={Galleries} />
            <Route path="galleries/:galleryId" tite="Galleries" component={GalleryImages} />
            <Route
              path="missions/:scheduledMissionId"
              title="Mission Images"
              component={MissionImages}
            />
            <Route path="missions" title="Missions" component={Missions} />

            <Route path="public-galleries/:cid" component={PublicGalleries} />
            <Route
              path="gallery/:galleryId/show-image(/:customerImageId)(/:shareToken)"
              component={GalleryImageDetails}
            />
          </Route>

          <Route path="help/posting-guidelines" component={PostingGuidelines} />
          <Route path="help/new-to-slooh" component={NewToSlooh} />
          <Route path="help/telescopes-and-reservations" component={TelescopesAndReservations} />
          <Route path="help/community" component={Community} />
          <Route path="help/space-situation-room" component={SpaceSituationRoom} />
          <Route path="help/membership-levels" component={MembershipLevels} />
          <Route path="help/customer-service" component={CustomerService} />
          <Route path="help/site-feedback" component={SiteFeedback} />
          <Route path="help/terms-and-conditions" component={TermsAndConditions} />
          <Route path="help/privacy" component={Privacy} />

          <Route path="guides(/:filterType)" component={GuidesHub} onEnter={validateUser} />
          <Route path="guide-details/:guideId" component={GuideDetails} onEnter={validateUser} />

          <Route path="guides/subject/:guideId" component={SubjectGuides} onEnter={validateUser} />
          <Route path="guides/topic/:guideId" component={TopicGuides} onEnter={validateUser} />
          <Route
            path="guides/object-category/:guideId"
            component={ObjectCategoryGuide}
            onEnter={validateUser}
          />

          <Route path="object-details/:objectId" component={ObjectDetails} onEnter={validateUser}>
            <IndexRedirect to="overview" />
            <Route path="overview" component={ObjectDetailsOverview} onEnter={validateUser} />
            <Route path="missions" component={ObjectDetailsMissions} onEnter={validateUser} />
            <Route path="quests" component={ObjectDetailsQuests} onEnter={validateUser} />
            <Route path="stories" component={ObjectDetailsStories} onEnter={validateUser} />
            <Route path="shows" component={ObjectDetailsShows} onEnter={validateUser} />
            <Route
              path="observations"
              component={ObjectDetailsObservations}
              onEnter={validateUser}
            />
            <Route path="ask" component={AskAstronomer} onEnter={validateUser} />
          </Route>

          <Route path="shows(/:filterType)" component={ShowsHub} onEnter={validateUser} />

          <Route path="stories(/:filterType)" component={StoriesHub} onEnter={validateUser} />
          <Route path="community/post/:postId" component={StoryDetails} onEnter={validateUser} />
          <Route path="stories/:filterType/create" component={CreateStory} onEnter={validateUser} />

          <Route path="lists" component={PlaceholderPage} onEnter={validateUser}>
            <IndexRedirect to="my-lists" />
            <Route path="my-lists" component={PlaceholderPage} />
          </Route>

          <Route path="qa/:filter" component={MyQa} onEnter={validateUser} />

          <Route path="quests(/:filterType)" component={QuestsHub} onEnter={validateUser} />

          <Route path="quest-details/:questId" component={Quest} onEnter={validateUser} />
          <Route
            path="quest-details/:questId/completed-overview"
            component={QuestComplete}
            onEnter={validateUser}
          />
          <Route path="quest-details/:questId/:step" component={QuestStep} onEnter={validateUser} />

          <Route path="missions-details/:missionId" component={MissionDetails} />

          <Route path="profile/private" component={PrivateProfile} onEnter={validateUser}>
            <IndexRedirect to="photos" />
            {/* <Route path=":profileSectionId" component={PrivateProfileSection} onEnter={validateUser} /> */}
            <Route path="photos" component={PrivateProfilePhotos}>
              <IndexRedirect to="photoroll" />
              <Route path=":type" component={ImagesLayout} />
            </Route>
          </Route>

          {/* <Route path="profile/private" component={UserPrivateProfile} onEnter={validateUser} /> */}
          <Route path="profile/public/:cid" component={UserPublicProfile} onEnter={validateUser} />

          <Route path="groups/create" component={GroupCreate} onEnter={validateUser} />
          <Route
            path="groups/importGoogleClassrooms"
            component={GroupImportGoogleClassrooms}
            onEnter={validateUser}
          />
          <Route path="groups(/:filterType)" component={GroupsHub} onEnter={validateUser} />

          <Route
            path="community-groups/:groupId"
            onEnter={validateUser}
            component={CommunityGroupOverview}
          />
          <Route
            path="community-groups/:groupId/info"
            onEnter={validateUser}
            component={GroupOverviewInfo}
          />
        </Route>

        <Route path="sitemap" component={PlaceholderPage} onEnter={validateUser} />

        <Route path="patent" component={PlaceholderPage} onEnter={validateUser} />
        <Redirect from="*" to="/" />
      </Router>
    </Provider>
  </I18nProvider>,
  window.document.getElementById('app'),
);
