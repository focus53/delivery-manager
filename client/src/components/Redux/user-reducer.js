import { userAPI } from '../../api/api';

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT = 'LOGOUT';
const ADD_STORAGE = 'ADD_STORAGE';

const setAuthenticatedAC = (payload) => {
  return { type: IS_AUTHENTICATED, payload };
};
const loginAC = (payload) => {
  return { type: LOGIN, payload };
};
const loginErrorAC = (payload) => {
  return { type: LOGIN_ERROR, payload };
};
const logoutAC = (payload) => {
  return { type: LOGOUT, payload };
};
const addStorageAC = (payload) => {
  return { type: ADD_STORAGE, payload };
};
const loginSuccessAC = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};

const initialState = {
  isAuthenticated: false,
  userId: null,
  userEmail: null,
  token: null,
  userStorages: [],
  userAddressesStorages: [],
  errorMassage: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload.isAuth };

    case LOGIN_SUCCESS:
      return {
        ...state,
        userEmail: action.payload.userEmail,
        userId: action.payload.userId,
        token: action.payload.token,
        userStorages: action.payload.userStorages,
        userAddressesStorages: action.payload.userAddressesStorages,
      };

    case LOGIN_ERROR:
      return { ...state, loginError: action.payload.errorMassage };

    case LOGOUT:
      return { ...state, userId: null, token: null };

    case ADD_STORAGE:
      return {
        ...state,
        userStorages: [...state.userStorages, action.payload.newStorage],
        userAddressesStorages: [...state.userAddressesStorages, action.payload.newAddressStorage],
      };

    default:
      return state;
  }
};

export const setAuthenticatedTC = (isAuth) => (dispatch) => {
  dispatch(setAuthenticatedAC({ isAuth }));
};

export const loginTC = (userEmail, password, warning) => async (dispatch) => {
  dispatch(loginAC({ userEmail, password, warning }));
};

export const isLoginTC = () => async (dispatch, getState) => {
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
  localStorage.removeItem('userData');
};

export const registerTC = (userEmail, password, warning) => async (dispatch) => {
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

export default userReducer;
