import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem('userData') || '').token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const dateAPI = {
  getDate(token: string | null) {
    return axiosInstance.get(`/api/date`);
  },

  newDate(
    date: string,
    address: string,
    storage: string,
    userId: number | null,
    timeDelivery: string,
    load: number,
    description: string
  ) {
    return axios.post('/api/date/create_address', { date, address, storage, userId, timeDelivery, load, description });
  },

  deleteDate(index: number, selectedDate?: string, storage?: string, storages?: string[]) {
    return axios.post('/api/date/delete_address', { index, selectedDate, storage, storages });
  },
};

export const userAPI = {
  getUser(userEmail: string, password: string) {
    return axios.post('/api/user/login', { userEmail, password });
  },

  registerUser(userEmail: string, password: string) {
    return axios.post('api/user/register', { userEmail, password });
  },

  addStorage(newStorage: string, newAddressStorage: string, userId: number | null) {
    return axios.post('api/user/storage', { newStorage, newAddressStorage, userId });
  },

  getStorages(token: string) {
    return axiosInstance.get('api/user/storage');
  },

  deleteStorage(storageName: string, userId: number | null) {
    return axios.post('api/user/delete_storage', { storageName, userId });
  },
};
