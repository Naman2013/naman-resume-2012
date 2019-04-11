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
// utilities
import './utils/manual-polyfills';

// styles
import './styles/index.scss';

ReactDOM.render(
  <I18nProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </I18nProvider>,
  window.document.getElementById('app')
);
