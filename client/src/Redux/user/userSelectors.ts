import { StateInterfaces } from '../interfaces';

export const tokenSelector = (state: StateInterfaces) => {
  return state.userReducer.token;
};

export const isAuthenticatedSelector = (state: StateInterfaces) => {
  return state.userReducer.isAuthenticated;
};

export const loginErrorSelector = (state: StateInterfaces) => {
  return state.userReducer.loginError;
};

export const userEmailSelector = (state: StateInterfaces) => {
  return state.userReducer.userEmail;
};

export const userIdSelector = (state: StateInterfaces) => {
  return state.userReducer.userId;
};

export const userStoragesSelector = (state: StateInterfaces) => {
  return state.userReducer.userStorages;
};

export const userAddressesStoragesSelector = (state: StateInterfaces) => {
  return state.userReducer.userAddressesStorages;
};
