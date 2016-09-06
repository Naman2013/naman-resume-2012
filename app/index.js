import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
import App from './containers/App';
import Home from './containers/Home';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './styles/interface.css';
import './styles/animations.scss';

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
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
// FIXME: ids unnecessary
