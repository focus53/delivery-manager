import { userAPI } from '../../api/api';

const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
const LOGIN = 'LOGIN';

const setAuthenticatedAC = (payload) => {
  return { type: IS_AUTHENTICATED, payload };
};
const loginAC = (payload) => {
  return { type: LOGIN, payload };
};

const initialState = {
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload.isAuth };
    case LOGIN:
      return { ...state, userEmail: action.payload.userEmail, password: action.payload.password };
    default:
      return state;
  }
};

export const setAuthenticatedTC = (isAuth) => (dispatch) => {
  dispatch(setAuthenticatedAC({ isAuth }));
};

export const loginTC = (userEmail, password) => async (dispatch) => {
  const response = await userAPI.getUser(userEmail, password);
  if (response.status === 200) {
    if (response.data.user.email === userEmail && response.data.user.password === password) {
      dispatch(loginAC({ userEmail, password }));
      dispatch(setAuthenticatedAC({ isAuth: true }));
    }
  }
};

export default userReducer;
