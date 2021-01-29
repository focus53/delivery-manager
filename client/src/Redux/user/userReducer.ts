import { IS_AUTHENTICATED, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, ADD_STORAGE, DELETE_STORAGE } from './constants';
import { UserInterface } from './userInterface';

const initialState: UserInterface = {
  isAuthenticated: false,
  userId: null,
  userEmail: null,
  token: null,
  userStorages: [],
  userAddressesStorages: [],
  errorMassage: null,
  loginError: null,
};

const userReducer = (state = initialState, action: { type: string; payload: any }) => {
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
      // @TODO token remove
      return { ...state, userId: null, token: null };

    case ADD_STORAGE:
      return {
        ...state,
        userStorages: [...state.userStorages, action.payload.newStorage],
        userAddressesStorages: [...state.userAddressesStorages, action.payload.newAddressStorage],
      };

    case DELETE_STORAGE:
      return {
        ...state,
        userStorages: state.userStorages.filter((el) => el !== action.payload.storageToDelete.name),
        userAddressesStorages: state.userAddressesStorages.filter(
          (el) => el !== action.payload.storageToDelete.address
        ),
      };

    default:
      return state;
  }
};

export default userReducer;
