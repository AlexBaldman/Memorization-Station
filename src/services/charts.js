import api from './apiConfig';

export const getAllCharts = async () => {
  const resp = await api.get('/charts')
  return resp.data
}

export const getOneChart = async (id) => {
  const resp = await api.get(`/charts/${id}`)
  return resp.data
}

export const postChart = async (chartData) => {
  const resp = await api.post('/charts', { chart: chartData })
  return resp.data
}

export const putChart = async (id, chartData) => {
  const resp = await api.put(`/charts/${id}`, { chart: chartData })
  return resp.data
}

export const destroyChart = async (id) => {
  const resp = await api.delete(`/charts/${id}`)
  return resp
}
