import { userAPI } from '../../api/api';

const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
const LOGIN = 'LOGIN';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';

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
const registerAC = (payload) => {
  return { type: REGISTER, payload };
};

const initialState = {
  isAuthenticated: false,
  userEmail: null,
  password: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload.isAuth };
    case LOGIN:
      return { ...state, userEmail: action.payload.userEmail, password: action.payload.password };
    case LOGIN_ERROR:
      return { ...state, loginError: action.payload.errorMassage };
    case LOGOUT:
      return { ...state, userEmail: null, password: null };
    case REGISTER:
      return { ...state };
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

    dispatch(loginAC({ userEmail: response.data.email, password: response.data.password }));
    dispatch(setAuthenticatedAC({ isAuth: true }));
    localStorage.setItem(
      'userData',
      JSON.stringify({ userEmail: response.data.email, password: response.data.password })
    );
  } catch (e) {
    dispatch(loginErrorAC({ errorMassage: e.response.data.message }));
    console.log(e.response.data.message);
  }
};

export const isLoginTC = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData) {
    dispatch(loginAC({ userEmail: userData.userEmail, password: userData.password }));
    dispatch(setAuthenticatedAC({ isAuth: true }));
  }
};

export const logoutTC = () => async (dispatch) => {
  dispatch(logoutAC());
  dispatch(setAuthenticatedAC({ isAuth: false }));
  localStorage.removeItem('userData');
};

export const registerTC = (userEmail, password) => async (dispatch) => {
  const response = await userAPI.registerUser(userEmail, password);
  dispatch(registerAC({ userEmail, password }));
};

export default userReducer;
