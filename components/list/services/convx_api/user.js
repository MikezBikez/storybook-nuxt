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
const userService = {
  // validate email if exist
  getUserEmail (headers) {
    return instance.get(`/api/user/email`, headers)
  },
  getAllUserByRole (headers, body, userRole) {
    return instance.post(`/api/combine/user/list/${userRole}`, body, headers)
  },
  getAllFilterUserByRole (headers, body, userRole) {
    return instance.post(`/api/filter/user/list/${userRole}`, body, headers)
  },
  deleteUser (headers, body) {
    return instance.post(`/api/delete/user`, body, headers)
  },
  deleteConveyancerUser (headers, body) {
    return instance.post(`/api/delete/conveyancer/application`, body, headers)
  },
  getAllConveyancers (headers, body) {
    return instance.post(`/api/conveyancer/user/list`, body, headers)
  },
  updateInterviewDateTime (body, headers) {
    return instance.put('/api/conveyancer/interviewDateTime', body, headers)
  },
  conveyancerInvitation (formData, headers) {
    return instance.post('/api/conveyancer/invite', formData, headers)
  },
  updateConveyancerDetails (headers, params) {
    return instance.put(`/api/conveyancer/update`, params, headers)
  },
  downloadDocuments (formData, headers) {
    return instance.get(`api/conveyancer/download?${formData}`, headers)
  },
  getAllUserCountByRole (headers, body, userRole) {
    return instance.post(`/api/combine/user/list/${userRole}/count`, body, headers)
  },
  getAllConveyancersCount (headers, body) {
    return instance.post(`/api/conveyancer/user/list/count`, body, headers)
  },
  getConveyancerDetails (headers, id) {
    return instance.get(`/api/conveyancer/user/${id}`, headers)
  },
  getConveyancerDetailsByUserId (headers, id) {
    return instance.get(`/api/conveyancer/${id}`, headers)
  },
  getUserByIdAndRole (headers, id, role, isPending) {
    if (!isPending) return instance.get(`/api/user/${id}/${role}`, headers)
    else return instance.get(`/api/pendingUser/${id}/${role}`, headers)
  },
  // for branch admin listing
  getBranchAdminList (params, isPending, headers) {
    if (!isPending) return instance.get(`/api/branchAdmin?${params}`, headers)
    else return instance.get(`/api/pending/branchAdmin?${params}`, headers)
  },
  getBranchAdminDetails (params, isPending, headers) {
    if (!isPending) return instance.get(`/api/branchAdmin/${params}`, headers)
    else return instance.get(`/api/pending/branchAdminList/${params}`, headers)
  },
  // for organiastion admin listing
  getOrganisationAdmin (params, isPending, headers) {
    if (!isPending) return instance.get(`/api/organisationAdmin?${params}`, headers) // GET_organisationAdminList
    else return instance.get(`/api/pending/organisationAdmin?${params}`, headers) // GET_adminOrganisationPendingList
  },
  getPartnerAdminRowCount (headers, isPending, orgId) {
    if (!isPending) return instance.get(`/api/managerAndPartner/rowCount?role=OA`, headers)
    else return instance.get(`/api/pending/managerAndPartner/rowCount?role=OA&org_id=${orgId}`, headers)
  },
  getOfficeManagerRowCount (headers, isPending, orgId) {
    if (!isPending) return instance.get(`/api/managerAndPartner/rowCount?role=BA&org_id=${orgId}`, headers)
    else return instance.get(`/api/pending/managerAndPartner/rowCount?role=BA&org_id=${orgId}`, headers)
  },
  getOrganisationAdminDetails (params, isPending, headers) {
    if (!isPending) return instance.get(`/api/organisationAdmin/${params}`, headers)
    else return instance.get(`/api/pending/organisationAdmin/${params}`, headers)
  },
  updateBranchAdmin (params, isPending, formData, headers) {
    if (!isPending) return instance.put(`/api/organisationAndBranchAdmin/${params}`, formData, headers)
    else return instance.put(`/api/invitations/${params}`, formData, headers)
  },
  updateOrganisationAdmin (params, formData, isPending, headers) {
    if (!isPending) return instance.put(`/api/organisationAndBranchAdmin/${params}`, formData, headers)
    else return instance.put(`/api/invitations/${params}`, formData, headers)
  },
  validateDuplicateUserPhone (params, headers) {
    return instance.get(`/api/validateDuplicateUserPhone?${params}`, headers)
  },
  changeUserStatus (params, headers) {
    return instance.put(`/api/userRole/status/${params}`, headers)
  },
  validateDuplicateUserEmailAndWithSameRole (headers) {
    return instance.get(`/api/validateExistingUserEmail/`, headers)
  },
  getPropertiesCreator (headers) {
    return instance.get(`/api/propertyCreators/`, headers)
  },
  getUserDetails (formData, headers) {
    let userId = formData.userId
    return instance.get(`/api/user/${userId}`, headers)
  },
  getUserSignature (userId, headers) {
    return instance.get(`/api/signature/${userId}`, headers)
  },
  getUserByUsername (headers) {
    return instance.get(`/api/usersByUsername`, headers)
  },
  getUserInfoByIdAndRole (headers) {
    return instance.get(`/api/userInfoByIdAndRole`, headers)
  },
  getAgentLookUp (headers) {
    return instance.get(`/api/agentLookUpByOrganisation`, headers)
  }
}

/**
 * Note: please export axios instance when needed
 */
export default userService
