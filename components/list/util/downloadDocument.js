import webformsService from '../services/convx_api/webforms'
import transactionService from '../services/convx_api/transaction'
import WebformTypes from '../static/json/webform-types.json'
import documentNameParser from '../util/documentName.js'

export default {
  data () {
    return {
      loadingMessage: '',
      webformTypes: WebformTypes
    }
  },
  mixins: [documentNameParser],
  methods: {
    hasDownloadDocument (property, documentType) {
      if (!property || !Array.isArray(property.documents)) return false
      return property.documents.find(document => document === documentType)
    },
    isDocumentGeneratable (generatableDocuments, documentType) {
      return generatableDocuments.includes(documentType)
    },
    createDownloadBlob (property, documentType, resBuffer, isWebForm, formName) {
      const { address } = property
      const url = window.URL.createObjectURL(new Blob([resBuffer.data], {type: 'application/pdf'}))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', isWebForm ? `${formName}.pdf` : this.parseDocumentName(address, documentType))
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      this.showLoadingModal = false
    },
    downloadDocument (property, documentType) {
      const {listingId, address, generatableDocuments} = property
      this.hasDownloadDocument(property, documentType)
      if (this.hasDownloadDocument(property, documentType)) {
        var options = {}
        if (this.isDocumentGeneratable(generatableDocuments, documentType) && documentType in this.webformTypes) {
          this.loadingMessage = 'Generating...'
          let formName = this.parseDocumentName(address, documentType)
          this.showLoadingModal = true
          options = {
            responseType: 'arraybuffer',
            headers: {
              'x-access-token': this.getUserAuthToken(),
              role: this.getUserRole(),
              formName: formName,
              listingId: listingId,
              documentType: documentType
            }
          }
          webformsService.generateToPDF(options).then(resBuffer => {
            this.createDownloadBlob(property, documentType, resBuffer, true, formName)
          }).catch(err => {
            this.showLoadingModal = false
            console.error(err)
          })
        } else {
          this.loadingMessage = ''
          options = {
            responseType: 'arraybuffer',
            headers: {
              'x-access-token': this.getUserAuthToken(),
              role: this.getUserRole()
            }
          }
          let formData = [
            `listingId=${listingId}`,
            `documentType=${documentType}`,
            `propertyAddress'=${address}`
          ].join('&')
          this.showLoadingModal = true
          transactionService.downloadDocuments(formData, options).then(resBuffer => {
            this.createDownloadBlob(property, documentType, resBuffer, false, null)
          }).catch(err => {
            this.showLoadingModal = false
            console.error(err)
          })
        }
      } else {
        this.$toasted.global.downloadingDocumentError()
      }
    }
  }
}
