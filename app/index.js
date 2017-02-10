import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import configureStore from './store';

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
import Live from './containers/live/Live';
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
import Job from './pages/about/job';
import Contact from './pages/about/contact';
import Leadership from './pages/about/leadership';
import Mission from './pages/about/mission';
import News from './pages/about/news';

import PhotoRoll from './pages/my-pictures/PhotoRoll';
import Missions from './pages/my-pictures/Missions';
import MissionImages from './pages/my-pictures/MissionImages';

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


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>

      <Route path="about" component={StaticAppContainer}>
        <IndexRedirect to="mission" />
        <Route path="mission" component={Mission} />
        <Route path="news" component={News} title="In The News" subTitle=" " />
        <Route path="job" component={Job} title="Work With Us" subTitle="Share your passion for astronomy with the world" />
        <Route path="contact" component={Contact} title="Contact US" subTitle="[Sub-title for news page]" />
        <Route path="leadership" component={Leadership} title="Leadership" subTitle="[Sub-title for news page]" />
      </Route>

      <Route path="registration" component={StaticAppContainer}>
        <Route path="sign-in" component={SignIn} />
        <Route path="upgrade-apprentice" component={UpgradeApprentice} />
        <Route path="upgrade-astronomer" component={UpgradeAstronomer} />
      </Route>

      <Route path="settings" component={StaticAppContainer}>
        <Route path="account" component={Account} />
        <Route path="notifications" component={Notifications} />
        <Route path="billing" component={PaymentInfo} />
        <Route path="dashboard" component={Profile} />
        <Route path="social-network" component={SocialNetwork} />
      </Route>

      <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="telescope-overview/:observatoryId" component={TelescopeOverview} />

        <Route path="reservations" component={Reservations}>
          <IndexRedirect to="slooh-recommends" />

          <Route path="slooh-recommends" component={SloohRecommends}>
            <IndexRedirect to="existing" />
            <Route path="existing" name="existing-missions" component={ExistingMissions} />
            <Route path="new" name="new-missions" component={NewMissions} />
          </Route>

          <Route path="reserve-by-objects" component={ReserveObjects} />
          <Route path="reserve-by-catalog" component={ReserveByCatalog} />
        </Route>

        <Route path="reservations/reserve-by-telescope" component={Reservations}>
          <IndexRedirect to="telescope/d7f673a5-7908-11e6-a635-0eb2b1774883/1ff72faa-7909-11e6-a635-0eb2b1774883" />
          <Route path="telescope/:obsUniqueId/:teleUniqueId" component={ReserveByTelescope} />
        </Route>

        <Route path="telescope-details/:obsUniqueId/:teleUniqueId" component={TelescopeDetails} />

        <Route path="best-of-slooh" component={BestOfSlooh} />
        <Route path="publish-post" component={PublishPost} />

        <Route path="slooh-pulse" component={PulseList}>
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
          <Route path="post(/:id)" name="post" component={PulsePostContent} onUpdate={() => window.scrollTo(0, 0)} />
        </Route>

        <Route path="objects" component={ObjectList}>
          <IndexRedirect to="all-time-best" />

          <Route path="all-time-best" component={ObjectListWrapper}>
            <IndexRedirect to="all" />
            <Route path="all" name="all" component={ObjectPostList} />
            <Route path="scienceLog" name="scienceLog" component={ObjectPostList} />
            <Route path="artCulture" name="artCulture" component={ObjectPostList} />
            <Route path="humanSpirit" name="humanSpirit" component={ObjectPostList} />
            <Route path="diy" name="diy" component={ObjectPostList} />
          </Route>

          <Route path="latest-entries" component={ObjectListWrapper}>
            <IndexRedirect to="all" />
            <Route path="all" name="all" component={ObjectPostList} />
            <Route path="scienceLog" name="scienceLog" component={ObjectPostList} />
            <Route path="artCulture" name="artCulture" component={ObjectPostList} />
            <Route path="humanSpirit" name="humanSpirit" component={ObjectPostList} />
            <Route path="diy" name="diy" component={ObjectPostList} />
          </Route>
        </Route>

        <Route path="shows/situation-room" component={Live}>
          {/**/}
        </Route>

        <Route path="my-pictures" component={MyPictures}>
          <IndexRedirect to="photo-roll" />
          <Route path="photo-roll" title="Photo roll" component={PhotoRoll} />
          <Route path="missions/:scheduledMissionId" title="Mission Images" component={MissionImages} />
          <Route path="missions" title="Missions" component={Missions} />
        </Route>

        <Route path="/discussions" component={Discussions}>
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
        <Route path="discussions/topic(/:topicId)(/:threadId)" component={DiscussionsThreadWrapper} />
        <Route path="discussions/topic(/:topicId)(/:threadId)/new-reply" component={DiscussionsReplyTo} />
        <Route path="discussions/new-thread" component={DiscussionsReplyTo} />
        <Route path="discussions/topic(/:topicId)/new-thread" component={DiscussionsReplyTo} />

      </Route>

    </Router>
  </Provider>,
  document.getElementById('app'),
);
