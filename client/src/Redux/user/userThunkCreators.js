import { userAPI } from '../../api/api';
import { warning } from '../../utils/warning';
import {
  addStorageAC,
  deleteStorageAC,
  loginAC,
  loginErrorAC,
  loginSuccessAC,
  logoutAC,
  setAuthenticatedAC,
} from './userActionsCreators';

export const setAuthenticatedTC = (isAuth) => (dispatch) => {
  dispatch(setAuthenticatedAC({ isAuth }));
};

export const loginTC = (userEmail, password) => async (dispatch) => {
  dispatch(loginAC({ userEmail, password }));
};

export const isLoginTC = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData) {
    const user = await userAPI.getStorages(userData.token);

    dispatch(
      loginSuccessAC({
        userId: userData.userId,
        token: userData.token,
        userEmail: userData.userEmail,
        userStorages: user.data.userStorages,
        userAddressesStorages: user.data.userAddressesStorages,
      })
    );

    dispatch(setAuthenticatedAC({ isAuth: !!userData.token }));
    dispatch(loginErrorAC({ errorMassage: '' }));
  }
};

export const logoutTC = () => async (dispatch) => {
  dispatch(logoutAC());
  dispatch(setAuthenticatedAC({ isAuth: false }));
  // @TODO leave just a token
  localStorage.removeItem('userData');
};

export const registerTC = (userEmail, password) => async (dispatch) => {
  try {
    const registerUser = await userAPI.registerUser(userEmail, password);
    if (registerUser.status === 201) {
      dispatch(loginTC(userEmail, password));
    }
  } catch (e) {
    warning(e.response.data.message);
  }
};

export const addStorageTC = (newStorage, newAddressStorage, userId) => async (dispatch) => {
  const response = await userAPI.addStorage(newStorage, newAddressStorage, userId);
  if (response.status === 201) {
    dispatch(addStorageAC({ newStorage, newAddressStorage }));
  }
};

export const deleteStorageTC = (storageName) => async (dispatch) => {
  const response = await userAPI.deleteStorage(storageName);
  dispatch(deleteStorageAC({ storageToDelete: response.data.storageToDelete }));
};
