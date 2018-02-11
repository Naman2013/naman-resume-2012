import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './modules/Reducers';
import callAPIMiddleware from './modules/middleware/callAPIMiddleware';

function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        callAPIMiddleware,
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );
}

export default configureStore();
