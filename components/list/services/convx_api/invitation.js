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
const invitationService = {
  addInvitation (body, headers) {
    return instance.post(`/api/invitations/`, body, headers)
  },
  resendInvitation (params, headers) {
    return instance.get(`/api/resendInvitation/${params}`, headers)
  },
  postUserInvitationPhoto (formData, headers) {
    return instance.post('/api/invitations/invitationPhoto', formData, headers)
  },
  changePasswordEmail (formData, headers) {
    return instance.post('/api/changePassword', formData, headers)
  }
}

/**
 * Note: please export axios instance when needed
 */
export default invitationService
