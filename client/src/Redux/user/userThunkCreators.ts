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

export const setAuthenticatedTC = (isAuth: boolean) => (dispatch: any) => {
  dispatch(setAuthenticatedAC({ isAuth }));
};

export const loginTC = (email: string, password: string) => async (dispatch: any) => {
  dispatch(loginAC({ password, email }));
};

export const isLoginTC = () => async (dispatch: any) => {
  const userData = JSON.parse(<string>localStorage.getItem('userData'));

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

export const logoutTC = () => async (dispatch: any) => {
  dispatch(logoutAC());
  dispatch(setAuthenticatedAC({ isAuth: false }));
  // @TODO leave just a token
  localStorage.removeItem('userData');
};

export const registerTC = (userEmail: string, password: string) => async (dispatch: any) => {
  try {
    const registerUser = await userAPI.registerUser(userEmail, password);
    if (registerUser.status === 201) {
      dispatch(loginTC(userEmail, password));
    }
  } catch (e) {
    warning(e.response.data.message);
  }
};

export const addStorageTC = (newStorage: string, newAddressStorage: string, userId: number | null) => async (
  dispatch: any
) => {
  const response = await userAPI.addStorage(newStorage, newAddressStorage, userId);
  if (response.status === 201) {
    dispatch(addStorageAC({ newStorage, newAddressStorage }));
  }
};

export const deleteStorageTC = (storageName: string, userId: number | null) => async (dispatch: any) => {
  const response = await userAPI.deleteStorage(storageName, userId);
  dispatch(deleteStorageAC({ storageToDelete: response.data.storageToDelete }));
};
