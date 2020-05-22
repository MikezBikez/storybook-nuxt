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
const branchService = {
  // get
  getAllBranchList (headers, params) {
    return instance.get(`/api/branch/all?${params}`, headers)
  },
  getBranchList (params, headers) {
    return instance.get(`/api/branch?${params}`, headers)
  },
  getBranchDetails (params, headers) {
    return instance.get(`/api/branch/${params}`, headers)
  },
  getOfficeLookUp (headers, orgid) {
    return instance.get(`/api/office/lookup/${orgid}`, headers)
  },
  // post
  addBranch (formData, headers) {
    return instance.post(`/api/branch/`, formData, headers)
  },
  // put
  updateBranch (params, formData, headers) {
    return instance.put(`/api/branch/${params}`, formData, headers)
  }
}

/**
 * Note: please export axios instance when needed
 */
export default branchService
