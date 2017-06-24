import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';

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
import PulseList from './containers/pulse/PulseList';
import PulseWrapper from './containers/pulse/PulseWrapper';
import PulsePost from './containers/pulse/PulsePost';
import ObjectList from './containers/object-post/ObjectList';

import Discussions from './containers/discussions/Discussions';
import DiscussionsWrapper from './containers/discussions/DiscussionsWrapper';
import DiscussionsListWrapper from './containers/discussions/DiscussionsListWrapper';
import DiscussionsTopicsWrapper from './containers/discussions/DiscussionsTopicsWrapper';

// pages
import Home from './pages/home';
import TelescopeOverview from './pages/telescope-overview';
import TelescopeDetails from './pages/telescope-details/telescope-details';
import NewMissions from './pages/new-missions';
import ExistingMissions from './pages/existing-missions';
import ReserveByTelescope from './pages/reserve-by-telescope';
import ReserveObjects from './pages/reserve/reserve-by-objects';
import ReserveByCatalog from './pages/reserve/reserve-by-catalog';
import BestOfSlooh from './pages/best-of-slooh/best-of-slooh';

import SituationRoom from './pages/situation-room/SituationRoom';
import EventDetails from './pages/situation-room/EventDetails';

import RecentShows from './pages/browse-video-viewer/RecentShows';
import SloohMotion from './pages/browse-video-viewer/SloohMotion';
import UpcomingShows from './pages/browse-video-viewer/UpcomingShows';

import ShowVideoViewer from './pages/show-video-viewer/ShowVideoViewer';

import BrowseShowsWrapper from './pages/browse-video-viewer/BrowseShowsWrapper';

import Job from './pages/about/job';
import Contact from './pages/about/contact';
import Leadership from './pages/about/leadership';
import Mission from './pages/about/mission';
import News from './pages/about/news';
import PlansChange from './pages/about/PlansChange';
import RoadtripRegistration from './pages/about/RoadtripRegistration';

import PhotoRoll from './pages/my-pictures/PhotoRoll';
import Galleries from './pages/my-pictures/Galleries';
import Missions from './pages/my-pictures/Missions';
import MissionImages from './pages/my-pictures/MissionImages';

import Plans from './pages/registration/Plans';
import UpgradeApprentice from './pages/registration/UpgradeApprentice';
import UpgradeAstronomer from './pages/registration/UpgradeAstronomer';
import SignIn from './pages/registration/SignIn';
import Upgrade from './pages/registration/Upgrade';

import Account from './pages/settings/Account';
import Notifications from './pages/settings/Notifications';
import PaymentInfo from './pages/settings/PaymentInfo';
import Profile from './pages/settings/Profile';
import SocialNetwork from './pages/settings/SocialNetwork';

import PublishPost from './pages/publish-post/publish-post';
import PulsePostList from './pages/pulse/pulse-post-list';
import PulsePostContent from './pages/pulse/pulse-post';
import ObjectPosts from './pages/object-posts/ObjectPosts';

import NewDiscussionsThread from './pages/discussions/threads/NewDiscussionsThread';
import DiscussionsReplyTo from './pages/discussions/replies/DiscussionsReplyTo';
import DiscussionsThreadWrapper from './pages/discussions/threads/DiscussionsThreadWrapper';
import DiscussionsTopicsList from './pages/discussions/topics/DiscussionsTopicsList';

import Landing from './pages/landing/Landing';

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

// router functions
import validateUser from './route-functions/validateUser';
import validateRoadtripRegistration from './route-functions/validateRoadtripRegistration';
import globalOnRouteUpdate from './route-functions/globalOnRouteUpdate';
import validateRegistrationPaths from './route-functions/validateRegistrationPaths';

// global styles
import 'bootstrap/dist/css/bootstrap.css';
import './styles/app.scss';
import './styles/interface.css';
import './styles/animations.scss';
import './styles/static.scss';

