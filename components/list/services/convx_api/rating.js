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

const questionService = {
  insertRate (formData, headers) {
    return instance.post('/api/rate', formData, headers)
  },
  getQuestions (headers) {
    return instance.get(`/api/questions`, headers)
  },
  getRatingDetails (listingId, headers) {
    return instance.get(`/api/rating/${listingId}`, headers)
  }
}

export default questionService
