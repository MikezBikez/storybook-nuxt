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

const propertyService = {
  insertProperty (formData) {
    return instance.put('/api/properties', formData)
  },
  getPropertyPrice (params, headers) {
    return instance.get(`/api/property/price/${params.type}/${params.state}`, headers)
  }
}

export default propertyService
