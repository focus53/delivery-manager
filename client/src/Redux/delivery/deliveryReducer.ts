import {
  SELECTED_DATE,
  ADD_NEW_ADDRESS,
  HAVE_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_LINK_TO_MAPS,
  SET_LINKS_TO_MAPS,
  SET_START_POINT,
  SET_ADDRESSES,
  ADD_NEW_ADDRESS_STORAGE,
  SELECTED_STORAGE,
} from './constants';
import { Delivery, DeliveryInterface } from './deliveryInterface';
import { setAddressAC } from './deliveryActionsCreators';

const initialState: DeliveryInterface = {
  baseURL: 'https://www.google.com/maps/dir/',
  selectedDate: '',
  routing: [],
  haveAddress: [],
  mapsLink: {},
  selectedStorage: '',
};

// Reducer
const deliveryReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SELECTED_DATE:
      return { ...state, selectedDate: action.payload.date };

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
              // @ts-ignore
              newObj[action.payload.storage].splice(action.payload.index, 1);
              return newObj;
            }
            return obj;
          }),
        ].filter((routingEl) => {
          let newRoutingEl = Object.keys(routingEl).filter((el) =>
            action.payload.storages.some((strEl: string) => strEl === el)
          );
          // @ts-ignore
          return newRoutingEl.some((storagesEl) => routingEl[storagesEl].length >= 1);
        }),
      };

    case SET_LINKS_TO_MAPS:
      return {
        ...state,
        routing: [
          ...state.routing.map((obj) => {
            let mapsLinks = {};
            action.payload.storages.forEach((element: string, index: number) => {
              if (obj[element]) {
                // @ts-ignore
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
        routing: action.payload.date.map((obj: setAddressAC) => {
          return obj;
        }),
      };

    case UPDATE_LINK_TO_MAPS:
      return {
        ...state,
        routing: [
          ...state.routing.map((obj) => {
            if (obj.date === action.payload.selectedDate) {
              const index = action.payload.storages.findIndex((el: string) => el === action.payload.storage);
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

export default deliveryReducer;
