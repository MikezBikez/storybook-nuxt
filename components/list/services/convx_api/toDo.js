/**
 * Axios instance to internal api
 * all options for internal api
 * to be set here
 */
import axios from 'axios'
import { APP_CONFIG } from '../api_auth/config/environment'
require('es6-promise').polyfill()

/**
 * Options
 */
const instance = axios.create({
  baseURL: APP_CONFIG.API_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Expires': '-1',
    'Pragma': 'no-cache'
  }
})
// instance.defaults.headers.common['Content-Type'] = 'application/json'

/**
 * all api calls
 */
const todoService = {
  // get
  getTodos (params, headers) {
    return instance.get(`/api/todo?agent_id=${params}`, headers)
  },
  getTodosFromListing (params, headers) {
    return instance.get(`/api/listing/todo?agent_id=${params}`, headers)
  },
  // put
  updateBoard (params, data, headers) {
    return instance.put(`/api/todo/${params}`, data, headers)
  },
  saveTodoList (data, headers) {
    return instance.post(`/api/todo`, data, headers)
  }
}

/**
 * Note: please export axios instance when needed
 */
export default todoService
