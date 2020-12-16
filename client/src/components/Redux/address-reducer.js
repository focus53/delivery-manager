import { dateAPI } from '../../api/api';

const SELECTED_DATE = 'SELECTED_DATE';
const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';
const HAVE_ADDRESS = 'HAVE_ADDRESS';
const DELETE_ADDRESS = 'DELETE_ADDRESS';
const UPDATE_LINK_TO_MAPS = 'UPDATE_LINK_TO_MAPS';
const SET_START_POINT = 'SET_START_POINT';
const SET_ADDRESSES = 'SET_ADDRESSES';
const ADD_NEW_ADDRESS_STORAGE = 'ADD_NEW_ADDRESS_STORAGE';

const initialState = {
  storages: ['ADK', 'JAC', 'VER', 'SHR'],
  baseURL: 'https://www.google.com/maps/dir/',
  startURL: '',
  selectedDate: '',
  routing: [],
  haveAddress: [],
<<<<<<< HEAD
=======
  mapsLink: {
    ADK: 'https://www.google.de/maps/dir/Preishalle+24-Marzahn,+Allee+der+Kosmonauten+26,+12681+Berlin',
    JAC: 'https://www.google.de/maps/dir/Preishalle24-Reinickendorf,+Jacobsenweg+41,+13509+Berlin',
    VER: 'https://www.google.de/maps/dir/Preishalle24-Verlorenwasser,+14806+Bad+Belzig',
    SHR: 'https://www.google.de/maps/dir/Sophie-Charlotten-Straße+1,+14059+Berlin',
  },
>>>>>>> c27eb70... refactor: Delete
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
const setStartPointAC = (payload) => {
  return { type: SET_START_POINT, payload };
};
const setAddressesAC = (payload) => {
  return { type: SET_ADDRESSES, payload };
};
const addNewAddressStorageAC = (payload) => {
  return { type: ADD_NEW_ADDRESS_STORAGE, payload };
};

// Reducer
const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_DATE:
      return { ...state, selectedDate: action.payload };

    case ADD_NEW_ADDRESS:
      let newAddress = {
        date: action.payload.selectedDate,
        addresses: [action.payload.formData],
      };

      if (state.routing.some((obj) => obj.date === action.payload.selectedDate)) {
        return {
          ...state,
          routing: [
            ...state.routing.map((obj) => {
              if (obj.date === action.payload.selectedDate) {
                return {
                  ...obj,
                  addresses: [...obj.addresses, action.payload.formData],
                };
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
<<<<<<< HEAD
              let newObj = { ...obj, addresses: [...obj.addresses] };
              newObj.addresses.splice(action.payload.index, 1);
=======
              let newObj = {
                ...obj,
                [action.payload.storage]: [...obj[action.payload.storage]],
              };

              newObj[action.payload.storage].splice(action.payload.index, 1);
>>>>>>> c27eb70... refactor: Delete
              return newObj;
            }
            return obj;
          }),
<<<<<<< HEAD
        ].filter((el) => el.addresses.length >= 1),
=======
        ].filter((routingEl) => {
          let newRoutingEl = Object.keys(routingEl).filter((el) =>
            action.payload.storages.some((strEl) => strEl === el)
          );
          return newRoutingEl.some((storagesEl) => routingEl[storagesEl].length >= 1);
        }),
>>>>>>> c27eb70... refactor: Delete
      };

    case UPDATE_LINK_TO_MAPS:
      // let baseURL = 'https://www.google.com/maps/dir/Jacobsenweg+41,+13509+Berlin';
      return {
        ...state,
        routing: [
          ...state.routing.map((obj) => {
<<<<<<< HEAD
            if (obj.date === action.payload.selectedDate) {
              obj.addresses.forEach((element) => {
                state.startURL = `${state.startURL}/${element}`;
              });
              return { ...obj, mapsURL: `${state.startURL}` };
            }
            return obj;
=======
            let mapsLinks = {};
            state.storages.forEach((element) => {
              if (obj[element]) {
                mapsLinks[element] =
                  state.mapsLink[element] +
                  obj[element].reduce((acc, currentVal) => {
                    return `${acc}/${currentVal}`;
                  }, '');
              }
            });
            return { ...obj, mapsLinks };
>>>>>>> 4406587... refactor: update reducer + links
          }),
        ],
      };

    case SET_START_POINT:
      return { ...state, startURL: `${state.baseURL}${action.payload.startValue}` };

    case SET_ADDRESSES:
      return {
        ...state,
<<<<<<< HEAD
        routing: action.payload.data.date.map((obj) => ({ date: obj.date, addresses: obj.addresses })),
=======
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
              let newLink =
                state.mapsLink[action.payload.storage] +
                obj[action.payload.storage].reduce((acc, currentVal) => {
                  return `${acc}/${currentVal}`;
                }, '');

              return { ...obj, mapsLinks: { ...obj.mapsLinks, [action.payload.storage]: newLink } };
            }
            return obj;
          }),
        ],
