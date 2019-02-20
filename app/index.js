import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.css';
import 'event-source-polyfill/eventsource.min';
import { AppRouter } from 'app/router';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// load monitoring and global error handling
import './monitoring';
// providers
import I18nProvider from './providers/I18nProvider';
// redux store
import store from './store';
import './styles/animations.scss';
import './styles/app.scss';
import './styles/interface.css';

import './styles/static.scss';
// utilities
import './utils/manual-polyfills';

ReactDOM.render(
  <I18nProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </I18nProvider>,
  window.document.getElementById('app'),
);
