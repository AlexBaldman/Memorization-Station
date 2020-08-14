import axios from 'axios';

const Url = 'http://localhost:3000'

// the baseUrl needs to be replaced once server deployed, obviously

const api = axios.create({
  baseURL: baseUrl
})

export default api;