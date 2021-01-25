import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import deliveryReducer from './delivery/deliveryReducer';
import userReducer from './user/userReducer';
import sagaWatcher from './user/sagas';

const sagaMiddleware = createSagaMiddleware();

let reducers = combineReducers({
  deliveryReducer,
  userReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware)));

sagaMiddleware.run(sagaWatcher);
export default store;
