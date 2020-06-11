<template lang="pug">
  div.width-100
    button#dropdownPDFfile.btn.btn-primary.dropdown-toggle(:disabled="isDisabled(propertyData, documentType)" type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false')
      | PDF File
    .dropdown-menu(aria-labelledby='dropdownPDFfile')
      a.dropdown-item.primary(href='#' @click="triggerUploadDocument(documentType)") 
        i.fas.fa-upload
        | {{true ? 'Upload PDF' : 'Re-upload PDF'}}
      a.dropdown-item(:class="[classValidation(propertyData, documentType)]" href='#' @click="triggerDownloadDocument(propertyData, documentType)") 
        i.fas.fa-download
        | Download PDF
    #upload-holder
      b-form-file(v-model='documentContract', id="uploadContractDocument" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentReviewOfContract', id="uploadReviewOfContractDocument" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentEngagementLetter', id="uploadEngagementLetter" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentCostsDisclosue', id="uploadCostsDisclosure" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentSignedAuthorisationForm', id="uploadSignedAuthorisationForm" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentSellersQuestionnaire', id="uploadSellersQuestionnaire" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentDraftContract', id="uploadDraftContract" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentFinalContract', id="uploadFinalContract" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentSignedContract', id="uploadSignedContract" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentSignedForm', id="uploadSignedForm" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentBuyersQuestionnaire', id="uploadBuyersQuestionnaire" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentS27DRS', id="uploadS27DepositReleaseStatement" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentSignedSection27', id="uploadSignedSection27" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentSOAndSettlementStatement', id="uploadSOAndSettlementStatement" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentSettlementCosts', id="uploadSettlementCosts" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentTaxInvoice', id="uploadTaxInvoice" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentAccountSales', id="uploadAccountSales" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentOtherDocument', id="uploadOtherDocument" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentSignedSection32', id="uploadSignedSection32" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentSection32', id="uploadSection32" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentRegisteredPlan', id="uploadRegisteredPlan" drop-placeholder='', accept='.pdf', style="display:none")
      b-form-file(v-model='documentCertificateOfOccupancy', id="uploadCertificateOfOccupancy" drop-placeholder='', accept='.pdf', style="display:none")
    loading-component(v-if='showLoadingModal', ref='loadingComponent', :loadingMessage="loadingMessage")
</template>

<script>
import LoadingComponent from "~/components/Loading";
// import downloadDocumentUtil from "../util/downloadDocument.js";
// import fetchPropertyData from "../util/fetchPropertyData.js";
// import disabledUtil from "../util/isDisabledUtil.js";
// import {
//   ENGAGEMENTLETTER,
//   COSTSDISCLOSURE,
//   DRAFTCONTRACT,
//   CONTRACT,
//   REVIEWOFCONTRACT,
//   SECTION32,
//   SIGNEDSECTION32,
//   FINALCONTRACT,
//   SIGNEDCONTRACT,
//   SIGNEDAUTHORISATIONFORM,
//   SELLERSQUESTIONNAIRE,
//   BUYERSQUESTIONNAIRE,
//   S27DRS,
//   SIGNEDSECTION27,
//   STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT,
//   SETTLEMENTCOSTS,
//   TAXINVOICE,
//   ACCOUNTSALES,
//   REGISTEREDPLAN,
//   CERTIFICATEOFOCCUPANCY
// } from "../util/transactionDocuments.js";

