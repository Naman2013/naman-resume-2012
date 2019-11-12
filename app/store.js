import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import reducers from './modules/Reducers';
import callAPIMiddleware from './modules/middleware/callAPIMiddleware';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const enhancers = compose(
  applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
    callAPIMiddleware,
    routerMiddleware(browserHistory)
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);
const store = createStore(reducers, enhancers);
sagaMiddleware.run(rootSaga);

export default store;
