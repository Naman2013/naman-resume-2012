// import 'event-source-polyfill/src/eventsource';
import './sentry.config';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

import AppRouter from 'app/router';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// load monitoring and global error handling
import './monitoring';
// providers
import I18nProvider from './providers/I18nProvider';
// redux store
import store from 'app/store';
// utilities
import './utils/manual-polyfills';
import './i18n';

// styles
import './styles/index.scss';

window.EventSource = NativeEventSource || EventSourcePolyfill;

ReactDOM.render(
  <I18nProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </I18nProvider>,
  window.document.getElementById('app')
);
