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
import ObjectList from './containers/pulse/ObjectList';
import Live from './containers/live/Live';

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

import PublishPost from './pages/publish-post/publish-post';
import PulsePostList from './pages/pulse/pulse-post-list';
import PulsePostContent from './pages/pulse/pulse-post';
import ObjectPostList from './pages/pulse/object-post-list';

// global styles
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
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

      <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="telescope-overview/:observatoryId" component={TelescopeOverview} />

        <Route path="reservations" component={Reservations}>

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

        <Route path="slooh-pulse" component={PulsePost}>
          <Route path="post(/:id)" name="post" component={PulsePostContent} onUpdate={() => window.scrollTo(0, 0)} />
        </Route>

        <Route path="objects-list" component={ObjectList}>
          <IndexRedirect to="all-time-best" />

          <Route path="all-time-best" component={PulseWrapper}>
            <IndexRedirect to="all" />
            <Route path="all" name="all" component={ObjectPostList} />
            <Route path="science-log" name="science-log" component={ObjectPostList} />
            <Route path="art-culture" name="art-culture" component={ObjectPostList} />
            <Route path="human-spirit" name="human-spirit" component={ObjectPostList} />
            <Route path="diy" name="diy" component={ObjectPostList} />
          </Route>

          <Route path="latest-entries" component={PulseWrapper} />
        </Route>

        <Route path="shows/situation-room" component={Live}>
          {/**/}
        </Route>

        <Route path="my-pictures" component={MyPictures}>
          <IndexRedirect to="photo-roll" />
          <Route path="photo-roll(/:scheduledMissionId)" title="Photo roll" component={PhotoRoll} />
          <Route path="missions" title="Missions" component={Missions} />
        </Route>

        <Route path="/discussions" component={MyPictures}>
          <IndexRedirect to="main" />
          <Route path="main" component={PhotoRoll}>
            <Route path="most-recent" component={PhotoRoll} />
            <Route path="most-active" component={PhotoRoll} />
          </Route>

        </Route>

      </Route>

    </Router>
  </Provider>,
  document.getElementById('app'),
);
