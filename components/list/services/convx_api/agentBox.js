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
const agentBoxService = {
  // get
  getAPIKeys (params, headers) {
    return instance.get(`/api/agentBox/key/${params}`, headers)
  },
  // post
  saveAPIKeys (params, headers) {
    if (params.apiId) {
      return instance.put(`/api/agentBox/update`, params, headers)
    } else {
      return instance.post(`/api/agentBox/insert`, params, headers)
    }
  }
  // put
}

/**
 * Note: please export axios instance when needed
 */
export default agentBoxService
