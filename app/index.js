import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import configureStore from './store';
import { checkUser } from './modules/User';

// containers
import App from './containers/App';
import StaticAppContainer from './containers/static-app-container';
import Reservations from './containers/Reservations';
import SloohRecommends from './containers/SloohRecommends';
import MyPictures from './containers/MyPictures';
import PulseList from './containers/pulse/PulseList';
import PulseWrapper from './containers/pulse/PulseWrapper';
import PulsePost from './containers/pulse/PulsePost';
import ObjectListWrapper from './containers/object-post/ObjectListWrapper';
import ObjectList from './containers/object-post/ObjectList';
import PlaybackContainer from './containers/PlaybackContainer';

import Discussions from './containers/discussions/Discussions';
import DiscussionsWrapper from './containers/discussions/DiscussionsWrapper';
import DiscussionsListWrapper from './containers/discussions/DiscussionsListWrapper';

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

import PlaybackWrapper from './pages/playback/PlaybackWrapper';
import PlaybackViewer from './pages/playback/PlaybackViewer';
import RecentShows from './pages/playback/RecentShows';
import SloohMotion from './pages/playback/SloohMotion';
import UpcomingShows from './pages/playback/UpcomingShows';

import Job from './pages/about/job';
import Contact from './pages/about/contact';
import Leadership from './pages/about/leadership';
import Mission from './pages/about/mission';
import News from './pages/about/news';
import PlansChange from './pages/about/PlansChange';

import PhotoRoll from './pages/my-pictures/PhotoRoll';
import Galleries from './pages/my-pictures/Galleries';
import Missions from './pages/my-pictures/Missions';
import MissionImages from './pages/my-pictures/MissionImages';

import Plans from './pages/registration/Plans';
import UpgradeApprentice from './pages/registration/UpgradeApprentice';
import UpgradeAstronomer from './pages/registration/UpgradeAstronomer';
import SignIn from './pages/registration/SignIn';

import Account from './pages/settings/Account';
import Notifications from './pages/settings/Notifications';
import PaymentInfo from './pages/settings/PaymentInfo';
import Profile from './pages/settings/Profile';
import SocialNetwork from './pages/settings/SocialNetwork';

import PublishPost from './pages/publish-post/publish-post';
import PulsePostList from './pages/pulse/pulse-post-list';
import PulsePostContent from './pages/pulse/pulse-post';
import ObjectPostList from './pages/object-post/object-post-list';

import DiscussionsReplyTo from './pages/discussions/replies/DiscussionsReplyTo';
import DiscussionsThreadWrapper from './pages/discussions/threads/DiscussionsThreadWrapper';
import DiscussionsTopicsList from './pages/discussions/topics/DiscussionsTopicsList';

// global styles
import 'bootstrap/dist/css/bootstrap.css';
import './styles/app.scss';
import './styles/interface.css';
import './styles/animations.scss';
import './styles/static.scss';

const store = configureStore();

