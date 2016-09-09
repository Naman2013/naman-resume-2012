import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './modules/Reducers';
import callAPIMiddleware from './modules/middleware/callAPIMiddleware';
import createLogger from 'redux-logger';

const logger = createLogger();

export default function configureStore(initialState) {
  let store = createStore(reducers, initialState, compose(
    applyMiddleware( thunkMiddleware, callAPIMiddleware, logger ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;

}
