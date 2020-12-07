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
  deleteDate(index, selectedDate) {
    return axios.post('/api/date/delete_address', { index, selectedDate }).then((res) => {
      return res;
    });
  },
};
