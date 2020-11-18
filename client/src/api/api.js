import axios from 'axios';

export const dateAPI = {
  getDate() {
    return axios.delete('/api/date', { date: 'date 456', mapsUrl: 'url 456' }).then((res) => res);
  },
};
