export const haveAddressSelector = (state) => {
  return state.deliveryReducer.routing.map((e) => e.date);
};

export const selectedStorageSelector = (state) => {
  return state.deliveryReducer.selectedStorage;
};

export const routingSelector = (state) => {
  return state.deliveryReducer.routing;
};

export const selectedDateSelector = (state) => {
  return state.deliveryReducer.selectedDate;
};

export const mapsLinkSelector = (state) => {
  return state.deliveryReducer.mapsLink;
};

export const defaultLinksSelector = (state) => {
  return state.mapsLink;
};
