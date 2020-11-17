const SELECTED_DATE = 'SELECTED_DATE';
const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';
const HAVE_ADDRESS = 'HAVE_ADDRESS';
const DELETE_ADDRESS = 'DELETE_ADDRESS';
const UPDATE_LINK_TO_MAPS = 'UPDATE_LINK_TO_MAPS';
const SET_START_POINT = 'SET_START_POINT';

const initialState = {
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
        ],
      };

    case UPDATE_LINK_TO_MAPS:
      // let baseURL = 'https://www.google.com/maps/dir/Jacobsenweg+41,+13509+Berlin';
      return {
        ...state,
        routing: [
          ...state.routing.map((obj) => {
            if (obj.date === action.payload.selectedDate) {
              obj.addresses.forEach((element) => {
                state.startURL = `${state.startURL}/${element}`;
              });
              return { ...obj, mapsURL: `${state.startURL}` };
            }
            return obj;
          }),
        ],
      };

    case SET_START_POINT:
      return { ...state, startURL: `${state.baseURL}${action.payload.startValue}` };

    default:
      return state;
  }
};

// Thunk creators
export const selectDateTC = (date) => (dispatch) => {
  dispatch(selectedDateAC(date));
};

export const addNewAddressTC = (formData, selectedDate) => (dispatch) => {
  dispatch(addNewAddressAC({ formData, selectedDate }));
};

export const haveAddressTC = (date) => (dispatch) => {
  dispatch(haveAddressAC(date));
};

export const deleteAddressTC = (index, selectedDate) => (dispatch) => {
  dispatch(deleteAddressAC({ index, selectedDate }));
};

export const updateLinkToMapsTC = (selectedDate) => (dispatch) => {
  dispatch(updateLinkToMapsAC({ selectedDate }));
};

export const setStartPointTC = (startValue) => (dispatch) => {
  dispatch(setStartPointAC({ startValue }));
};

export default addressReducer;
