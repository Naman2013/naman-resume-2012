import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './modules/Reducers';
import callAPIMiddleware from './modules/middleware/callAPIMiddleware';

export default createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    callAPIMiddleware,
  )
);
