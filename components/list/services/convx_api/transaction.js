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
const transactionService = {
  insertTransaction (formData) {
    return instance.put('api/properties', formData)
  },
  getLatestUserTransactions (formData, headers) {
    let userId = formData.userId
    return instance.post('/api/user/' + userId + '/transaction', formData, headers)
  },
  getTransactionList (formData, headers) {
    return instance.post('/api/transaction/list', formData, headers)
  },
  getMostActiveTransaction (formData, headers) {
    return instance.post('/api/transaction/mostActive', formData, headers)
  },
  assignTransaction (formData, headers) {
    return instance.post('/api/assignTransaction', formData, headers)
  },
  updateTransactionStatus (formData, headers) {
    let transactionId = formData.transactionId
    return instance.put('/api/transaction/' + transactionId + '/status', formData, headers)
  },
  getTransactionDetail (formData, headers) {
    return instance.post('/api/transactionDetail', formData, headers)
  },
  getTransactionNoteList (formData, headers) {
    let transactionId = formData.transactionId
    return instance.get('/api/transaction/' + transactionId + '/history', headers)
  },
  insertTransactionHistNote (formData, headers) {
    return instance.post('/api/transaction/history/notes', formData, headers)
  },
  getTransactionCount (formData, headers) {
    return instance.post('/api/transaction/count', formData, headers)
  },
  getTransactionDetailLogs (formData, headers) {
    let transactionId = formData.transactionId
    return instance.get('/api/transactionDetail/' + transactionId + '/auditTrails', headers)
  },
  getTransactionPropertyPrice (formData) {
    return instance.post('/api/transactionDetail/price', formData)
  },
  getTransactionData (formData, headers) {
    let transactionId = formData.transactionId
    return instance.get('/api/transaction/' + transactionId + '/transactionData', headers)
  },
  updateTransactionData (formData, headers) {
    return instance.put('/api/transactionData', formData, headers)
  },
  getPreviousTransactionData (formData, headers) {
    let userId = formData.userId
    return instance.get('/api/transaction/' + userId + '/previousTransactionData', headers)
  },
  insertTransactionConveyancerNotes (formData, headers) {
    return instance.post('/api/transactionConveyancerNotes', formData, headers)
  },
  updateTransactionConveyancerNotes (formData, headers) {
    return instance.put('/api/updateTransactionConveyancerNotes', formData, headers)
  },
  uploadDocuments (formData, headers) {
    return instance.post('/api/property/upload', formData, headers)
  },
  uploadImage (formData, headers) {
    return instance.post('/api/property/uploadImage', formData, headers)
  },
  downloadDocuments (formData, headers) {
    return instance.get(`api/property/download?${formData}`, headers)
  },
  getPropertyListingPerStageCount (formData, headers) {
    let userType = formData.userType
    let userId = formData.userId
    return instance.get(`/api/property/stages/${userId}/${userType}`, headers)
  },
  getPropertyListingCountPerStageCount (formData, headers) {
    let userId = formData.organisationId
    let quarter = formData.dropdownQuarter
    return instance.get(`/api/property/referralsByOffice/${userId}/${quarter}`, headers)
  },
  getPropertyReferrals (formData, headers) {
    let userId = formData.organisationId
    let year = formData.dropdownYear.value
    return instance.get(`/api/property/referrals/${userId}/${year}`, headers)
  },
  getPropertyListingCountPerStageCountOffice (formData, headers) { // GET_propertyListingPerAgent
    let userId = formData.organisationId
    let quarter = formData.dropdownQuarter
    return instance.get(`/api/propertyOffice/stages/${userId}/${quarter}`, headers)
  },
  getPropertyByUser (headers) { // GET_propertiesByUser
    return instance.get(`/api/propertyListing/`, headers)
  },
  getDocumentByProperty (headers) { // GET_propertyListingPerAgent
    return instance.get(`/api/documentListing/`, headers)
  },
  getAgentReferralByOfficeYearToDate (formData, headers) {
    let userId = formData.organisationId
    let year = formData.dropdownYear.value
    return instance.get(`/api/propertyOffice/agentReferralsByOffice/${userId}/${year}`, headers)
  },
  updatePropertyListingConveyancingSteps (formData, headers) {
    let listingId = formData.listingId
    return instance.post(`/api/transaction/${listingId}/status`, formData, headers)
  },
  addCommentToPropertyListing (formData, headers) {
    let listingId = formData.listingId
    let transactionStatus = formData.transactionStatus
    return instance.post(`/api/transaction/${listingId}/comments/${transactionStatus}`, formData, headers)
  },
  getPropertyListingCommentsByStatus (formData, headers) {
    let listingId = formData.listingId
    let transactionStatus = formData.transactionStatus
    return instance.get(`/api/transaction/${listingId}/comments/${transactionStatus}`, headers)
  },
  getPropertyStepsAndCount (formData, headers) {
    let date = formData.date
    return instance.get(`/api/transaction/${date}`, headers)
  },
  getConveyancerTransactionStatus (formData, headers) {
    let limit = formData.limit
    return instance.get(`/api/transaction/conveyancer/status/${limit}`, headers)
  },
  getPropertyListingPerStepCount (formData, headers) {
    let userType = formData.userType
    let userId = formData.userId
    return instance.get(`/api/property/steps/${userId}/${userType}`, headers)
  },
  getPaymentList (headers, formData) {
    let listingId = formData.listingId
    return instance.get(`/api/paymentList/${listingId}`, headers)
  },
  getTransactionDates (headers, listingId) {
    return instance.get(`/api/transactionDates/${listingId}`, headers)
  },
  updateCost (formData, headers) {
    return instance.put('/api/property/documentCost', formData, headers)
  },
  updateListingSettlementDateTime (formData, headers) {
    return instance.put('/api/property/settlementDateTime', formData, headers)
  },
  updateListingRegistrationDate (formData, headers) {
    return instance.put('/api/property/registrationDate', formData, headers)
  },
  updateListingFinalInspectionDateTime (formData, headers) {
    return instance.put('/api/property/finalInspectionDateTime', formData, headers)
  },
  deleteDocuments (params, headers) {
    let listingId = params.listingId
    return instance.delete(`/api/property/delete/${listingId}`, headers)
  },
  getPostSettlementPropertiesExceedingSixtyDays (headers) {
    return instance.get(`/api/postSettlementPropsSixtyDays`, headers)
  },
  updatePropertyStage (formData, headers) {
    return instance.put(`/api/updatePropertyStage`, formData, headers)
  },
  getUploadedDocumentName (formData, headers) {
    let listingId = formData.listingId
    let type = formData.documentType
    return instance.get(`/api/documentName/${listingId}/${type}`, headers)
  },
  declineDocument (formData, headers) {
    return instance.put('/api/property/decline', formData, headers)
  }
}
/**
 * Note: please export axios instance when needed
 */
export default transactionService
