import { ADD_STORAGE, DELETE_STORAGE, IS_AUTHENTICATED, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from './constants';

export const setAuthenticatedAC = (payload: { isAuth: boolean }) => {
  return { type: IS_AUTHENTICATED, payload };
};
export const loginAC = (payload: { password: string; email: string }) => {
  return { type: LOGIN, payload };
};
export const loginErrorAC = (payload: { errorMassage: string }) => {
  return { type: LOGIN_ERROR, payload };
};
export const logoutAC = () => {
  return { type: LOGOUT };
};
export const addStorageAC = (payload: { newAddressStorage: string; newStorage: string }) => {
  return { type: ADD_STORAGE, payload };
};
export const loginSuccessAC = (payload: {
  token: string;
  userAddressesStorages: string[];
  userEmail: string;
  userId: number;
  userStorages: string[];
}) => {
  return { type: LOGIN_SUCCESS, payload };
};
export const deleteStorageAC = (payload: {
  storageToDelete: {
    address: string;
    id: number;
    name: string;
    userId: number;
  };
}) => {
  return { type: DELETE_STORAGE, payload };
};
