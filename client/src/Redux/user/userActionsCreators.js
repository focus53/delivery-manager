import { ADD_STORAGE, DELETE_STORAGE, IS_AUTHENTICATED, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from './constants';

export const setAuthenticatedAC = (payload) => {
  return { type: IS_AUTHENTICATED, payload };
};
export const loginAC = (payload) => {
  return { type: LOGIN, payload };
};
export const loginErrorAC = (payload) => {
  return { type: LOGIN_ERROR, payload };
};
export const logoutAC = (payload) => {
  return { type: LOGOUT, payload };
};
export const addStorageAC = (payload) => {
  return { type: ADD_STORAGE, payload };
};
export const loginSuccessAC = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};
export const deleteStorageAC = (payload) => {
  return { type: DELETE_STORAGE, payload };
};
