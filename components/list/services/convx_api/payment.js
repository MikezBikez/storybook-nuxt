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
const paymentService = {
  paywayProcessTransactions (formData, headers) {
    return instance.post(`/api/payway/paywayProcessTransactions`, formData, headers)
  },
  paywayProcessSingleUseTokens (formData, headers) {
    return instance.post(`/api/payway/singleUseTokens`, formData, headers)
  },
  paymentSaveTransactions (formData, headers) {
    return instance.post(`/api/payment/transaction`, formData, headers)
  },
  pinwayProcessTransactions (formData, headers) {
    return instance.post(`/api/pinway/pinwayProcessTransactions`, formData, headers)
  },
  getPaymentStatus (formData, headers) {
    const id = formData.listingId
    return instance.get(`/api/payment/transactionStatus/${id}`, headers)
  }
}

/**
 * Note: please export axios instance when needed
 */
export default paymentService
