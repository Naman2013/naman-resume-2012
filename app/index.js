import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory, hashHistory } from 'react-router';
import configureStore from './store';

// containers
import App from './containers/App';
import Reservations from './containers/Reservations';
import SloohRecommends from './containers/SloohRecommends';
import MyPictures from './containers/my-pictures';

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
import ObjectPost from './pages/object-post/object-post';
import PhotoRoll from './pages/my-pictures/photo-roll';
import Galleries from './pages/my-pictures/galleries';
import Missions from './pages/my-pictures/missions';
import Favorites from './pages/my-pictures/favorites';
import SloohMostPopular from './pages/my-pictures/slooh-most-popular';

// global styles
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './styles/app.scss';
import './styles/interface.css';
import './styles/animations.scss';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>

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
          <Route path="reserve-by-telescope(/:obsUniqueId/:teleUniqueId)" component={ReserveByTelescope} />
        </Route>

        <Route path="telescope-details/:obsUniqueId/:teleUniqueId" component={TelescopeDetails} />

        <Route path="best-of-slooh" component={BestOfSlooh} />
        <Route path="object-post" component={ObjectPost} />

        <Route path="my-pictures" component={MyPictures}>
          <IndexRedirect to="photo-roll" />
          <Route path="photo-roll" component={PhotoRoll} />
          <Route path="favorites" component={Favorites} />
          <Route path="galleries" component={Galleries} />
          <Route path="missions" component={Missions} />
          <Route path="slooh-most-popular" component={SloohMostPopular} />
        </Route>

      </Route>

    </Router>
  </Provider>,
  document.getElementById('app'),
);
