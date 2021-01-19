import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem('userData')).token;
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
  getDate(token) {
    return axiosInstance.get(`/api/date`);
  },

  newDate(date, address, storage, userId, timeDelivery, load, description) {
    return axios.post('/api/date/create_address', { date, address, storage, userId, timeDelivery, load, description });
  },

  deleteDate(index, selectedDate, storage, storages) {
    return axios.post('/api/date/delete_address', { index, selectedDate, storage, storages });
  },
};

export const userAPI = {
  getUser(userEmail, password) {
    return axios.post('/api/auth/login', { userEmail, password });
  },

  registerUser(userEmail, password) {
    return axios.post('api/auth/register', { userEmail, password });
  },

  addStorage(newStorage, newAddressStorage, userId) {
    return axios.post('api/auth/storage', { newStorage, newAddressStorage, userId });
  },

  getStorages(token) {
    return axiosInstance.get('api/auth/storage');
  },

  deleteStorage(storageName) {
    return axios.post('api/auth/delete_storage', { storageName });
  },
};
