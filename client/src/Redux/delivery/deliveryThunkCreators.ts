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

export const setDateTC = (selectedDate: string, token: string | null) => async (dispatch: any, getState: any) => {
  const getDates = await dateAPI.getDate(token);
  const storages = getState().userReducer.userStorages;
  const userAddressesStorages = getState().userReducer.userAddressesStorages;
  dispatch(setAddressesAC(getDates.data));
  dispatch(setLinksToMapsAC({ selectedDate, storages, userAddressesStorages }));
};

export const selectDateTC = (date: string) => (dispatch: any) => {
  dispatch(selectedDateAC({ date }));
};

export const updateLinkToMapsTC = (selectedDate: string, storage: string, newAddress?: string) => (
  dispatch: any,
  getState: any
) => {
  const userAddressesStorages = getState().userReducer.userAddressesStorages;
  const storages = getState().userReducer.userStorages;
  dispatch(updateLinkToMapsAC({ selectedDate, storage, newAddress, userAddressesStorages, storages }));
};

export const addNewAddressTC = (
  address: string,
  selectedDate: string,
  storage: string,
  userId: number | null,
  timeDelivery: string,
  load: number,
  description: string
) => async (dispatch: any) => {
  const response = await dateAPI.newDate(selectedDate, address, storage, userId, timeDelivery, load, description);
  if (response) {
    dispatch(
      addNewAddressAC({ selectedDate: response.data.newDelivery.date, delivery: response.data.newDelivery, storage })
    );
    dispatch(updateLinkToMapsTC(selectedDate, storage, address));
  }
};

export const haveAddressTC = (date: string) => (dispatch: any) => {
  dispatch(haveAddressAC(date));
};

export const deleteAddressTC = (
  index: number,
  selectedDate: string,
  storage: string,
  storages: string[],
  deliveryId: number
) => async (dispatch: any) => {
  const response = await dateAPI.deleteDate(deliveryId);
  if (response) {
    dispatch(deleteAddressAC({ index, selectedDate, storage, storages }));
    dispatch(updateLinkToMapsTC(selectedDate, storage));
  }
};

export const setLinksToMapsTC = (selectedDate: string) => (dispatch: any) => {
  dispatch(setLinksToMapsAC({ selectedDate }));
};

export const selectedStorageTC = (storage: string | string[]) => (dispatch: any) => {
  dispatch(selectedStorageAC({ storage }));
};
