import api from './apiConfig';

export const getAllObjects = async () => {
  const resp = await api.get('/memory_objects/');
  return resp.data;
}

export const getOneObject = async (id) => {
  const resp = await api.get(`/objects/${id}`);
  return resp.data;
}

// not sure if I can use [name] in this way so it can handle updating any key?

export const postObject = async (objectData) => {
  const resp = await api.post('/memory_objects', { [name]: objectData });
  return resp.data;
}

export const putObject = async (id, objectData) => {
  const resp = await api.put(`/memory_objects/${id}`, { [name]: objectData });
  return resp.data;
}

export const destroyObject = async (id) => {
  const resp = await api.delete(`/memory_objects/${id}`);
  return resp;
}

// Don't think the below will work this way, need to think through more thoroughly

export const addToChart = async(chartId, memory_objectId) => {
  const resp = await api.put(`/charts/${chartId}/memory_objects/${memory_objectId}`);
  return resp.data;
}