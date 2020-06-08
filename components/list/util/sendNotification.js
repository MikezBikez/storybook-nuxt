// import transactionService from "../services/convx_api/transaction";
// import fetchPropertyData from "../util/fetchPropertyData.js";
import CONSTANTS from "../static/constants";
// import transactionSteps from "../util/transactionSteps";

export default {
  data() {
    return {
      totalCostError: false
    };
  },
  // mixins: [fetchPropertyData],
  methods: {
    isNotificationSent(property, notificationCode) {
      // const {
      //   REVIEWCOMPLETEDDOCS,
      //   DEPOSITRELEASE,
      //   FINALINSPECTIONREMINDERAGENT,
      //   FINALINSPECTIONREMINDERBUYER,
      //   FINALINSPECTIONREMINDERSELLER,
      //   SETTLEMENTREMINDERAGENT,
      //   SENDTAXINVOICEBUYER,
      //   PRESETTLEMENTREMINDERBUYER,
      //   PRESETTLEMENTREMINDERSELLER,
      //   SENDTAXINVOICESELLER,
      //   DRAFTCONTRACTAPPROVE,
      //   INITIALDOCUMENTREMINDER,
      //   REGISTEREDPLAN,
      //   SROEMAILNOTIFBUYER
      // } = transactionSteps;
      // let isNotificationSent = false;
      // // return true if notification isCompleted
      // if (
      //   notificationCode === REVIEWCOMPLETEDDOCS.code &&
      //   property.isReviewCompletedDocsCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === DEPOSITRELEASE.code &&
      //   property.isDepositReleaseNotificationCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === FINALINSPECTIONREMINDERAGENT.code &&
      //   property.isFinalInspectionAgentNotifCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === FINALINSPECTIONREMINDERBUYER.code &&
      //   property.isFinalInspectionBuyerNotifCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === SROEMAILNOTIFBUYER.code &&
      //   property.isSendSROEmailBuyerNotifCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === SETTLEMENTREMINDERAGENT.code &&
      //   property.isSettlementReminderNotifCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === SENDTAXINVOICEBUYER.code &&
      //   property.isSendTaxInvoiceBuyerCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === PRESETTLEMENTREMINDERBUYER.code &&
      //   property.isPreSettlementReminderBuyerCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === PRESETTLEMENTREMINDERSELLER.code &&
      //   property.isPreSettlementReminderSellerCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === FINALINSPECTIONREMINDERSELLER.code &&
      //   property.isFinalInspectionSellerNotifCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === SENDTAXINVOICESELLER.code &&
      //   property.isSendTaxInvoiceSellerCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === DRAFTCONTRACTAPPROVE.code &&
      //   property.isDraftContractApprovedCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === INITIALDOCUMENTREMINDER.code &&
      //   property.isInitialDocumentReminderCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // if (
      //   notificationCode === REGISTEREDPLAN.code &&
      //   property.isPlanRegisteredCompleted
      // ) {
      //   isNotificationSent = true;
      // }
      // return isNotificationSent;
    },
    updateRegisteredDate(property, notificationCode) {
      // const { REGISTEREDPLAN } = transactionSteps;
      // const headers = {
      //   headers: this.getHeaderObject()
      // };
      // let params = {
      //   listingId: property.listingId,
      //   // to followed
      //   registrationDate: new Date(property.registrationDate).addDays(1),
      //   stage: CONSTANTS.TRANS_STATUS.POSTCONTRACT,
      //   step: null,
      //   multipleStep: [REGISTEREDPLAN.code],
      //   transactionType: property.transactionType
      // };
      // this.showLoadingModal = true;
      // transactionService
      //   .updateListingRegistrationDate(params, headers)
      //   .then(resp => {
      //     this.showLoadingModal = false;
      //     transactionService
      //       .updatePropertyListingConveyancingSteps(params, headers)
      //       .then(resp => {
      //         window.jQuery(`#setRegisteredPlanModal`).modal("hide");
      //         this.getTransactionData(property.listingId);
      //         this.$toasted.global.successfullySetRegistrationDate();
      //         this.showLoadingModal = false;
      //       })
      //       .catch(err => {
      //         this.showLoadingModal = false;
      //         console.error(err);
      //       });
      //   })
      //   .catch(err => {
      //     this.showLoadingModal = false;
      //     console.error(err);
      //   });
    },
    updateSteps(property, notificationCode) {
      // const { REGISTEREDPLAN, REVIEWCOMPLETEDDOCS } = transactionSteps;
      // if (
      //   notificationCode === REGISTEREDPLAN.code &&
      //   property.status === CONSTANTS.TRANS_STATUS.POSTCONTRACT
      // ) {
      //   this.updateRegisteredDate(property, notificationCode);
      // } else {
      //   const headers = {
      //     headers: this.getHeaderObject()
      //   };
      //   const { listingId, status, transactionType } = property;
      //   const params = this.assignParams(
      //     status,
      //     transactionType,
      //     listingId,
      //     property,
      //     notificationCode
      //   );
      //   // validate if there is already final inspection date and time
      //   if (params) {
      //     if (params.multipleStep.length > 0) {
      //       this.showLoadingModal = true;
      //       transactionService
      //         .updatePropertyListingConveyancingSteps(params, headers)
      //         .then(resp => {
      //           notificationCode === REVIEWCOMPLETEDDOCS.code
      //             ? this.$toasted.global.successfullyMarkedAsCompleted()
      //             : this.$toasted.global.successfullySendNotification();
      //           window.jQuery(`#confirmationModal`).modal("hide");
      //           this.getTransactionData(listingId);
      //           this.isNotificationSent(property, notificationCode);
      //           // remove validation after sending send tax invoice
      //           this.totalCostError = false;
      //           this.showLoadingModal = false;
      //         })
      //         .catch(err => {
      //           this.showLoadingModal = false;
      //           console.error(err);
      //         });
      //     }
      //   }
      // }
    },
    assignParams(stage, type, listingId, property, notificationCode) {
      // const {
      //   REVIEWCOMPLETEDDOCS,
      //   DEPOSITRELEASE,
      //   FINALINSPECTIONREMINDERAGENT,
      //   FINALINSPECTIONREMINDERBUYER,
      //   FINALINSPECTIONREMINDERSELLER,
      //   SETTLEMENTREMINDERAGENT,
      //   SENDTAXINVOICEBUYER,
      //   PRESETTLEMENTREMINDERBUYER,
      //   PRESETTLEMENTREMINDERSELLER,
      //   SENDTAXINVOICESELLER,
      //   DRAFTCONTRACTAPPROVE,
      //   INITIALDOCUMENTREMINDER,
      //   REGISTEREDPLAN,
      //   SROEMAILNOTIFBUYER
      // } = transactionSteps;
      // let param = {
      //   listingId,
      //   stage,
      //   step: null,
      //   multipleStep: [],
      //   transactionType: type,
      //   totalCost: property.totalCost
      // };
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.POSTCONTRACT &&
      //   (type === CONSTANTS.USER_TYPE.BUYER ||
      //     type === CONSTANTS.USER_TYPE.BUYER_OFF_THE_PLAN) &&
      //   notificationCode === REVIEWCOMPLETEDDOCS.code &&
      //   !property.isReviewCompletedDocsCompleted
      // ) {
      //   param.multipleStep.push(REVIEWCOMPLETEDDOCS.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.POSTCONTRACT &&
      //   type === CONSTANTS.USER_TYPE.SELLER &&
      //   notificationCode === DEPOSITRELEASE.code &&
      //   !property.isDepositReleaseNotificationCompleted
      // ) {
      //   param.multipleStep.push(DEPOSITRELEASE.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
      //   (type === CONSTANTS.USER_TYPE.BUYER ||
      //     type === CONSTANTS.USER_TYPE.BUYER_OFF_THE_PLAN) &&
      //   notificationCode === FINALINSPECTIONREMINDERAGENT.code &&
      //   !property.isFinalInspectionAgentNotifCompleted
      // ) {
      //   param.multipleStep.push(FINALINSPECTIONREMINDERAGENT.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
      //   (type === CONSTANTS.USER_TYPE.BUYER ||
      //     type === CONSTANTS.USER_TYPE.BUYER_OFF_THE_PLAN) &&
      //   notificationCode === FINALINSPECTIONREMINDERBUYER.code &&
      //   !property.isFinalInspectionBuyerNotifCompleted
      // ) {
      //   param.multipleStep.push(FINALINSPECTIONREMINDERBUYER.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
      //   (type === CONSTANTS.USER_TYPE.BUYER ||
      //     type === CONSTANTS.USER_TYPE.BUYER_OFF_THE_PLAN) &&
      //   notificationCode === SROEMAILNOTIFBUYER.code &&
      //   !property.isSendSROEmailBuyerNotifCompleted
      // ) {
      //   param.multipleStep.push(SROEMAILNOTIFBUYER.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
      //   (type === CONSTANTS.USER_TYPE.BUYER ||
      //     type === CONSTANTS.USER_TYPE.BUYER_OFF_THE_PLAN) &&
      //   notificationCode === SETTLEMENTREMINDERAGENT.code &&
      //   !property.isSettlementReminderNotifCompleted
      // ) {
      //   param.multipleStep.push(SETTLEMENTREMINDERAGENT.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
      //   (type === CONSTANTS.USER_TYPE.BUYER ||
      //     type === CONSTANTS.USER_TYPE.BUYER_OFF_THE_PLAN) &&
      //   notificationCode === SENDTAXINVOICEBUYER.code &&
      //   !property.isSendTaxInvoiceBuyerCompleted
      // ) {
      //   // check if total cost is already inputted
      //   if (property.totalCost && typeof property.totalCost !== "undefined") {
      //     param.multipleStep.push(SENDTAXINVOICEBUYER.code);
      //   } else {
      //     this.totalCostError = true;
      //     return false;
      //   }
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
      //   (type === CONSTANTS.USER_TYPE.BUYER ||
      //     type === CONSTANTS.USER_TYPE.BUYER_OFF_THE_PLAN) &&
      //   notificationCode === PRESETTLEMENTREMINDERBUYER.code &&
      //   !property.isPreSettlementReminderBuyerCompleted
      // ) {
      //   param.multipleStep.push(PRESETTLEMENTREMINDERBUYER.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
      //   type === CONSTANTS.USER_TYPE.SELLER &&
      //   notificationCode === PRESETTLEMENTREMINDERSELLER.code &&
      //   !property.isPreSettlementReminderSellerCompleted
      // ) {
      //   param.multipleStep.push(PRESETTLEMENTREMINDERSELLER.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
      //   type === CONSTANTS.USER_TYPE.SELLER &&
      //   notificationCode === FINALINSPECTIONREMINDERSELLER.code &&
      //   !property.isFinalInspectionSellerNotifCompleted
      // ) {
      //   param.multipleStep.push(FINALINSPECTIONREMINDERSELLER.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
      //   type === CONSTANTS.USER_TYPE.SELLER &&
      //   notificationCode === SENDTAXINVOICESELLER.code &&
      //   !property.isSendTaxInvoiceSellerCompleted
      // ) {
      //   // check if total cost is already inputted
      //   if (property.totalCost && typeof property.totalCost !== "undefined") {
      //     param.multipleStep.push(SENDTAXINVOICESELLER.code);
      //   } else {
      //     this.totalCostError = true;
      //     return false;
      //   }
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.PRECONTRACT &&
      //   type === CONSTANTS.USER_TYPE.SELLER &&
      //   notificationCode === DRAFTCONTRACTAPPROVE.code &&
      //   !property.isDraftContractApprovedCompleted
      // ) {
      //   param.multipleStep.push(DRAFTCONTRACTAPPROVE.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.POSTCONTRACT &&
      //   (type === CONSTANTS.USER_TYPE.BUYER ||
      //     type === CONSTANTS.USER_TYPE.BUYER_OFF_THE_PLAN) &&
      //   notificationCode === INITIALDOCUMENTREMINDER.code &&
      //   !property.isInitialDocumentReminderCompleted
      // ) {
      //   param.multipleStep.push(INITIALDOCUMENTREMINDER.code);
      // }
      // if (
      //   stage === CONSTANTS.TRANS_STATUS.POSTCONTRACT &&
      //   type === CONSTANTS.USER_TYPE.BUYER_OFF_THE_PLAN &&
      //   notificationCode === REGISTEREDPLAN.code &&
      //   !property.isPlanRegisteredCompleted
      // ) {
      //   param.multipleStep.push(REGISTEREDPLAN.code);
      // }
      // return param;
    }
  }
};
