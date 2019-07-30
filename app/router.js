import DashboardPage from 'app/components/Dashboard';
import {
  ProfileActivity,
  ProfileGroups,
} from 'app/components/profiles/private-profile';
import ProfileQaContainer from 'app/components/profiles/private-profile/my-qa/ProfileQaContainer';
import { ProfileQuests } from 'app/components/profiles/private-profile/profile-quests';
import { About, AboutSloohSection } from 'app/containers/about';
import App from 'app/containers/App';
import CreateStory from 'app/containers/create-story';
import GroupsHub from 'app/containers/groups-hub';
import GuidesHub from 'app/containers/guides-hub';
import ObjectCategoryGuide from 'app/containers/guides/ObjectCategoryGuide';
import SubjectGuides from 'app/containers/guides/SubjectGuides';
import TopicGuides from 'app/containers/guides/TopicGuides';
import MyPictures from 'app/containers/MyPictures';
import ObjectDetailsMissions from 'app/containers/object-details/ObjectDetailsMissions';
import ObjectDetailsObservations from 'app/containers/object-details/ObjectDetailsObservations';
import ObjectDetailsOverview from 'app/containers/object-details/ObjectDetailsOverview';
import ObjectDetailsQuests from 'app/containers/object-details/ObjectDetailsQuests';
import ObjectDetailsShows from 'app/containers/object-details/ObjectDetailsShows';
import ObjectDetailsStories from 'app/containers/object-details/ObjectDetailsStories';
import ObjectList from 'app/containers/object-post/ObjectList';
import QuestComplete from 'app/containers/quest-complete';
import QuestStep from 'app/containers/quest-step';
import QuestsHub from 'app/containers/quests-hub';
import Reservations from 'app/containers/Reservations';
import ShowsHub from 'app/containers/shows-hub';
import SloohRecommends from 'app/containers/SloohRecommends';
import StaticAppContainer from 'app/containers/static-app-container';
import StoriesHub from 'app/containers/stories-hub';
import { AskAstronomerMain, QuestionMain } from 'app/modules/ask-astronomer';
import { CommunityGroupEdit } from 'app/modules/community-group-overview';
import { GalleryDetailsMain } from 'app/modules/gallery-details';
import { ImageDetailsMain } from 'app/modules/image-details';
import { MissionDetailsMain } from 'app/modules/mission-details';
import Catalog from 'app/modules/missions/containers/catalog';
import Constellation from 'app/modules/missions/containers/constellation';
import Slooh1000 from 'app/modules/missions/containers/slooh-1000';
import Telescope from 'app/modules/missions/containers/telescope';
import { MissionsMain } from 'app/modules/missions/index';
import {
  PrivateProfileMain,
  ProfileListsMain,
  ProfileMain,
  PublicProfileMain,
} from 'app/modules/profile';
import ImagesLayout from 'app/modules/profile-photos/components/ImagesLayout';
import { ProfilePhotos } from 'app/modules/profile-photos/components/profile-photos';
import { TelescopeDetailsMain } from 'app/modules/telescope';
import { TelescopeNavigation } from 'app/modules/telescope/components/old/telescope-navigation';
import GroupCreate from 'app/pages/community-groups/GroupCreate';
import GroupImportGoogleClassrooms from 'app/pages/community-groups/GroupImportGoogleClassrooms';
import CommunityGroupOverview from 'app/pages/community-groups/GroupOverview';
import GroupOverviewInfo from 'app/pages/community-groups/GroupOverviewInfo';
import ExistingMissions from 'app/pages/existing-missions';
import GuideDetails from 'app/pages/guide-details/GuideDetails';
import CustomerService from 'app/pages/help/CustomerService';
import Galleries from 'app/pages/my-pictures/Galleries';
import GalleryImageDetails from 'app/pages/my-pictures/GalleryImageDetails';
import GalleryImages from 'app/pages/my-pictures/GalleryImages';
import MissionImages from 'app/pages/my-pictures/MissionImages';
import Missions from 'app/pages/my-pictures/Missions';
import PhotoRoll from 'app/pages/my-pictures/PhotoRoll';
import PublicGalleries from 'app/pages/my-pictures/PublicGalleries';
import NewMissions from 'app/pages/new-missions';
import ObjectDetails from 'app/pages/object-details/ObjectDetails';
import ObjectPosts from 'app/pages/object-posts/ObjectPosts';
import PlaceholderPage from 'app/pages/Placeholder';
import Quest from 'app/pages/quest-details';
import RedirectConfirmation from 'app/pages/redirect-confirmation/RedirectConfirmation';
import Join from 'app/pages/registration/Join';
import JoinByLandingPage from 'app/pages/registration/JoinByLandingPage';
import JoinInviteByCodeStep1 from 'app/pages/registration/JoinInviteByCodeStep1';
import JoinInviteByCodeStep2 from 'app/pages/registration/JoinInviteByCodeStep2';
import JoinInviteByEmailStep1 from 'app/pages/registration/JoinInviteByEmailStep1';
import JoinStep1 from 'app/pages/registration/JoinStep1';
import JoinStep1SchoolSelection from 'app/pages/registration/JoinStep1SchoolSelection';
import JoinStep2 from 'app/pages/registration/JoinStep2';
import JoinStep3 from 'app/pages/registration/JoinStep3';
import MembershipPlanDetailsStep from 'app/pages/registration/MembershipPlanDetailsStep';
import Memberships from 'app/pages/registration/Memberships';
import ResetPassword from 'app/pages/registration/ResetPassword';
import SignIn from 'app/pages/registration/SignIn';
import Upgrade from 'app/pages/registration/Upgrade';
import UpgradeApprentice from 'app/pages/registration/UpgradeApprentice';
import UpgradeAstronomer from 'app/pages/registration/UpgradeAstronomer';
import ReserveByTelescope from 'app/pages/reserve-by-telescope';
import ReserveByCatalog from 'app/pages/reserve/reserve-by-catalog';
import ReserveObjects from 'app/pages/reserve/reserve-by-objects';
import Show from 'app/pages/show';
// import { ConnectedTelescopeDetails } from 'app/modules/telescope/components/telescope-details';
import TelescopeOverview from 'app/pages/telescope-overview';
import globalOnRouteUpdate from 'app/route-functions/globalOnRouteUpdate';
import validateRegistrationPaths from 'app/route-functions/validateRegistrationPaths';
import validateUser from 'app/route-functions/validateUser';
import store from 'app/store';
import firePageview from 'app/utils/ga-wrapper';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPreviousInstrument } from 'app/modules/starshare-camera/starshare-camera-actions';

