import axios from 'axios';

export const dateAPI = {
  getOneDate(date) {
    return axios.get(`/api/date/${date}`).then((res) => {
      if (res.status === 200) {
        return res;
      }
      return;
    });
  },
  getDate() {
    return axios.get(`/api/date`).then((res) => {
      if (res.status === 200) {
        return res;
      }
      return;
    });
  },
<<<<<<< HEAD
  newDate(date, address) {
    return axios.post('/api/date', { date, address }).then((res) => {
=======
  newDate(date, address, storage, userId) {
    return axios.post('/api/date', { date, address, storage, userId }).then((res) => {
>>>>>>> 1a7d319... add: Register with token
      return res;
    });
  },
<<<<<<< HEAD
  deleteDate(index, selectedDate) {
    return axios.post('/api/date/delete_address', { index, selectedDate }).then((res) => {
=======
  deleteDate(index, selectedDate, storage, storages) {
    return axios.post('/api/date/delete_address', { index, selectedDate, storage, storages }).then((res) => {
>>>>>>> c27eb70... refactor: Delete
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
};
