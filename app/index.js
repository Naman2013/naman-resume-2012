import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import configureStore from './store';

// containers
import App from './containers/App';
import Reservations from './containers/Reservations';
import SloohRecommends from './containers/SloohRecommends';

// pages
import Home from './pages/home';
import TelescopeOverview from './pages/telescope-overview';
import TelescopeDetails from './pages/telescope-details/telescope-details';
import ReserveMissions from './pages/reserve-missions';
import NewMissions from './pages/new-missions';
import ExistingMissions from './pages/existing-missions';
import ReserveByTelescope from './pages/reserve-by-telescope';
import ReserveObjects from './pages/reserve/reserve-by-objects';
import BestOfSlooh from './pages/best-of-slooh/best-of-slooh';
import ObjectPost from './pages/object-post/object-post';

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

          <Route path="/slooh-recommends" component={SloohRecommends}>
            <IndexRoute component={ExistingMissions} />
            <Route path="existing" name="existing-missions" component={ExistingMissions} />
            <Route path="new" name="new-missions" component={NewMissions} />
          </Route>

          <Route path="reserve-by-objects" component={ReserveObjects} />
          <Route path="reserve-by-telescope" component={ReserveByTelescope} />
        </Route>

        <Route path="telescope-details/:obsUniqueId/:teleUniqueId" component={TelescopeDetails} />

        <Route path="best-of-slooh" component={BestOfSlooh} />
        <Route path="object-post" component={ObjectPost} />

      </Route>

    </Router>
  </Provider>,
  document.getElementById('app'),
);
