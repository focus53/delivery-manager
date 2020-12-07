import { dateAPI } from '../../api/api';

const SELECTED_DATE = 'SELECTED_DATE';
const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';
const HAVE_ADDRESS = 'HAVE_ADDRESS';
const DELETE_ADDRESS = 'DELETE_ADDRESS';
const UPDATE_LINK_TO_MAPS = 'UPDATE_LINK_TO_MAPS';
const SET_START_POINT = 'SET_START_POINT';
const SET_ADDRESSES = 'SET_ADDRESSES';

const initialState = {
  storages: ['ADK', 'JAC', 'VER'],
  baseURL: 'https://www.google.com/maps/dir/',
  startURL: '',
  selectedDate: '',
  routing: [],
  haveAddress: [],
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
              let newObj = { ...obj, addresses: [...obj.addresses] };
              newObj.addresses.splice(action.payload.index, 1);
              return newObj;
            }
            return obj;
          }),
        ].filter((el) => el.addresses.length >= 1),
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

    default:
      return state;
  }
};

// Thunk creators
export const setDateTC = (selectedDate) => async (dispatch) => {
  const getDate = await dateAPI.getDate(selectedDate);
  dispatch(setAddressesAC(getDate));
};

export const selectDateTC = (date) => (dispatch) => {
  dispatch(selectedDateAC(date));
};

<<<<<<< HEAD
export const addNewAddressTC = (formData, selectedDate) => async (dispatch) => {
  const response = await dateAPI.newDate(selectedDate, formData);
  dispatch(addNewAddressAC({ selectedDate: response.data.date, formData: response.data.address }));
=======
export const addNewAddressTC = (address, selectedDate, storage) => async (dispatch) => {
  const response = await dateAPI.newDate(selectedDate, address, storage);
  await dispatch(addNewAddressAC({ selectedDate: response.data.date, address: response.data.address, storage }));
  dispatch(updateLinkToMapsAC({ selectedDate, storage, address }));
>>>>>>> 4406587... refactor: update reducer + links
};

export const haveAddressTC = (date) => (dispatch) => {
  dispatch(haveAddressAC(date));
};

export const deleteAddressTC = (index, selectedDate) => async (dispatch) => {
  const response = await dateAPI.deleteDate(index, selectedDate);
  if (response) {
    dispatch(deleteAddressAC({ index, selectedDate }));
  }
};

export const updateLinkToMapsTC = (selectedDate) => (dispatch) => {
  dispatch(updateLinkToMapsAC({ selectedDate }));
};

export const setStartPointTC = (startValue) => (dispatch) => {
  dispatch(setStartPointAC({ startValue }));
};

export default addressReducer;
