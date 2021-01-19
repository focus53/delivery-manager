import { dateAPI } from '../../api/api';
import {
  addNewAddressAC,
  deleteAddressAC,
  haveAddressAC,
  selectedDateAC,
  selectedStorageAC,
  setAddressesAC,
  setLinksToMapsAC,
  updateLinkToMapsAC,
} from './deliveryActionsCreators';

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

export const addNewAddressTC = (address, selectedDate, storage, userId, timeDelivery, load, description) => async (
  dispatch
) => {
  const response = await dateAPI.newDate(selectedDate, address, storage, userId, timeDelivery, load, description);
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