// handle to the listen callback on changes to the history
const unlisten = hashHistory.listen((location, action) => {
  firePageview({
    location: location.pathname,
  });
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} onUpdate={globalOnRouteUpdate}>

      <Route path="redirect-confirmation" component={RedirectConfirmation} />

      <Route path="about" component={StaticAppContainer} onEnter={validateUser}>
        <IndexRedirect to="mission" />
        <Route path="mission" component={Mission} />
        <Route path="news" component={News} title="In The News" subTitle=" " />
        <Route path="job" component={Job} title="Work With Us" subTitle="Share your passion for astronomy with the world" />
        <Route path="contact" component={Contact} title="Contact US" subTitle=" " />
        <Route path="leadership" component={Leadership} title="Leadership" subTitle=" " />
        <Route path="pricing" component={PlansChange} />
      </Route>

      <Route path="registration" component={StaticAppContainer} onEnter={validateRegistrationPaths}>
        <Route path="plans" component={Plans} />
        <Route path="sign-in" component={SignIn} />
        <Route path="upgrade-apprentice" component={UpgradeApprentice} />
        <Route path="upgrade-astronomer" component={UpgradeAstronomer} />
        <Route path="upgrade" component={Upgrade} />
      </Route>

      <Route path="settings" component={StaticAppContainer} onEnter={validateUser}>
        <Route path="account" component={Account} />
        <Route path="notifications" component={Notifications} />
        <Route path="billing" component={PaymentInfo} />
        <Route path="dashboard" component={Profile} />
        <Route path="social-network" component={SocialNetwork} />
      </Route>

      <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={validateUser} />

        <Route path="telescope-overview/:observatoryId" component={TelescopeOverview} onEnter={validateUser} />

        <Route path="reservations" component={Reservations} onEnter={validateUser}>
          <IndexRedirect to="slooh-recommends" />

          <Route path="slooh-recommends" component={SloohRecommends}>
            <IndexRedirect to="existing" />
            <Route path="existing" name="existing-missions" component={ExistingMissions} />
            <Route path="new" name="new-missions" component={NewMissions} />
          </Route>

          <Route path="reserve-by-objects" component={ReserveObjects} />
          <Route path="reserve-by-catalog" component={ReserveByCatalog} />
        </Route>

        <Route path="reservations/reserve-by-telescope" component={Reservations} onEnter={validateUser}>
          <IndexRedirect to="telescope/d7f673a5-7908-11e6-a635-0eb2b1774883/1ff72faa-7909-11e6-a635-0eb2b1774883" />
          <Route path="telescope/:obsUniqueId/:teleUniqueId" component={ReserveByTelescope} />
        </Route>

        <Route path="telescope-details/:obsUniqueId/:teleUniqueId" component={TelescopeDetails} onEnter={validateUser} />

        <Route path="best-of-slooh" component={BestOfSlooh} onEnter={validateUser} />
        <Route path="publish-post" component={PublishPost} onEnter={validateUser} />

        <Route path="slooh-pulse" component={PulseList} onEnter={validateUser}>
          <IndexRedirect to="latest-posts" />

          <Route path="latest-posts" component={PulseWrapper}>
            <IndexRedirect to="all" />
            <Route path="all" name="all" component={PulsePostList} />
            <Route path="scienceLog" name="scienceLog" component={PulsePostList} />
            <Route path="artCulture" name="artCulture" component={PulsePostList} />
            <Route path="humanSpirit" name="humanSpirit" component={PulsePostList} />
            <Route path="diy" name="diy" component={PulsePostList} />
          </Route>

          <Route path="hottest-posts" component={PulseWrapper}>
            <IndexRedirect to="all" />
            <Route path="all" name="all" component={PulsePostList} />
            <Route path="scienceLog" name="scienceLog" component={PulsePostList} />
            <Route path="artCulture" name="artCulture" component={PulsePostList} />
            <Route path="humanSpirit" name="humanSpirit" component={PulsePostList} />
            <Route path="diy" name="diy" component={PulsePostList} />
          </Route>
        </Route>

        <Route path="community" component={PulsePost}>
          <Route path="post(/:id)" name="post" component={PulsePostContent} onEnter={validateUser} />
        </Route>

        {
          /**
            example id: 6
            Entry types: latest-entries | all-time-best
            /objects/all-time-best/6/all
          */
        }
        <Route path="objects" component={ObjectList} onEnter={validateUser}>
          <Route path=":entryType/:SlugLookupId/:filterType" component={ObjectPosts} />
        </Route>

        <Route path="shows/situation-room(/:showId)" component={SituationRoom} onEnter={validateUser} />
        <Route path="shows/event-details(/:showId)" component={EventDetails} onEnter={validateUser} />

        <Route path="shows/video-viewer/browse" component={BrowseShowsWrapper}>
          <IndexRedirect to="recent-shows" />
          <Route path="recent-shows" component={RecentShows}>
            { /*
            <IndexRedirect to="all-categories" />
            <Route path="all-categories" />
            <Route path="the-moon" />
            <Route path="deep-space" />
            <Route path="planets" />
            <Route path="the-sun" />
            <Route path="comets" />
            <Route path="constellations" />
          */ }
          </Route>
          <Route path="slooh-motion" component={SloohMotion}>
            { /*
            <IndexRedirect to="all-categories" />
            <Route path="all-categories" />
            <Route path="the-moon" />
            <Route path="deep-space" />
            <Route path="planets" />
            <Route path="the-sun" />
            <Route path="comets" />
            <Route path="constellations" />
            */ }
          </Route>
          <Route path="upcoming-shows" component={UpcomingShows}>
          { /*
            <IndexRedirect to="all-categories" />
            <Route path="all-categories" />
            <Route path="the-moon" />
            <Route path="deep-space" />
            <Route path="planets" />
            <Route path="the-sun" />
            <Route path="comets" />
            <Route path="constellations" />
          */ }
          </Route>
        </Route>

        <Route path="shows/video-viewer(/:showId)" component={ShowVideoViewer} onEnter={validateUser} />

        <Route path="my-pictures" component={MyPictures} onEnter={validateUser}>
          <IndexRedirect to="photo-roll" />
          <Route path="photo-roll" title="Photo roll" component={PhotoRoll} />
          <Route path="galleries" title="Galleries" component={Galleries} />
          <Route path="missions/:scheduledMissionId" title="Mission Images" component={MissionImages} />
          <Route path="missions" title="Missions" component={Missions} />
        </Route>

        <Route path="discussions" component={Discussions} onEnter={validateUser}>
          <IndexRedirect to="main" />
          <Route path="main" component={DiscussionsWrapper}>
            <IndexRedirect to="most-recent" />
            <Route path="most-recent" component={DiscussionsListWrapper} />
            <Route path="most-active" component={DiscussionsListWrapper} />
          </Route>
          <Route path="forums(/:forumId)/topics(/:topicId)/threads" component={DiscussionsWrapper}>
            <IndexRedirect to="most-recent" />
            <Route path="most-recent" component={DiscussionsListWrapper} />
            <Route path="most-active" component={DiscussionsListWrapper} />
          </Route>
        </Route>
        <Route path="discussions/forums(/:forumId)/topics" component={DiscussionsTopicsWrapper} onEnter={validateUser}>
          <IndexRedirect to="alphabetic" />
          <Route path="alphabetic" component={DiscussionsTopicsList} />
          <Route path="most-recent" component={DiscussionsTopicsList} />
          <Route path="most-active" component={DiscussionsTopicsList} />
        </Route>

        <Route path="discussions/forums(/:forumId)/topics/new-thread" component={NewDiscussionsThread} onEnter={validateUser} />
        <Route path="discussions/forums(/:forumId)/topics(/:topicId)/threads/new-thread" component={NewDiscussionsThread} onEnter={validateUser} />
        <Route path="discussions/forums(/:forumId)/topics(/:topicId)/threads(/:threadId)/new-thread" component={NewDiscussionsThread} onEnter={validateUser} />

        <Route path="discussions/forums(/:forumId)/topics(/:topicId)/threads(/:threadId)" component={DiscussionsThreadWrapper} onEnter={validateUser} />
        <Route path="discussions/forums(/:forumId)/topics(/:topicId)/threads(/:threadId)/new-reply" component={DiscussionsReplyTo} onEnter={validateUser} />
        <Route path="discussions/forums(/:forumId)/topics(/:topicId)/threads(/:threadId)(/:replyId)/new-reply" component={DiscussionsReplyTo} onEnter={validateUser} />
        <Route path="discussions/new-thread" component={NewDiscussionsThread} onEnter={validateUser} />

        <Route path="road-trip" component={Landing} />
        <Route path="road-trip/registration" component={RoadtripRegistration} onEnter={validateRoadtripRegistration} />

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

        <Route path="bookclub" component={BookclubHandoff} />
      </Route>

    </Router>
  </Provider>,
  document.getElementById('app'),
);