export default {
  data() {
    return {
      otherDocumentError: false,
      documentContract: null,
      documentReviewOfContract: null,
      documentEngagementLetter: null,
      documentCostsDisclosue: null,
      documentDraftContract: null,
      documentFinalContract: null,
      documentSellersQuestionnaire: null,
      documentSignedAuthorisationForm: null,
      documentSignedContract: null,
      documentSignedForm: null,
      documentBuyersQuestionnaire: null,
      documentS27DRS: null,
      documentSOAndSettlementStatement: null,
      documentSettlementCosts: null,
      documentTaxInvoice: null,
      documentAccountSales: null,
      documentSignedSection32: null,
      documentSection32: null,
      documentRegisteredPlan: null,
      documentCertificateOfOccupancy: null,
      documentOtherDocument: null,
      documentSignedSection27: null,
      showLoadingModal: false
    };
  },
  props: {
    propertyObject: {
      type: Object
    },
    documentType: {
      type: String
    },
    documentName: {
      type: String
    }
  },
  components: {
    LoadingComponent
  },
  computed: {
    propertyData() {
      return {}; //this.propertyObject;
    }
  },
  methods: {
    isDisabled() {
      return true;
    },
    classValidation(propertyData, documentType) {
      return "primary";
      // return this.hasDownloadDocument(propertyData, documentType)
      //   ? "primary"
      //   : "disabled";
    },
    triggerDownloadDocument(property, documentType) {
      // this.downloadDocument(property, documentType);
    },
    triggerUploadDocument(type) {
      // if (type === SIGNEDSECTION32.code) {
      //   if (
      //     (this.isUserAdmin ||
      //       this.isUserCustomer ||
      //       this.isUserChiefPracticeManager) &&
      //     this.propertyData.isDraftContractApprovedCompleted
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadSignedSection32").click();
      //   }
      // } else if (type === "SoA") {
      //   // temporary document
      //   this.otherDocumentError = false;
      //   document.getElementById("uploadSoADocument").click();
      // } else if (type === SECTION32.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadSection32").click();
      //   }
      // } else if (type === CONTRACT.code) {
      //   if (
      //     this.isUserCustomer ||
      //     this.isUserOfficeManager ||
      //     this.isUserDirector ||
      //     this.isUserRealEstateAgent ||
      //     this.isUserAdmin ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadContractDocument").click();
      //   }
      // } else if (type === REVIEWOFCONTRACT.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadReviewOfContractDocument").click();
      //   }
      // } else if (type === ENGAGEMENTLETTER.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadEngagementLetter").click();
      //   }
      // } else if (type === COSTSDISCLOSURE.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadCostsDisclosure").click();
      //   }
      // } else if (type === DRAFTCONTRACT.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadDraftContract").click();
      //   }
      // } else if (type === FINALCONTRACT.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadFinalContract").click();
      //   }
      // } else if (type === SELLERSQUESTIONNAIRE.code) {
      //   if (
      //     this.isUserCustomer ||
      //     this.isUserRealEstateAgent ||
      //     this.isUserAdmin ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadSellersQuestionnaire").click();
      //   }
      // } else if (type === SIGNEDCONTRACT.code) {
      //   if (
      //     this.isUserCustomer ||
      //     this.isUserOfficeManager ||
      //     this.isUserDirector ||
      //     this.isUserRealEstateAgent ||
      //     this.isUserAdmin ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadSignedContract").click();
      //   }
      // } else if (type === SIGNEDAUTHORISATIONFORM.code) {
      //   if (
      //     this.isUserCustomer ||
      //     this.isUserRealEstateAgent ||
      //     this.isUserAdmin ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadSignedForm").click();
      //   }
      // } else if (type === BUYERSQUESTIONNAIRE.code) {
      //   if (
      //     this.isUserCustomer ||
      //     this.isUserRealEstateAgent ||
      //     this.isUserAdmin ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadBuyersQuestionnaire").click();
      //   }
      // } else if (type === S27DRS.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadS27DepositReleaseStatement").click();
      //   }
      // } else if (type === SIGNEDSECTION27.code) {
      //   if (
      //     this.isUserCustomer ||
      //     this.isUserRealEstateAgent ||
      //     this.isUserAdmin ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadSignedSection27").click();
      //   }
      // } else if (type === STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadSOAndSettlementStatement").click();
      //   }
      // } else if (type === SETTLEMENTCOSTS.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadSettlementCosts").click();
      //   }
      // } else if (type === TAXINVOICE.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadTaxInvoice").click();
      //   }
      // } else if (type === ACCOUNTSALES.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadAccountSales").click();
      //   }
      // } else if (type === "otr") {
      //   // temporary document
      //   if (!this.documentName.trim()) {
      //     this.otherDocumentError = true;
      //     return false;
      //   }
      //   this.propertyData.documentNameOthers = this.documentName;
      //   document.getElementById("uploadOtherDocument").click();
      // } else if (type === REGISTEREDPLAN.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadRegisteredPlan").click();
      //   }
      // } else if (type === CERTIFICATEOFOCCUPANCY.code) {
      //   if (
      //     this.isUserAdmin ||
      //     this.isUserConveyancer ||
      //     this.isUserChiefPracticeManager
      //   ) {
      //     this.otherDocumentError = false;
      //     document.getElementById("uploadCertificateOfOccupancy").click();
      //   }
      // }
    },
    uploadDocumentFile(file, type, name, docType) {
      if (!file) {
        return false;
      }
      // var headers = {
      //   headers: {
      //     'x-access-token': this.getUserAuthToken(),
      //     role: this.getUserRole(),
      //     userId: this.getUserId()
      //   }
      // }
      // let formData = new FormData()
      // if (docType === 'otr') {
      //   formData.append('status', this.propertyData.status)
      // }
      // formData.append('listingId', this.propertyData.listingId)
      // formData.append('documentType', type)
      // formData.append('document', file)
      // formData.append('documentName', name)
      // this.showLoadingModal = true
      // transactionService.uploadDocuments(formData, headers).then(resp => {
      //   this.$toasted.global.uploadFileSuccess()
      //   this.getTransactionData(this.propertyData.listingId)
      //   this.showLoadingModal = false
      // }).catch(err => {
      //   this.showLoadingModal = false
      //   console.error(err)
      // })
    }
  }
  // mixins: [downloadDocumentUtil, fetchPropertyData, disabledUtil],
  // watch: {
  //   documentContract: function(val) {
  //     this.uploadDocumentFile(val, CONTRACT.code, val.name);
  //   },
  //   documentReviewOfContract: function(val) {
  //     this.uploadDocumentFile(val, REVIEWOFCONTRACT.code, val.name);
  //   },
  //   documentEngagementLetter: function(val) {
  //     this.uploadDocumentFile(val, ENGAGEMENTLETTER.code, val.name);
  //   },
  //   documentCostsDisclosue: function(val) {
  //     this.uploadDocumentFile(val, COSTSDISCLOSURE.code, val.name);
  //   },
  //   documentDraftContract: function(val) {
  //     this.uploadDocumentFile(val, DRAFTCONTRACT.code, val.name);
  //   },
  //   documentFinalContract: function(val) {
  //     this.uploadDocumentFile(val, FINALCONTRACT.code, val.name);
  //   },
  //   documentSellersQuestionnaire: function(val) {
  //     this.uploadDocumentFile(val, SELLERSQUESTIONNAIRE.code, val.name);
  //   },
  //   documentSignedContract: function(val) {
  //     this.uploadDocumentFile(val, SIGNEDCONTRACT.code, val.name);
  //   },
  //   documentSignedForm: function(val) {
  //     this.uploadDocumentFile(val, SIGNEDAUTHORISATIONFORM.code, val.name);
  //   },
  //   documentBuyersQuestionnaire: function(val) {
  //     this.uploadDocumentFile(val, BUYERSQUESTIONNAIRE.code, val.name);
  //   },
  //   documentS27DRS: function(val) {
  //     this.uploadDocumentFile(val, S27DRS.code, val.name);
  //   },
  //   documentSignedSection27: function(val) {
  //     this.uploadDocumentFile(val, SIGNEDSECTION27.code, val.name);
  //   },
  //   documentSOAndSettlementStatement: function(val) {
  //     this.uploadDocumentFile(
  //       val,
  //       STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT.code,
  //       val.name
  //     );
  //   },
  //   documentSettlementCosts: function(val) {
  //     this.uploadDocumentFile(val, SETTLEMENTCOSTS.code, val.name);
  //   },
  //   documentTaxInvoice: function(val) {
  //     this.uploadDocumentFile(val, TAXINVOICE.code, val.name);
  //   },
  //   documentAccountSales: function(val) {
  //     this.uploadDocumentFile(val, ACCOUNTSALES.code, val.name);
  //   },
  //   documentOtherDocument: function(val) {
  //     let documentType = this.propertyData.documentNameOthers.replace(
  //       /\s/g,
  //       "_"
  //     );
  //     this.uploadDocumentFile(val, `otr-${documentType}`, val.name, "otr");
  //   },
  //   documentSignedSection32: function(val) {
  //     this.uploadDocumentFile(val, SIGNEDSECTION32.code, val.name);
  //   },
  //   documentSection32: function(val) {
  //     this.uploadDocumentFile(val, SECTION32.code, val.name);
  //   },
  //   documentRegisteredPlan: function(val) {
  //     this.uploadDocumentFile(val, REGISTEREDPLAN.code, val.name);
  //   },
  //   documentCertificateOfOccupancy: function(val) {
  //     this.uploadDocumentFile(val, CERTIFICATEOFOCCUPANCY.code, val.name);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
@import "./assets/css/buttons.scss";
</style>
