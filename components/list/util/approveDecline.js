import transactionService from '../services/convx_api/transaction'
import tokenUtil from '../util/JWTUtil.js'
import fetchPropertyData from '../util/fetchPropertyData.js'

export default {
  mixins: [tokenUtil, fetchPropertyData],
  methods: {
    approveDocument (code, listingId) {
      const options = {
        headers: {
          'x-access-token': this.getUserAuthToken(),
          role: this.getUserRole(),
          userId: this.getUserId()
        }
      }
      let formData = new FormData()
      formData.append('isApproved', true)
      formData.append('documentType', code)
      formData.append('listingId', listingId)
      this.showLoadingModal = true
      transactionService.uploadDocuments(formData, options).then(resp => {
        this.$toasted.global.approveDocument()
        window.jQuery(`#confirmationModal`).modal('hide')
        this.getTransactionData(listingId)
        this.showLoadingModal = false
      }).catch(err => {
        this.showLoadingModal = false
        console.error(err)
      })
    },
    declineDocument (code, listingId) {
      const options = {
        headers: {
          'x-access-token': this.getUserAuthToken(),
          role: this.getUserRole(),
          userId: this.getUserId()
        }
      }
      let params = {
        listingId,
        documentType: code
      }
      this.showLoadingModal = true
      transactionService.declineDocument(params, options).then(resp => {
        this.$toasted.global.declineDocument()
        window.jQuery(`#confirmationModal`).modal('hide')
        this.getTransactionData(listingId)
        this.showLoadingModal = false
      }).catch(err => {
        this.showLoadingModal = false
        console.error(err)
      })
    },
    updateDocumentStatus (listingId, documentStatusType, currentDocumentType) {
      if (documentStatusType === 'Approve') {
        this.approveDocument(currentDocumentType, listingId)
      } else {
        this.declineDocument(currentDocumentType, listingId)
      }
    }
  }
}
