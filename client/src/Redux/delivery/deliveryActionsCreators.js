// Action creators
import {
  ADD_NEW_ADDRESS,
  DELETE_ADDRESS,
  HAVE_ADDRESS,
  SELECTED_DATE,
  SELECTED_STORAGE,
  SET_ADDRESSES,
  SET_LINKS_TO_MAPS,
  UPDATE_LINK_TO_MAPS,
} from './constants';

export const selectedDateAC = (payload) => {
  return { type: SELECTED_DATE, payload };
};
export const addNewAddressAC = (payload) => {
  return { type: ADD_NEW_ADDRESS, payload };
};
export const haveAddressAC = (payload) => {
  return { type: HAVE_ADDRESS, payload };
};
export const deleteAddressAC = (payload) => {
  return { type: DELETE_ADDRESS, payload };
};
export const updateLinkToMapsAC = (payload) => {
  return { type: UPDATE_LINK_TO_MAPS, payload };
};
export const setLinksToMapsAC = (payload) => {
  return { type: SET_LINKS_TO_MAPS, payload };
};
export const setAddressesAC = (payload) => {
  return { type: SET_ADDRESSES, payload };
};
export const selectedStorageAC = (payload) => {
  return { type: SELECTED_STORAGE, payload };
};