// import { hot } from 'react-hot-loader/root';
import {
  browserHistory,
  IndexRedirect,
  IndexRoute,
  Redirect,
  Route,
  Router,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AccountSettingsMain } from './modules/account-settings';
import AccountDetails from './modules/account-settings/containers/account-details';
import TakeATour from './modules/account-settings/containers/take-a-tour';
import { StoryDetailsMain } from './modules/story-details';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// handle to the listen callback on changes to the history
history.listen(location => {
  const { pathname } = location;

  firePageview({
    location: pathname,
  });
  // todo do we need this on every page refresh?
  // store.dispatch(fetchPlayer({ pageURL: pathname }));
});

const getProfileRoutes = ({ publicProfile }) => (
  <Fragment>
    <IndexRedirect to="activity" />
    <Route path="activity" component={ProfileActivity} />
    <Route path="photos" component={ProfilePhotos}>
      <IndexRedirect to={publicProfile ? 'observations' : 'photoroll'} />
      <Route path=":type" component={ImagesLayout} />
    </Route>
    <Route path="lists">
      <IndexRedirect to="object" />
      <Route path=":filterType" component={ProfileListsMain} />
    </Route>
    <Route path="qa">
      <IndexRedirect to="asked" />
      <Route path=":filter" component={ProfileQaContainer} />
    </Route>
    <Route path="groups" component={ProfileGroups} />
    <Route
      path="groups/create"
      component={GroupCreate}
      onEnter={validateUser}
    />
    <Route
      path="groups/importGoogleClassrooms"
      component={GroupImportGoogleClassrooms}
      onEnter={validateUser}
    />
    <Route path="quests" component={ProfileQuests} />
  </Fragment>
);

