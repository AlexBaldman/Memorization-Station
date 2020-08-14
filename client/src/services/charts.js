import api from './apiConfig';

export const getAllCharts = async () => {
  const resp = await api.get('/charts');
  return resp.data;
}