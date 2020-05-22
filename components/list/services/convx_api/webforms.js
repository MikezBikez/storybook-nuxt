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

/**
 * all api calls
 */
const webformsService = {
  getUserWebForm (headers) {
    return instance.get(`/api/webforms`, headers)
  },
  getWebFormAutofill (headers) {
    return instance.get(`/api/webforms/autofill`, headers)
  },
  generateToPDF (headers) {
    return instance.get(`/api/webforms/generate`, headers)
  },
  saveUserWebforms (formData, headers) {
    if (formData.id > 0) {
      return instance.put('/api/webforms/update/webforms', formData, headers)
    } else {
      return instance.post('/api/webforms/insert/webforms', formData, headers)
    }
  },
  getBuyersAndSellersAutofillData (headers) {
    return instance.get(`/api/webforms/autofilldata`, headers)
  },
  getSignatureCount (headers) {
    return instance.get(`/api/webforms/signatureCount`, headers)
  }
}

/**
 * Note: please export axios instance when needed
 */
export default webformsService