const validateUser = (nextState, replace, callback) => {
  store.dispatch(checkUser(nextState.location.pathname, replace, callback));
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>

      <Route path="about" component={StaticAppContainer} onEnter={validateUser}>
        <IndexRedirect to="mission" />
        <Route path="mission" component={Mission} />
        <Route path="news" component={News} title="In The News" subTitle=" " />
        <Route path="job" component={Job} title="Work With Us" subTitle="Share your passion for astronomy with the world" />
        <Route path="contact" component={Contact} title="Contact US" subTitle=" " />
        <Route path="leadership" component={Leadership} title="Leadership" subTitle=" " />
        <Route path="pricing" component={PlansChange} title="Plans" subTitle=" " />
      </Route>

      <Route path="registration" component={StaticAppContainer} onEnter={validateUser}>
        <Route path="plans" component={Plans} />
        <Route path="sign-in" component={SignIn} />
        <Route path="upgrade-apprentice" component={UpgradeApprentice} />
        <Route path="upgrade-astronomer" component={UpgradeAstronomer} />
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

          <Route path="hottest-posts" component={PulseWrapper} />
        </Route>

        <Route path="community" component={PulsePost}>
          <Route path="post(/:id)" name="post" component={PulsePostContent} onEnter={validateUser} onUpdate={() => window.scrollTo(0, 0)} />
        </Route>

        {
          /**
            example id: 6
            Entry types: latest-entries | all-time-best
            /objects/all-time-best/6/all
          */
        }
        <Route path="objects" component={ObjectList} onEnter={validateUser}>
          <IndexRedirect to="all-time-best" />

          <Route path=":entryType/:SlugLookupId" component={ObjectListWrapper}>
            <IndexRedirect to="all" />
            <Route path="all" name="all" component={ObjectPostList} />
            <Route path="scienceLog" name="scienceLog" component={ObjectPostList} />
            <Route path="artCulture" name="artCulture" component={ObjectPostList} />
            <Route path="humanSpirit" name="humanSpirit" component={ObjectPostList} />
            <Route path="diy" name="diy" component={ObjectPostList} />
          </Route>
        </Route>

        <Route path="shows/situation-room(/:showId)" component={SituationRoom} onEnter={validateUser} />
        <Route path="shows/event-details/:showId" component={EventDetails} onEnter={validateUser} />

        <Route path="shows/browse-shows" component={PlaybackContainer} onEnter={validateUser}>
          <IndexRedirect to="recent-shows" />

          <Route path="recent-shows" component={RecentShows}>
            <IndexRedirect to="all-categories" />
            <Route path="all-categories" component={PlaybackViewer} />
            <Route path="the-moon" component={PlaybackViewer} />
            <Route path="deep-space" component={PlaybackViewer} />
            <Route path="planets" component={PlaybackViewer} />
            <Route path="the-sun" component={PlaybackViewer} />
            <Route path="comets" component={PlaybackViewer} />
            <Route path="constellations" component={PlaybackViewer} />
          </Route>

          <Route path="slooh-motion" component={SloohMotion}>
            <IndexRedirect to="all-categories" />
            <Route path="all-categories" component={PlaybackViewer} />
            <Route path="the-moon" component={PlaybackViewer} />
            <Route path="deep-space" component={PlaybackViewer} />
            <Route path="planets" component={PlaybackViewer} />
            <Route path="the-sun" component={PlaybackViewer} />
            <Route path="comets" component={PlaybackViewer} />
            <Route path="constellations" component={PlaybackViewer} />
          </Route>

          <Route path="upcoming-shows" component={UpcomingShows}>
            <IndexRedirect to="all-categories" />
            <Route path="all-categories" component={PlaybackViewer} />
            <Route path="the-moon" component={PlaybackViewer} />
            <Route path="deep-space" component={PlaybackViewer} />
            <Route path="planets" component={PlaybackViewer} />
            <Route path="the-sun" component={PlaybackViewer} />
            <Route path="comets" component={PlaybackViewer} />
            <Route path="constellations" component={PlaybackViewer} />
          </Route>
        </Route>

        <Route path="my-pictures" component={MyPictures} onEnter={validateUser}>
          <IndexRedirect to="photo-roll" />
          <Route path="photo-roll" title="Photo roll" component={PhotoRoll} />
          <Route path="galleries" title="Galleries" component={Galleries} />
          <Route path="missions/:scheduledMissionId" title="Mission Images" component={MissionImages} />
          <Route path="missions" title="Missions" component={Missions} />
        </Route>

        <Route path="/discussions" component={Discussions} onEnter={validateUser}>
          <IndexRedirect to="main" />
          <Route path="main" component={DiscussionsWrapper}>
            <IndexRedirect to="most-recent" />
            <Route path="most-recent" component={DiscussionsListWrapper} />
            <Route path="most-active" component={DiscussionsListWrapper} />
          </Route>
          <Route path="topics" component={DiscussionsWrapper}>
            <IndexRedirect to="most-recent" />
            <Route path="most-recent" component={DiscussionsTopicsList} />
            <Route path="most-active" component={DiscussionsTopicsList} />
          </Route>
          <Route path="topics(/:topicId)/threads" component={DiscussionsWrapper}>
            <IndexRedirect to="most-recent" />
            <Route path="most-recent" component={DiscussionsListWrapper} />
            <Route path="most-active" component={DiscussionsListWrapper} />
          </Route>
        </Route>
        <Route path="discussions/topic(/:topicId)(/:threadId)" component={DiscussionsThreadWrapper} onEnter={validateUser} />
        <Route path="discussions/topic(/:topicId)(/:threadId)/new-reply" component={DiscussionsReplyTo} onEnter={validateUser} />
        <Route path="discussions/new-thread" component={DiscussionsReplyTo} onEnter={validateUser} />
        <Route path="discussions/topic(/:topicId)/new-thread" component={DiscussionsReplyTo} onEnter={validateUser} />

      </Route>

    </Router>
  </Provider>,
  document.getElementById('app'),
);
