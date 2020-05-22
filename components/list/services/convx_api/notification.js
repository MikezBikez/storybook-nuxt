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
const notificationService = {
  getNotificationListByReceiverId (formData, header) {
    console.log('getNotificationListByReceiverId NOTIFICATION')
    let receiverId = formData.userId
    let limit = formData.limit === undefined ? null : formData.limit
    return instance.get('/api/user/' + receiverId + '/notification/' + limit, header)
  },
  updateNotificationListByReceiverId (formData, header) {
    console.log('updateNotificationListByReceiverId NOTIFICATION')
    let receiverId = formData.userId
    return instance.put('/api/user/' + receiverId + '/notification', formData, header)
  },
  getNotificationCountByReceiverId (formData, header) {
    console.log('updateNotificationListByReceiverId NOTIFICATION')
    let receiverId = formData.userId
    return instance.get('/api/user/' + receiverId + '/notification/count', header)
  },
  sendEmailInfo (formData, headers) {
    return instance.post('/api/email/sending/', formData, headers)
  },
  sendRequestEmailInfo (formData, headers) {
    return instance.post('/api/email/request/sending/', formData, headers)
  }
}

/**
 * Note: please export axios instance when needed
 */
export default notificationService
