import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://cors-anywhere.herokuapp.com/https://git.heroku.com/memorization-station-api.git' : 'http://localhost:3000' 

const api = axios.create({
  baseURL: baseUrl
})

export default api;