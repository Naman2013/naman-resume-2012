import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import reducers from './modules/Reducers';
import callAPIMiddleware from './modules/middleware/callAPIMiddleware';

const logger = createLogger({
  duration: true,
  collapsed: true,
  diff: true,
});

export default function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        callAPIMiddleware,
        logger,
        routerMiddleware(hashHistory),
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );
}
