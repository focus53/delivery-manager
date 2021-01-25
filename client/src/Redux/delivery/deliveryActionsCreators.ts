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
import { Delivery } from './deliveryInterface';

export const selectedDateAC = (payload: { date: string }) => {
  return { type: SELECTED_DATE, payload };
};
export const addNewAddressAC = (payload: { selectedDate: string; delivery: Delivery; storage: string }) => {
  return { type: ADD_NEW_ADDRESS, payload };
};

//@TODO unused action
export const haveAddressAC = (payload: any) => {
  return { type: HAVE_ADDRESS, payload };
};

export const deleteAddressAC = (payload: {
  index: number;
  selectedDate: string;
  storage: string;
  storages: string[];
}) => {
  return { type: DELETE_ADDRESS, payload };
};

export const updateLinkToMapsAC = (payload: {
  newAddress?: string;
  selectedDate: string;
  storage: string;
  storages: string[];
  userAddressesStorages: string[];
}) => {
  return { type: UPDATE_LINK_TO_MAPS, payload };
};

export const setLinksToMapsAC = (payload: {
  selectedDate: string;
  storages?: string[];
  userAddressesStorages?: string[];
}) => {
  return { type: SET_LINKS_TO_MAPS, payload };
};

export type setAddressAC = {
  [name: string]: Delivery[];
} & {
  date: string;
};

export const setAddressesAC = (payload: setAddressAC) => {
  return { type: SET_ADDRESSES, payload };
};
export const selectedStorageAC = (payload: any) => {
  return { type: SELECTED_STORAGE, payload };
};
