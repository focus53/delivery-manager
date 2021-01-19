import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';

import deliveryReducer from './delivery/deliveryReducer';
import userReducer from './user/userReducer';
import sagaWatcher from './user/sagas';

const sagaMiddleware = createSagaMiddleware();

let reducers = combineReducers({
  deliveryReducer,
  userReducer,
  form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)));

sagaMiddleware.run(sagaWatcher);
export default store;
