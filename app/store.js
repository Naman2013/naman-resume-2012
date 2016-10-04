import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './modules/Reducers';
import callAPIMiddleware from './modules/middleware/callAPIMiddleware';
import createLogger from 'redux-logger';

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
        callAPIMiddleware        
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
