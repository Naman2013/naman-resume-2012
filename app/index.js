import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';

// containers
import App from './containers/App';

// pages
import Home from './pages/home';
import TelescopeOverview from './pages/telescope-overview';
import ReserveMissions from './pages/reserve-missions';

// global styles
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './styles/app.scss';
import './styles/interface.css';
import './styles/animations.scss';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>

      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/telescope-overview" component={TelescopeOverview}>
          <Route path=":observatoryId" />
        </Route>
        <Route path="/recommendations" component={ReserveMissions} />
      </Route>

    </Router>
  </Provider>,
  document.getElementById('app'),
);
