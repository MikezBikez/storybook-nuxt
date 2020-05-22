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
const agentService = {
  // get
  getAgentList (params, isPending, headers) {
    if (!isPending) return instance.get(`/api/agent?${params}`, headers) // GET_agentByOrganisation
    else return instance.get(`/api/pending/AgentAdmin?${params}`, headers) // GET_pendingAgentListByOrganisation
  },
  getAgentDetails (params, isPending, headers) {
    if (!isPending) return instance.get(`/api/agent/${params}`, headers) // GET_agentDetail
    else return instance.get(`/api/pending/AgentAdmin/${params}`, headers) // GET_pendingAgentDetails
  },
  // validateAgentIfExist (params, headers) {
  //   return instance.get(`/api/agent/exist/?org_id=${params}`, headers)
  // },
  // post
  addAgent (formData, headers) {
    return instance.post(`/api/agent/`, formData, headers)
  },
  // put
  updateAgent (params, formData, isPending, headers) {
    if (!isPending) return instance.put(`/api/agent/${params}`, formData, headers)
    else return instance.put(`/api/invitations/${params}`, formData, headers)
  }
}

/**
 * Note: please export axios instance when needed
 */
export default agentService
