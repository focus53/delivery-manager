import { call, put, takeEvery } from 'redux-saga/effects';
import { userAPI } from '../../api/api';
import { IS_AUTHENTICATED, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from './user-reducer';

function* sagaWorker(action) {
  try {
    const response = yield call(async () => {
      return await userAPI.getUser(action.payload.userEmail, action.payload.password);
    });

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: response.data.userId,
        token: response.data.token,
      })
    );

    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        userId: response.data.userId,
        token: response.data.token,
        userStorages: response.data.userStorages,
        userAddressesStorages: response.data.userAddressesStorages,
      },
    });
    yield put({ type: IS_AUTHENTICATED, payload: { isAuth: true } });
  } catch (e) {
    yield put({ type: LOGIN_ERROR, payload: { errorMassage: e.response.data.message } });
    action.payload.warning(e.response.data.message);
  }
}

export default function* sagaWatcher() {
  yield takeEvery(LOGIN, sagaWorker);
}