const AppRouter = ({ setPreviousInstrument }) => (
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
        <Route
          path="step1SchoolSelection"
          component={JoinStep1SchoolSelection}
        />
        <Route path="step2" component={JoinStep2} />
        <Route path="step3" component={JoinStep3} />
        <Route
          path="byLandingPage/:subscriptionPlanHashCode"
          component={JoinByLandingPage}
        />
        <Route
          path="inviteByEmail/:invitationCodeHash/:invitationCreationEpoch"
          component={JoinInviteByEmailStep1}
        />
        <Route path="inviteByCodeStep1" component={JoinInviteByCodeStep1} />
        <Route path="inviteByCodeStep2" component={JoinInviteByCodeStep2} />
        <Route
          path="membershipPlanDetailsStep"
          component={MembershipPlanDetailsStep}
        />
        <Route
          path="resetPassword/:cid/:passwordResetToken"
          component={ResetPassword}
        />
      </Route>

      <Route
        path="telescope-overview/:observatoryId"
        component={TelescopeOverview}
        onEnter={validateUser}
      />

      <Route
        path="reservations"
        component={Reservations}
        onEnter={validateUser}
      >
        <IndexRedirect to="reserve-by-objects" />

        <Route path="slooh-recommends" component={SloohRecommends}>
          <IndexRedirect to="new" />
          <Route
            path="existing"
            name="existing-missions"
            component={ExistingMissions}
          />
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
        <Route
          path="telescope/:obsUniqueId/:teleUniqueId"
          component={ReserveByTelescope}
        />
      </Route>

      <Route
        path="telescope-details/:obsUniqueId/:teleUniqueId"
        // component={ConnectedTelescopeDetails}
        component={TelescopeDetailsMain}
        onEnter={validateUser}
        onLeave={() => {
          if (!window.location.pathname.includes('telescope-details')) {
            setPreviousInstrument(null);
          }
        }}
      >
        <Route path=":instrumentId" component={TelescopeNavigation} />
      </Route>

      {/**
       example id: 6
       Entry types: latest-entries | all-time-best
       /objects/all-time-best/6/all
       */}
      <Route path="objects" component={ObjectList} onEnter={validateUser}>
        <Route
          path=":entryType/:SlugLookupId/:filterType"
          component={ObjectPosts}
        />
      </Route>

      <Route
        path="shows/video-viewer(/:showId)"
        component={Show}
        onEnter={validateUser}
      />

      <Route
        path="my-pictures/show-image/:customerImageId/:shareToken(/:scheduledMissionId)"
        component={ImageDetailsMain}
        onEnter={validateUser}
      />

      <Route
        path="my-pictures/popular/show-image(/:customerImageId)(/:shareToken)"
        component={ImageDetailsMain}
        onEnter={validateUser}
      />

      <Route path="my-pictures" component={MyPictures} onEnter={validateUser}>
        <IndexRedirect to="missions" />
        <Route path="photo-roll" title="Photo roll" component={PhotoRoll} />
        <Route path="galleries" tite="Galleries" component={Galleries} />
        <Route
          path="galleries/:galleryId"
          tite="Galleries"
          component={GalleryImages}
        />
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

      <Route path="help/customer-service" component={CustomerService} />

      <Route
        path="guides(/:filterType)"
        component={GuidesHub}
        onEnter={validateUser}
      />
      <Route
        path="guide-details/:guideId"
        component={GuideDetails}
        onEnter={validateUser}
      />

      <Route
        path="guides/subject/:guideId"
        component={SubjectGuides}
        onEnter={validateUser}
      />
      <Route
        path="guides/topic/:guideId"
        component={TopicGuides}
        onEnter={validateUser}
      />
      <Route
        path="guides/history/:guideId"
        component={ObjectCategoryGuide}
        onEnter={validateUser}
      />
      <Route
        path="guides/object-category/:guideId"
        component={ObjectCategoryGuide}
        onEnter={validateUser}
      />

      <Route
        path="object-details/:objectId/question/:threadId"
        component={QuestionMain}
        onEnter={validateUser}
      />
      <Route
        path="object-details/:objectId"
        component={ObjectDetails}
        onEnter={validateUser}
      >
        <IndexRedirect to="overview" />
        <Route
          path="overview"
          component={ObjectDetailsOverview}
          onEnter={validateUser}
        />
        <Route
          path="missions"
          component={ObjectDetailsMissions}
          onEnter={validateUser}
        />
        <Route
          path="quests"
          component={ObjectDetailsQuests}
          onEnter={validateUser}
        />
        <Route
          path="stories"
          component={ObjectDetailsStories}
          onEnter={validateUser}
        />
        <Route
          path="shows"
          component={ObjectDetailsShows}
          onEnter={validateUser}
        />
        <Route
          path="observations"
          component={ObjectDetailsObservations}
          onEnter={validateUser}
        />
        <Route
          path="ask"
          component={AskAstronomerMain}
          onEnter={validateUser}
        />
      </Route>

      <Route
        path="shows(/:filterType)"
        component={ShowsHub}
        onEnter={validateUser}
      />

      <Route
        path="stories(/:filterType)"
        component={StoriesHub}
        onEnter={validateUser}
      />
      <Route
        path="community/post/:postId"
        component={StoryDetailsMain}
        onEnter={validateUser}
      />
      <Route
        path="stories/:filterType/create"
        component={CreateStory}
        onEnter={validateUser}
      />

      <Route
        path="quests(/:filterType)"
        component={QuestsHub}
        onEnter={validateUser}
      />

      <Route
        path="quest-details/:questId"
        component={Quest}
        onEnter={validateUser}
      />
      <Route
        path="quest-details/:questId/completed-overview"
        component={QuestComplete}
        onEnter={validateUser}
      />
      <Route
        path="quest-details/:questId/:step"
        component={QuestStep}
        onEnter={validateUser}
      />

      <Route
        path="missions-details/:missionId"
        component={MissionDetailsMain}
        onEnter={validateUser}
      />

      <Route
        path="gallery-details/:galleryId"
        component={GalleryDetailsMain}
        onEnter={validateUser}
      />

      <Route path="profile" component={ProfileMain} onEnter={validateUser}>
        <Route
          path=":private"
          component={PrivateProfileMain}
          onEnter={validateUser}
        >
          {getProfileRoutes({ publicProfile: false })}
        </Route>

        <Route
          path=":public/:customerUUID"
          component={PublicProfileMain}
          onEnter={validateUser}
        >
          {getProfileRoutes({ publicProfile: true })}
        </Route>
      </Route>

      <Route
        path="groups/create"
        component={GroupCreate}
        onEnter={validateUser}
      />
      <Route
        path="groups/importGoogleClassrooms"
        component={GroupImportGoogleClassrooms}
        onEnter={validateUser}
      />
      <Route
        path="groups(/:filterType)"
        component={GroupsHub}
        onEnter={validateUser}
      />

      <Route
        path="community-groups/:groupId"
        onEnter={validateUser}
        component={CommunityGroupOverview}
      />

        <Route
          path="community-groups/:groupId/edit=:edit"
          onEnter={validateUser}
          component={CommunityGroupEdit}
        />

         <Route
           path="community-groups/:groupId/info"
           onEnter={validateUser}
           component={GroupOverviewInfo}
         />

         <Route
           path="community-groups/:groupId/:threadId"
           onEnter={validateUser}
           component={CommunityGroupOverview}
         />

      <Route
        path="account-settings"
        component={AccountSettingsMain}
        onEnter={validateUser}
      >
        <IndexRedirect to="account-details" />
        <Route path="account-details" component={AccountDetails} />
        <Route path="take-a-tour" component={TakeATour} />
      </Route>

      <Route path="missions" component={MissionsMain} onEnter={validateUser}>
        <IndexRedirect to="bySlooh1000" />
        <Route path="bySlooh1000" component={Slooh1000} />
        <Route path="byConstellation" component={Constellation} />
        <Route path="byCatalog" component={Catalog} />
        <Route path="byTelescope" component={Telescope} />
      </Route>
    </Route>

    <Route path="sitemap" component={PlaceholderPage} onEnter={validateUser} />

    <Route path="patent" component={PlaceholderPage} onEnter={validateUser} />
    <Redirect from="*" to="/" />
  </Router>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPreviousInstrument,
    },
    dispatch
  );

// export default hot(AppRouter);
export default connect(
  null,
  mapDispatchToProps
)(AppRouter);
