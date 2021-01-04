import axios from 'axios';

export const dateAPI = {
  getDate(token) {
    return axios.get(`/api/date`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      if (res.status === 200) {
        return res;
      }
      return;
    });
  },

  newDate(date, address, storage, userId) {
    return axios.post('/api/date/create_address', { date, address, storage, userId }).then((res) => {
      return res;
    });
  },

  deleteDate(index, selectedDate, storage, storages) {
    return axios.post('/api/date/delete_address', { index, selectedDate, storage, storages }).then((res) => {
      return res;
    });
  },
};

export const userAPI = {
  getUser(userEmail, password) {
    return axios.post('/api/auth/login', { userEmail, password }).then((res) => {
      return res;
    });
  },

  registerUser(userEmail, password) {
    return axios.post('api/auth/register', { userEmail, password }).then((res) => {
      return res;
    });
  },

  addStorage(newStorage, newAddressStorage, userId) {
    return axios.post('api/auth/storage', { newStorage, newAddressStorage, userId }).then((res) => res);
  },

  getStorages(token) {
    return axios.get('api/auth/storage', { headers: { Authorization: `Bearer ${token}` } });
  },

  deleteStorage(storageName) {
    return axios.post('api/auth/delete_storage', { storageName });
  },
};
