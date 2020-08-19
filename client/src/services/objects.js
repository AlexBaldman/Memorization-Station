import api from './apiConfig';

export const getAllObjects = async () => {
  const resp = await api.get('/memory_objects/');
  return resp.data;
}

export const getOneObject = async (id) => {
  const resp = await api.get(`/memory_objects/${id}`);
  return resp.data;
}

export const postObject = async (memory_objectData) => {
  const resp = await api.post('/memory_objects', { memory_object: memory_objectData });
  return resp.data;
}

export const putObject = async (id, memory_objectData) => {
  const resp = await api.put(`/memory_objects/${id}`, { memory_object: memory_objectData });
  return resp.data;
}

export const destroyObject = async (id) => {
  const resp = await api.delete(`/memory_objects/${id}`);
  return resp;
}