>>>>>>> 4406587... refactor: update reducer + links
      };

    case ADD_NEW_ADDRESS_STORAGE:
      return {
        ...state,
        mapsLink: { ...state.mapsLink, [action.payload.storageName]: state.baseURL + action.payload.address },
        storages: [...state.storages, action.payload.storageName],
      };

    default:
      return state;
  }
};

// Thunk creators
export const setDateTC = (selectedDate, token) => async (dispatch) => {
  const getDate = await dateAPI.getDate(token);
  dispatch(setAddressesAC(getDate));
};

export const selectDateTC = (date) => (dispatch) => {
  dispatch(selectedDateAC(date));
};

<<<<<<< HEAD
<<<<<<< HEAD
export const addNewAddressTC = (formData, selectedDate) => async (dispatch) => {
  const response = await dateAPI.newDate(selectedDate, formData);
  dispatch(addNewAddressAC({ selectedDate: response.data.date, formData: response.data.address }));
=======
export const addNewAddressTC = (address, selectedDate, storage) => async (dispatch) => {
  const response = await dateAPI.newDate(selectedDate, address, storage);
  await dispatch(addNewAddressAC({ selectedDate: response.data.date, address: response.data.address, storage }));
=======
export const addNewAddressTC = (address, selectedDate, storage, userId) => async (dispatch) => {
  const response = await dateAPI.newDate(selectedDate, address, storage, userId);
  dispatch(addNewAddressAC({ selectedDate: response.data.date, address: response.data.address, storage }));
>>>>>>> 1a7d319... add: Register with token
  dispatch(updateLinkToMapsAC({ selectedDate, storage, address }));
>>>>>>> 4406587... refactor: update reducer + links
};

export const haveAddressTC = (date) => (dispatch) => {
  dispatch(haveAddressAC(date));
};

<<<<<<< HEAD
export const deleteAddressTC = (index, selectedDate) => async (dispatch) => {
  const response = await dateAPI.deleteDate(index, selectedDate);
  if (response) {
    dispatch(deleteAddressAC({ index, selectedDate }));
=======
export const deleteAddressTC = (index, selectedDate, storage, storages) => async (dispatch) => {
  const response = await dateAPI.deleteDate(index, selectedDate, storage, storages);
  if (response) {
    dispatch(deleteAddressAC({ index, selectedDate, storage, storages }));
    dispatch(updateLinkToMapsAC({ selectedDate, storage }));
>>>>>>> c27eb70... refactor: Delete
  }
};

export const updateLinkToMapsTC = (selectedDate) => (dispatch) => {
  dispatch(updateLinkToMapsAC({ selectedDate }));
};

export const setStartPointTC = (startValue) => (dispatch) => {
  dispatch(setStartPointAC({ startValue }));
};

export const addNewAddressStorageTC = (address, storageName) => (dispatch) => {
  dispatch(addNewAddressStorageAC({ address, storageName }));
};

export default addressReducer;
