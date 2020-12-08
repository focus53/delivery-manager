import axios from 'axios';

export const dateAPI = {
  getDate() {
    return axios.get(`/api/date`).then((res) => {
      if (res.status === 200) {
        return res;
      }
      return;
    });
  },
  newDate(date, address) {
    return axios.post('/api/date', { date, address }).then((res) => {
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
