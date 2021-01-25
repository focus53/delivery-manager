import { StateInterfaces } from '../interfaces';

export const haveAddressSelector = (state: StateInterfaces) => {
  return state.deliveryReducer.routing.map((e) => e.date);
};

export const selectedStorageSelector = (state: StateInterfaces) => {
  return state.deliveryReducer.selectedStorage;
};

export const routingSelector = (state: StateInterfaces) => {
  return state.deliveryReducer.routing;
};

export const selectedDateSelector = (state: StateInterfaces) => {
  return state.deliveryReducer.selectedDate;
};

export const mapsLinkSelector = (state: StateInterfaces) => {
  return state.deliveryReducer.mapsLink;
};

export const defaultLinksSelector = (state: StateInterfaces) => {
  return state.deliveryReducer.mapsLink;
};
