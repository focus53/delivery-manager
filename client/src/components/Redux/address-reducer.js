import { dateAPI } from '../../api/api';

const SELECTED_DATE = 'SELECTED_DATE';
const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';
const HAVE_ADDRESS = 'HAVE_ADDRESS';
const DELETE_ADDRESS = 'DELETE_ADDRESS';
const UPDATE_LINK_TO_MAPS = 'UPDATE_LINK_TO_MAPS';
const SET_LINKS_TO_MAPS = 'SET_LINKS_TO_MAPS';
const SET_START_POINT = 'SET_START_POINT';
const SET_ADDRESSES = 'SET_ADDRESSES';
const ADD_NEW_ADDRESS_STORAGE = 'ADD_NEW_ADDRESS_STORAGE';
const SELECTED_STORAGE = 'SELECTED_STORAGE';

const initialState = {
  baseURL: 'https://www.google.com/maps/dir/',
  selectedDate: '',
  routing: [],
  haveAddress: [],
  mapsLink: {},
  selectedStorage: null,
};

// Action creators
const selectedDateAC = (payload) => {
  return { type: SELECTED_DATE, payload };
};
const addNewAddressAC = (payload) => {
  return { type: ADD_NEW_ADDRESS, payload };
};
const haveAddressAC = (payload) => {
  return { type: HAVE_ADDRESS, payload };
};
const deleteAddressAC = (payload) => {
  return { type: DELETE_ADDRESS, payload };
};
const updateLinkToMapsAC = (payload) => {
  return { type: UPDATE_LINK_TO_MAPS, payload };
};
const setLinksToMapsAC = (payload) => {
  return { type: SET_LINKS_TO_MAPS, payload };
};
const setAddressesAC = (payload) => {
  return { type: SET_ADDRESSES, payload };
};
const selectedStorageAC = (payload) => {
  return { type: SELECTED_STORAGE, payload };
};

// Reducer
const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_DATE:
      return { ...state, selectedDate: action.payload };

    case ADD_NEW_ADDRESS:
      let newAddress = {
        date: action.payload.selectedDate,
        [action.payload.storage]: [action.payload.delivery],
      };

      if (state.routing.some((obj) => obj.date === action.payload.selectedDate)) {
        return {
          ...state,
          routing: [
            ...state.routing.map((obj) => {
              if (obj.date === action.payload.selectedDate) {
                if (obj[action.payload.storage]) {
                  return {
                    ...obj,
                    [action.payload.storage]: [...obj[action.payload.storage], action.payload.delivery],
                  };
                }
                return { ...obj, [action.payload.storage]: [action.payload.delivery] };
              }
              return obj;
            }),
          ],
        };
      }
      return { ...state, routing: [...state.routing, newAddress] };

    case HAVE_ADDRESS:
      return { ...state, haveAddress: [...state.haveAddress, action.payload] };

    case DELETE_ADDRESS:
      return {
        ...state,
        routing: [
          ...state.routing.map((obj) => {
            if (obj.date === action.payload.selectedDate) {
              let newObj = {
                ...obj,
                [action.payload.storage]: [...obj[action.payload.storage]],
              };

              newObj[action.payload.storage].splice(action.payload.index, 1);
              return newObj;
            }
            return obj;
          }),
        ].filter((routingEl) => {
          let newRoutingEl = Object.keys(routingEl).filter((el) =>
            action.payload.storages.some((strEl) => strEl === el)
          );
          return newRoutingEl.some((storagesEl) => routingEl[storagesEl].length >= 1);
        }),
      };

    case SET_LINKS_TO_MAPS:
      return {
        ...state,
        routing: [
          ...state.routing.map((obj) => {
            let mapsLinks = {};
            action.payload.storages.forEach((element, index) => {
              if (obj[element]) {
                mapsLinks[element] =
                  state.baseURL +
                  action.payload.userAddressesStorages[index] +
                  obj[element].reduce((acc, currentVal) => {
                    return `${acc}/${currentVal.address}`;
                  }, '');
              }
            });
            return { ...obj, mapsLinks };
          }),
        ],
      };

    case SET_START_POINT:
      return { ...state, startURL: `${state.baseURL}${action.payload.startValue}` };

    case SET_ADDRESSES:
      return {
        ...state,
        routing: action.payload.data.date.map((obj) => {
          return obj;
        }),
      };

    case UPDATE_LINK_TO_MAPS:
      return {
        ...state,
        routing: [
          ...state.routing.map((obj) => {
            if (obj.date === action.payload.selectedDate) {
              const index = action.payload.storages.findIndex((el) => el === action.payload.storage);
              let newLink =
                state.baseURL +
                action.payload.userAddressesStorages[index] +
                obj[action.payload.storage].reduce((acc, currentVal) => {
                  return `${acc}/${currentVal.address}`;
                }, '');

              return { ...obj, mapsLinks: { ...obj.mapsLinks, [action.payload.storage]: newLink } };
            }
            return obj;
          }),
        ],
      };

    case ADD_NEW_ADDRESS_STORAGE:
      return {
        ...state,
        mapsLink: { ...state.mapsLink, [action.payload.storageName]: state.baseURL + action.payload.address },
      };

    case SELECTED_STORAGE:
      return { ...state, selectedStorage: action.payload.key };

    default:
      return state;
  }
};

// Thunk creators
export const setDateTC = (selectedDate, token) => async (dispatch, getState) => {
  const getDates = await dateAPI.getDate(token);
  const storages = getState().userReducer.userStorages;
  const userAddressesStorages = getState().userReducer.userAddressesStorages;
  dispatch(setAddressesAC(getDates));
  dispatch(setLinksToMapsAC({ selectedDate, storages, userAddressesStorages }));
};

export const selectDateTC = (date) => (dispatch) => {
  dispatch(selectedDateAC(date));
};

export const addNewAddressTC = (address, selectedDate, storage, userId) => async (dispatch, getState) => {
  const response = await dateAPI.newDate(selectedDate, address, storage, userId);
  if (response) {
    dispatch(
      addNewAddressAC({ selectedDate: response.data.newDelivery.date, delivery: response.data.newDelivery, storage })
    );
    dispatch(updateLinkToMapsTC(selectedDate, storage, address));
  }
};

export const haveAddressTC = (date) => (dispatch) => {
  dispatch(haveAddressAC(date));
};

export const deleteAddressTC = (index, selectedDate, storage, storages, deliveryId) => async (dispatch) => {
  const response = await dateAPI.deleteDate(deliveryId);
  if (response) {
    dispatch(deleteAddressAC({ index, selectedDate, storage, storages }));
    dispatch(updateLinkToMapsTC(selectedDate, storage));
  }
};

export const updateLinkToMapsTC = (selectedDate, storage, newAddress) => (dispatch, getState) => {
  const userAddressesStorages = getState().userReducer.userAddressesStorages;
  const storages = getState().userReducer.userStorages;
  dispatch(updateLinkToMapsAC({ selectedDate, storage, newAddress, userAddressesStorages, storages }));
};

export const setLinksToMapsTC = (selectedDate) => (dispatch) => {
  dispatch(setLinksToMapsAC({ selectedDate }));
};

export const selectedStorageTC = (key) => (dispatch) => {
  dispatch(selectedStorageAC({ key }));
};

export default addressReducer;
