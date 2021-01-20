export const tokenSelector = (state) => {
  return state.userReducer.token;
};

export const isAuthenticatedSelector = (state) => {
  return state.userReducer.isAuthenticated;
};

export const loginErrorSelector = (state) => {
  return state.userReducer.loginError;
};

export const userEmailSelector = (state) => {
  return state.userReducer.userEmail;
};

export const userIdSelector = (state) => {
  return state.userReducer.userId;
};

export const userStoragesSelector = (state) => {
  return state.userReducer.userStorages;
};

export const userAddressesStoragesSelector = (state) => {
  return state.userReducer.userAddressesStorages;
};
