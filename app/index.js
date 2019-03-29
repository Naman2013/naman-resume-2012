import 'babel-polyfill'; // todo remove me, use babel 7
import 'event-source-polyfill/eventsource.min';
import AppRouter from 'app/router';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// load monitoring and global error handling
import './monitoring';
// providers
import I18nProvider from './providers/I18nProvider';
// redux store
import store from './store';
import 'animate.css/animate.css';
import './styles/animations.scss';
import './styles/app.scss';
import './styles/interface.css';
// Bootstrap 4
import './styles/bootstrap/index.scss';

import './styles/static.scss';
// utilities
import './utils/manual-polyfills';

// icons
import 'assets/icons/iconmoon/style.css';

import 'react-tippy/dist/tippy.css';

ReactDOM.render(
  <I18nProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </I18nProvider>,
  window.document.getElementById('app')
);
