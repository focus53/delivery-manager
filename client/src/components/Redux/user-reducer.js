import { userAPI } from '../../api/api';

const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
const LOGIN = 'LOGIN';
const LOGIN_ERROR = 'LOGIN_ERROR';
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

const initialState = {
  isAuthenticated: false,
  userId: null,
  token: null,
  userStorages: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload.isAuth };
    case LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        userStorages: action.payload.userStorages,
      };
    case LOGIN_ERROR:
      return { ...state, loginError: action.payload.errorMassage };
    case LOGOUT:
      return { ...state, userId: null, token: null };
    case ADD_STORAGE:
      return { ...state, userStorages: [...state.userStorages, action.payload.newStorage] };
    default:
      return state;
  }
};

export const setAuthenticatedTC = (isAuth) => (dispatch) => {
  dispatch(setAuthenticatedAC({ isAuth }));
};

export const loginTC = (userEmail, password) => async (dispatch, getState) => {
  try {
    const response = await userAPI.getUser(userEmail, password);
    if (!!response.data.token) {
      dispatch(
        loginAC({ userId: response.data.userId, token: response.data.token, userStorages: response.data.userStorages })
      );
      dispatch(setAuthenticatedAC({ isAuth: true }));

      localStorage.setItem('userData', JSON.stringify({ userId: response.data.userId, token: response.data.token }));
    }
  } catch (e) {
    // dispatch(loginErrorAC({ errorMassage: e.response.data.message }));
    // console.log(e.response.data.message);
  }
};

export const isLoginTC = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData) {
    const user = await userAPI.getStorages(userData.token);
    dispatch(loginAC({ userId: userData.userId, token: userData.token, userStorages: user.data.userStorages }));
    dispatch(setAuthenticatedAC({ isAuth: !!userData.token }));
    dispatch(loginErrorAC({ errorMassage: '' }));
  }
};

export const logoutTC = () => async (dispatch) => {
  dispatch(logoutAC());
  dispatch(setAuthenticatedAC({ isAuth: false }));
  localStorage.removeItem('userData');
};

export const registerTC = (userEmail, password) => async (dispatch) => {
  try {
    const registerUser = await userAPI.registerUser(userEmail, password);

    if (registerUser.status === 201) {
      dispatch(loginTC(userEmail, password));
    }
  } catch (e) {
    dispatch(loginErrorAC({ errorMassage: e.registerUser.data.message }));
    console.log(e.registerUser.data.message);
  }
};

export const addStorageTC = (newStorage, userId) => async (dispatch) => {
  const response = await userAPI.addStorage(newStorage, userId);
  if (response.status === 201) {
    
    dispatch(addStorageAC({ newStorage }));
  }
};

export default userReducer;
