import api from './apiConfig';

export const getAllCharts = async () => {
  const resp = await api.get('/charts');
  return resp.data;
}

export const getOneChart = async (id) => {
  const resp = await api.get(`/charts/${id}`);
  return resp.data;
}