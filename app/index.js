import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import configureStore from './store';

import App from './containers/App';
import Home from './containers/Home';

import TelescopeOverview from './pages/telescope-overview';
import ReserveMissions from './pages/reserve-missions';


import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './styles/app.scss';
import './styles/interface.css';
import './styles/animations.scss';

const store = configureStore();

var Wrapper = React.createClass({
  render: function () {
    return (
      <div style={{backgroundColor: '#999'}}>
        <h1> Header component </h1>
        {this.props.children}
      </div>
    )
  }
});

// var Countdown = React.createClass({
//   render: function () {
//     return <div>Countdown child component</div>
//   }
// });

var WelcomeStatement = React.createClass({
  render: function () {
    return <div>Keep looking up, {this.props.name}!</div>
  }
});


var PulseHeader = React.createClass({
  render: function() {
    return <div style={{backgroundColor: '#AAA'}}>
    <h2>Slooh Latest Pulse</h2>
    </div>
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>

      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/telescope-overview" component={TelescopeOverview} />
        <Route path="/recommendations" component={ReserveMissions} />
      </Route>

    </Router>
  </Provider>,
  document.getElementById('app'),
);
// FIXME: ids unnecessary
