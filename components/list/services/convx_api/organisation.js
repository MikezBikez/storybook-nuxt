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
const organisationService = {
  // get
  getOrganisationsLookUp (headers) {
    return instance.get(`/api/organisation/lookup`, headers)
  },
  getOrganisationsList (params, headers) {
    return instance.get(`/api/organisation?${params}`, headers)
  },
  getOrganisationDetails (params, headers) {
    return instance.get(`/api/organisation/${params}`, headers)
  },
  // put
  updateOrganisation (params, formData, headers) {
    return instance.put(`/api/organisation/${params}`, formData, headers)
  },
  // post
  addOrganisation (formData, headers) {
    return instance.post(`/api/organisation`, formData, headers)
  },
  // validate organisation name for update
  validateOrganisationNameForUpdate (id, orgName, headers) {
    return instance.get(`/api/organisation/validateName/${id}?name=${orgName}`, headers)
  },
  // validate for duplicate name for add organisation
  validateOrganisationName (orgName, headers) {
    return instance.get(`/api/organisation/validateName?name=${orgName}`, headers)
  },
  // validate organisation phone for update
  validateOrganisationPhoneForUpdate (id, orgContact, headers) {
    return instance.get(`/api/organisation/validatePhone/${id}?phone=${orgContact}`, headers)
  },
  // validate for duplicate phone for add organisation
  validateOrganisationPhone (phone, headers) {
    return instance.get(`/api/organisation/validatePhone?phone=${phone}`, headers)
  },
  // uploading of partner or office logo
  uploadOrganisationLogo (formData, headers) {
    return instance.post(`/api/organisation/uploadPartnerLogo`, formData, headers)
  }
}

/**
 * Note: please export axios instance when needed
 */
export default organisationService
