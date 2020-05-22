// Static files
import CONSTANTS from "../static/constants";
import NextStepsJSON from "./next-steps.json";
import {
  WEBFORM_CODE,
  WEBFORM_STATUS_MAPPING,
  WEBFORM_CODES,
  WEBFORM_STATUS,
  WEBFORM_VALIDATION
} from "../static/webforms-json";
import Meta from "../static/meta";
// Utils
import tokenUtil from "../util/JWTUtil.js";
import downloadDocumentUtil from "../util/downloadDocument.js";
import approveDeclineUtil from "../util/approveDecline.js";
import {
  BUYING,
  SELLING,
  BOFFTHEPLAN
} from "../util/transactionTypeConstants.js";
import sendNotificationUtil from "../util/sendNotification.js";
import moveToNextStageUtil from "../util/moveToNextStage.js";
import {
  ENGAGEMENTLETTER,
  COSTSDISCLOSURE,
  DRAFTCONTRACT,
  CONTRACT,
  REVIEWOFCONTRACT,
  SECTION32,
  SIGNEDSECTION32,
  FINALCONTRACT,
  SIGNEDCONTRACT,
  SIGNEDAUTHORISATIONFORM,
  SELLERSQUESTIONNAIRE,
  BUYERSQUESTIONNAIRE,
  S27DRS,
  SIGNEDSECTION27,
  STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT,
  SETTLEMENTCOSTS,
  TAXINVOICE,
  ACCOUNTSALES,
  REGISTEREDPLAN,
  CERTIFICATEOFOCCUPANCY
} from "../util/transactionDocuments.js";
// Services
import webformsService from "../services/convx_api/webforms";
// Components
import LoadingComponent from "~/components/Loading";
import SettlementDateTime from "~/components/SettlementDateTime.vue";
import UploadDownloadDocumentComponent from "~/components/UploadDownloadDocument";
import ApproveDeclineDocumentComponent from "~/components/ApproveDeclineDocument";
import AssignReassignConveyancerComponent from "~/components/AssignReassignConveyancer";
import RedirectToWebformComponent from "~/components/RedirectToWebform";
import GenericConfirmationModal from "~/components/GenericConfirmationModal.vue";
import SendNotificationComponent from "~/components/SendNotification";
import TotalCost from "~/components/TotalCost.vue";
import disabledUtil from "../util/isDisabledUtil.js";
import RegisteredPlanComponent from "~/components/RegisteredPlan.vue";
import fetchPropertyData from "../util/fetchPropertyData.js";

export default {
  head() {
    return {
      title: Meta.nextSteps.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: Meta.nextSteps.description
        },
        { hid: "keywords", name: "keywords", content: Meta.nextSteps.keyword }
      ]
    };
  },
  layout: "user-layout",
  data() {
    return {
      nextStepsJSON: "",
      modalData: "",
      modalConfirmationModalName: "",
      modalHeader: "",
      documentStatusType: "",
      currentDocumentType: "",
      notificationCode: "",
      nextStageAddress: "",
      propertyDocuments: [],
      signatureDetails: [],
      webformData: [],
      webformArray: [],
      totalCostError: false,
      approvalDraftAndSection32: "",
      showLoadingModal: false,
      propertyDataWebForms: []
      // documentName: '' temporary commenting out
    };
  },
  components: {
    LoadingComponent,
    UploadDownloadDocumentComponent,
    ApproveDeclineDocumentComponent,
    GenericConfirmationModal,
    SendNotificationComponent,
    SettlementDateTime,
    AssignReassignConveyancerComponent,
    TotalCost,
    RegisteredPlanComponent,
    RedirectToWebformComponent
  },
  mixins: [
    tokenUtil,
    downloadDocumentUtil,
    approveDeclineUtil,
    sendNotificationUtil,
    moveToNextStageUtil,
    disabledUtil,
    fetchPropertyData
  ],
  beforeMount() {
    let authorizedUsers = [
      CONSTANTS.USER_ROLE.CONVEYANCER,
      CONSTANTS.USER_ROLE.CUSTOMER,
      CONSTANTS.USER_ROLE.REALSTATEAGENT,
      CONSTANTS.USER_ROLE.PARTNERADMIN,
      CONSTANTS.USER_ROLE.OFFICEMANAGER,
      CONSTANTS.USER_ROLE.DIRECTOR,
      CONSTANTS.USER_ROLE.ADMIN,
      CONSTANTS.USER_ROLE.CHIEFPRACTICEMANAGER
    ];
    if (!authorizedUsers.includes(this.getUserRole())) {
      this.$router.push("/error");
    }
  },
  mounted: function() {
    this.filterStepsJSON();
    this.propertyDataWebForms = this.propertyStepsObject;
    // when page is reload refetch API
    this.getTransactionData(this.propertyStepsObject.listingId);
    if (
      this.isPropertyOnPreContractStageSelling ||
      this.isPropertyOnPostContractStageBuying ||
      this.isPropertyOnPostContractStageBOffThePlan ||
      this.isPropertyOnPreSettlementBOffThePlan
    ) {
      this.getSignatureCount();
    }
  },
  computed: {
    propertyStepsObject() {
      return this.$store.getters.propertyDetails;
    },
    isPropertyOnPreContractStageBuying() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.PRECONTRACT &&
        this.propertyStepsObject.transactionType === BUYING.code
      );
    },
    isPropertyOnPreContractStageSelling() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.PRECONTRACT &&
        this.propertyStepsObject.transactionType === SELLING.code
      );
    },
    isPropertyOnPreContractStageBOffThePlan() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.PRECONTRACT &&
        this.propertyStepsObject.transactionType === BOFFTHEPLAN.code
      );
    },
    isPropertyOnPostContractStageBuying() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.POSTCONTRACT &&
        this.propertyStepsObject.transactionType === BUYING.code
      );
    },
    isPropertyOnPostContractStageSelling() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.POSTCONTRACT &&
        this.propertyStepsObject.transactionType === SELLING.code
      );
    },
    isPropertyOnPostContractStageBOffThePlan() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.POSTCONTRACT &&
        this.propertyStepsObject.transactionType === BOFFTHEPLAN.code
      );
    },
    isPropertyOnPreSettlementBuying() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
        this.propertyStepsObject.transactionType === BUYING.code
      );
    },
    isPropertyOnPreSettlementSelling() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
        this.propertyStepsObject.transactionType === SELLING.code
      );
    },
    isPropertyOnPreSettlementBOffThePlan() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.PRESETTLEMENT &&
        this.propertyStepsObject.transactionType === BOFFTHEPLAN.code
      );
    },
    isPropertyOnPostSettlementBuying() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.POSTSETTLEMENT &&
        this.propertyStepsObject.transactionType === BUYING.code
      );
    },
    isPropertyOnPostSettlementSelling() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.POSTSETTLEMENT &&
        this.propertyStepsObject.transactionType === SELLING.code
      );
    },
    isPropertyOnPostSettlementBOffThePlan() {
      return (
        this.propertyStepsObject.status ===
          CONSTANTS.TRANS_STATUS.POSTSETTLEMENT &&
        this.propertyStepsObject.transactionType === BOFFTHEPLAN.code
      );
    }
  },
  watch: {
    propertyDataWebForms: {
      handler: function(newValue) {
        this.$store.dispatch("setPropertyDetails", newValue);
      }
    },
    propertyStepsObject: {
      handler: function(newValue) {
        this.propertyDataWebForms = newValue;
      }
    },
    deep: true
  },
  methods: {
    isActionAvailable(property, documentType) {
      if (documentType === ENGAGEMENTLETTER.code) {
        return property.isEngagementLetter;
      } else if (documentType === DRAFTCONTRACT.code) {
        return property.isDraftContract;
      } else if (documentType === SECTION32.code) {
        return property.isSection32;
      } else if (documentType === FINALCONTRACT.code) {
        return property.isFinalContract;
      } else if (documentType === SIGNEDSECTION32.code) {
        return property.isSignedSection32;
      } else if (documentType === SIGNEDCONTRACT.code) {
        return property.isSignedContract;
      } else if (documentType === "move-to-next-stage") {
        return (
          this.isPropertyForNextStage(property) &&
          (this.isUserAdmin ||
            this.isUserChiefPracticeManager ||
            this.isUserConveyancer)
        );
      } else if (documentType === S27DRS.code) {
        return property.isS27DRS;
      } else if (documentType === SIGNEDSECTION27.code) {
        return property.isSignedSection27;
      } else if (
        documentType === STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT.code
      ) {
        return property.isSOASS;
      } else if (documentType === SETTLEMENTCOSTS.code) {
        return property.isSettlementCosts;
      } else if (documentType === TAXINVOICE.code) {
        return property.isTaxInvoice;
      } else if (documentType === ACCOUNTSALES.code) {
        return property.isAccountSales;
      } else if (documentType === "settlement-date-time") {
        return (
          property.isSettlementDateTimeSet ||
          (this.isUserAdmin ||
            this.isUserChiefPracticeManager ||
            this.isUserConveyancer)
        );
      } else if (documentType === CONTRACT.code) {
        return property.isContractUpload;
      } else if (documentType === REVIEWOFCONTRACT.code) {
        return property.isContractReview;
      } else if (documentType === "registered-plan") {
        return (
          property.isPlanRegistered ||
          (this.isUserAdmin ||
            this.isUserChiefPracticeManager ||
            this.isUserConveyancer)
        );
      } else if (documentType === REGISTEREDPLAN.code) {
        return property.isRegisteredPlan;
      } else if (documentType === CERTIFICATEOFOCCUPANCY.code) {
        return property.isCertificateOccupancy;
      }
    },
    isDocumentDeclined(property, documentType) {
      if (property.forApprovalDocumentStatuses.length > 0) {
        return property.forApprovalDocumentStatuses.find(
          document =>
            documentType === document.documentName &&
            document.documentStatus === "Declined"
        );
      } else {
        return false;
      }
    },
    isPropertyForNextStage(property) {
      return (
        property.isPropertyForPostContract ||
        property.isPropertyForPreSettlement ||
        property.isPropertyForPostSettlement
      );
    },
    onClickModal() {
      if (this.notificationCode) {
        this.updateSteps(this.propertyStepsObject, this.notificationCode);
      } else if (this.nextStageAddress) {
        this.submitStage(this.propertyStepsObject);
      } else if (this.approvalDraftAndSection32) {
        this.updateSteps(this.propertyStepsObject, "DCA");
      } else {
        this.updateDocumentStatus(
          this.propertyStepsObject.listingId,
          this.documentStatusType,
          this.currentDocumentType
        );
      }
    },
    openApproveDeclineModal(values) {
      this.notificationCode = "";
      this.nextStageAddress = "";
      this.approvalDraftAndSection32 = "";
      // set modal values
      const {
        modalData,
        modalConfirmationModalName,
        modalHeader,
        documentStatusType,
        currentDocumentType
      } = values;
      this.modalData = modalData;
      this.modalConfirmationModalName = modalConfirmationModalName;
      this.modalHeader = modalHeader;
      this.documentStatusType = documentStatusType;
      this.currentDocumentType = currentDocumentType;
    },
    openSendNotificationModal(values) {
      this.documentStatusType = "";
      this.currentDocumentType = "";
      this.nextStageAddress = "";
      this.approvalDraftAndSection32 = "";
      // set modal values
      const {
        modalData,
        modalConfirmationModalName,
        modalHeader,
        notificationCode
      } = values;
      this.modalData = modalData;
      this.modalConfirmationModalName = modalConfirmationModalName;
      this.modalHeader = modalHeader;
      this.notificationCode = notificationCode;
    },
    openNextStageModal(property) {
      this.documentStatusType = "";
      this.currentDocumentType = "";
      this.notificationCode = "";
      this.approvalDraftAndSection32 = "";
      this.nextStageAddress = property.address;
      if (property.status === CONSTANTS.TRANS_STATUS.PRECONTRACT) {
        this.modalHeader = "Move to post-contract";
        this.modalData =
          "Are you sure you want to submit this property to post-contract?";
        this.modalConfirmationModalName = "Yes";
      }
      if (property.status === CONSTANTS.TRANS_STATUS.POSTCONTRACT) {
        this.modalHeader = "Move to pre-settlement";
        this.modalData =
          "Are you sure you want to submit this property for pre-settlement?";
        this.modalConfirmationModalName = "Yes";
      }
      if (property.status === CONSTANTS.TRANS_STATUS.PRESETTLEMENT) {
        this.modalHeader = "Move to post-settlement";
        this.modalData =
          "Are you sure you want to submit this property to post-settlement?";
        this.modalConfirmationModalName = "Yes";
      }
      window.jQuery(`#confirmationModal`).modal({
        backdrop: "static",
        keyboard: false
      });
    },
    openApproveDraftAndSection32Modal(property, filter) {
      this.documentStatusType = "";
      this.currentDocumentType = "";
      this.notificationCode = "";
      this.nextStageAddress = "";
      this.approvalDraftAndSection32 = filter;
      this.modalHeader = "Approve document";
      this.modalData =
        "Are you sure you want to approve the draft contract of sale and draft section 32 document?";
      this.modalConfirmationModalName = "Yes";
      window.jQuery(`#confirmationModal`).modal({
        backdrop: "static",
        keyboard: false
      });
    },
    openRegisteredPlanModal() {
      window.jQuery(`#setRegisteredPlanModal`).modal({
        backdrop: "static",
        keyboard: false
      });
    },
    triggerSetSettlementDateTime() {
      window.jQuery("#setSettlementDateTimeModal").modal({
        backdrop: "static",
        keyboard: false
      });
    },
    filterStepsJSON() {
      this.filterStatus = "";
      if (this.isPropertyOnPreContractStageBuying) {
        this.filterStatus = "preContractBuying";
      } else if (this.isPropertyOnPreContractStageSelling) {
        this.filterStatus = "preContractSelling";
      } else if (this.isPropertyOnPostContractStageBuying) {
        this.filterStatus = "postContractBuying";
      } else if (this.isPropertyOnPostContractStageSelling) {
        this.filterStatus = "postContractSelling";
      } else if (this.isPropertyOnPreSettlementBuying) {
        this.filterStatus = "preSettlementBuying";
      } else if (this.isPropertyOnPreSettlementSelling) {
        this.filterStatus = "preSettlementSelling";
      } else if (this.isPropertyOnPostSettlementBuying) {
        this.filterStatus = "postSettlementBuying";
      } else if (this.isPropertyOnPostSettlementSelling) {
        this.filterStatus = "postSettlementSelling";
      } else if (this.isPropertyOnPreContractStageBOffThePlan) {
        if (
          this.propertyStepsObject.currentStep === "CR" ||
          this.propertyStepsObject.currentStep === "CR"
        ) {
          this.filterStatus = "preContractBOffThePlanCR";
        } else {
          this.filterStatus = "preContractBOffThePlanSC";
        }
      } else if (this.isPropertyOnPostContractStageBOffThePlan) {
        this.filterStatus = "postContractBOffThePlan";
      } else if (this.isPropertyOnPreSettlementBOffThePlan) {
        this.filterStatus = "preSettlementBOffThePlan";
      } else if (this.isPropertyOnPostSettlementBOffThePlan) {
        this.filterStatus = "postSettlementBOffThePlan";
      }
      this.nextStepsJSON = NextStepsJSON[this.filterStatus];
    },
    isResponsibleCustomer() {
      // admin and cpm can do the same
      return (
        this.isUserAdmin ||
        this.isUserChiefPracticeManager ||
        this.isUserCustomer
      );
    },
    isResponsibleCustomerSignedAndContract() {
      // admin and cpm can do the same
      return (
        this.isUserAdmin ||
        this.isUserChiefPracticeManager ||
        this.isUserCustomer ||
        this.isUserOfficeManager ||
        this.isUserDirector ||
        this.isUserRealEstateAgent
      );
    },
    isResponsibleConveyancer() {
      // admin and cpm can do the same
      return (
        this.isUserAdmin ||
        this.isUserChiefPracticeManager ||
        this.isUserConveyancer
      );
    },
    isDocumentApprovalStatus(property, type) {
      return (
        this.hasDownloadDocument(property, type) ||
        this.isResponsibleConveyancer()
      );
    },
    isApproveDraftSectionStatus(property) {
      return property.isDraftContract && property.isSection32;
    },
    getStatus(property, type) {
      if (type === ENGAGEMENTLETTER.code) {
        return property.isEngagementLetter
          ? "COMPLETED"
          : this.isDocumentDeclined(property, type)
          ? "DECLINED"
          : this.isDocumentApprovalStatus(property, type)
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === DRAFTCONTRACT.code) {
        return property.isDraftContract
          ? "COMPLETED"
          : this.isDocumentDeclined(property, type)
          ? "DECLINED"
          : this.isDocumentApprovalStatus(property, type)
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === COSTSDISCLOSURE.code) {
        return this.formStatus(type) === "completed"
          ? "COMPLETED"
          : this.formStatus(type) === "pending"
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === SIGNEDAUTHORISATIONFORM.code) {
        return this.formStatus(type) === "completed"
          ? "COMPLETED"
          : this.formStatus(type) === "pending"
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === SELLERSQUESTIONNAIRE.code) {
        return this.formStatus(type) === "completed"
          ? "COMPLETED"
          : this.formStatus(type) === "pending"
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === BUYERSQUESTIONNAIRE.code) {
        return this.formStatus(type) === "completed"
          ? "COMPLETED"
          : this.formStatus(type) === "pending"
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === SECTION32.code) {
        return property.isSection32
          ? "COMPLETED"
          : this.isDocumentDeclined(property, type)
          ? "DECLINED"
          : this.isDocumentApprovalStatus(property, type)
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === "approve-draft-contract-draft-section-32") {
        return property.isDraftContractApprovedCompleted
          ? "COMPLETED"
          : this.isApproveDraftSectionStatus(property)
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === SIGNEDSECTION32.code) {
        return property.isSignedSection32
          ? "COMPLETED"
          : this.isResponsibleCustomer() &&
            property.isDraftContractApprovedCompleted
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === FINALCONTRACT.code) {
        return property.isFinalContract
          ? "COMPLETED"
          : this.isResponsibleConveyancer()
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === SIGNEDCONTRACT.code) {
        return property.isSignedContract
          ? "COMPLETED"
          : this.isResponsibleCustomerSignedAndContract()
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === "move-to-next-stage") {
        return this.isPropertyForNextStage(property)
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === "conveyancer-assigned") {
        return property.conveyancerId ? "COMPLETED" : "PENDING";
      } else if (type === "deposit-release-notification") {
        return property.isDepositReleaseNotification ? "COMPLETED" : "PENDING";
      } else if (type === S27DRS.code) {
        return property.isS27DRS
          ? "COMPLETED"
          : this.isResponsibleConveyancer()
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === SIGNEDSECTION27.code) {
        return property.isSignedSection27
          ? "COMPLETED"
          : this.isResponsibleCustomer()
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT.code) {
        return property.isSOASS
          ? "COMPLETED"
          : this.isDocumentDeclined(property, type)
          ? "DECLINED"
          : this.isDocumentApprovalStatus(property, type)
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === SETTLEMENTCOSTS.code) {
        return property.isSettlementCosts
          ? "COMPLETED"
          : this.isDocumentDeclined(property, type)
          ? "DECLINED"
          : this.isDocumentApprovalStatus(property, type)
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === TAXINVOICE.code) {
        return property.isTaxInvoice
          ? "COMPLETED"
          : this.isResponsibleConveyancer()
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === ACCOUNTSALES.code) {
        return property.isAccountSales
          ? "COMPLETED"
          : this.isResponsibleConveyancer()
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === "send-customer-alert") {
        return property.isPreSettlementReminderSeller ||
          property.isPreSettlementReminderBuyer
          ? "COMPLETED"
          : "PENDING";
      } else if (type === "settlement-date-time") {
        return property.isSettlementDateTimeSet ? "COMPLETED" : "PENDING";
      } else if (type === "final-inspection-reminder-agent") {
        return property.isFinalInspectionAgentNotif ? "COMPLETED" : "PENDING";
      } else if (type === "notification-sro-email") {
        return property.isFinalInspectionSellerNotif ||
          property.isSendSROEmailBuyerNotif
          ? "COMPLETED"
          : "PENDING";
      } else if (type === "settlement-reminder-agent") {
        return property.isSettlementReminderNotif ? "COMPLETED" : "PENDING";
      } else if (type === "final-inspection-reminder-buyer") {
        return property.isFinalInspectionBuyerNotif ? "COMPLETED" : "PENDING";
      } else if (type === "send-tax-invoice-buyer") {
        return property.isSendTaxInvoiceBuyer
          ? "COMPLETED"
          : property.isTaxInvoice
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === "send-tax-invoice-seller") {
        return property.isSendTaxInvoiceSeller
          ? "COMPLETED"
          : property.isTaxInvoice
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === CONTRACT.code) {
        return property.isContractUpload
          ? "COMPLETED"
          : this.isResponsibleCustomerSignedAndContract()
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === REVIEWOFCONTRACT.code) {
        return property.isContractReview
          ? "COMPLETED"
          : this.isDocumentDeclined(property, type)
          ? "DECLINED"
          : this.isDocumentApprovalStatus(property, type)
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === "initial-documents-reminder") {
        return property.isInitialDocumentReminder ? "COMPLETED" : "PENDING";
      } else if (type === "review-completed-documents") {
        return property.isReviewCompletedDocs
          ? "COMPLETED"
          : property.isInitialDocument
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === "registered-plan") {
        return property.isPlanRegistered ? "COMPLETED" : "PENDING";
      } else if (type === REGISTEREDPLAN.code) {
        return property.isRegisteredPlan
          ? "COMPLETED"
          : this.isResponsibleConveyancer()
          ? "PENDING"
          : "NOT AVAILABLE";
      } else if (type === CERTIFICATEOFOCCUPANCY.code) {
        return property.isCertificateOccupancy
          ? "COMPLETED"
          : this.isResponsibleConveyancer()
          ? "PENDING"
          : "NOT AVAILABLE";
      }
    },
    statusClass(property, type) {
      if (type === ENGAGEMENTLETTER.code) {
        return property.isEngagementLetter
          ? "success"
          : this.isDocumentDeclined(property, type)
          ? "danger"
          : this.isDocumentApprovalStatus(property, type)
          ? "primary"
          : "not-available";
      } else if (type === DRAFTCONTRACT.code) {
        return property.isDraftContract
          ? "success"
          : this.isDocumentDeclined(property, type)
          ? "danger"
          : this.isDocumentApprovalStatus(property, type)
          ? "primary"
          : "not-available";
      } else if (type === COSTSDISCLOSURE.code) {
        return this.formStatus(type) === "completed"
          ? "success"
          : this.formStatus(type) === "pending"
          ? "primary"
          : "not-available";
      } else if (type === SIGNEDAUTHORISATIONFORM.code) {
        return this.formStatus(type) === "completed"
          ? "success"
          : this.formStatus(type) === "pending"
          ? "primary"
          : "not-available";
      } else if (type === SELLERSQUESTIONNAIRE.code) {
        return this.formStatus(type) === "completed"
          ? "success"
          : this.formStatus(type) === "pending"
          ? "primary"
          : "not-available";
      } else if (type === BUYERSQUESTIONNAIRE.code) {
        return this.formStatus(type) === "completed"
          ? "success"
          : this.formStatus(type) === "pending"
          ? "primary"
          : "not-available";
      } else if (type === SECTION32.code) {
        return property.isSection32
          ? "success"
          : this.isDocumentDeclined(property, type)
          ? "danger"
          : this.isDocumentApprovalStatus(property, type)
          ? "primary"
          : "not-available";
      } else if (type === "approve-draft-contract-draft-section-32") {
        return property.isDraftContractApprovedCompleted
          ? "success"
          : this.isApproveDraftSectionStatus(property)
          ? "primary"
          : "not-available";
      } else if (type === SIGNEDSECTION32.code) {
        return property.isSignedSection32
          ? "success"
          : this.isResponsibleCustomer() &&
            property.isDraftContractApprovedCompleted
          ? "primary"
          : "not-available";
      } else if (type === FINALCONTRACT.code) {
        return property.isFinalContract
          ? "success"
          : this.isResponsibleConveyancer()
          ? "primary"
          : "not-available";
      } else if (type === SIGNEDCONTRACT.code) {
        return property.isSignedContract
          ? "success"
          : this.isResponsibleCustomerSignedAndContract()
          ? "primary"
          : "not-available";
      } else if (type === "move-to-next-stage") {
        return this.isPropertyForNextStage(property)
          ? "primary"
          : "not-available";
      } else if (type === "conveyancer-assigned") {
        return property.conveyancerId ? "success" : "primary";
      } else if (type === "deposit-release-notification") {
        return property.isDepositReleaseNotification ? "success" : "primary";
      } else if (type === S27DRS.code) {
        return property.isS27DRS
          ? "success"
          : this.isResponsibleConveyancer()
          ? "primary"
          : "not-available";
      } else if (type === SIGNEDSECTION27.code) {
        return property.isSignedSection27
          ? "success"
          : this.isResponsibleCustomer()
          ? "primary"
          : "not-available";
      } else if (type === STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT.code) {
        return property.isSOASS
          ? "success"
          : this.isDocumentDeclined(property, type)
          ? "danger"
          : this.isDocumentApprovalStatus(property, type)
          ? "primary"
          : "not-available";
      } else if (type === SETTLEMENTCOSTS.code) {
        return property.isSettlementCosts
          ? "success"
          : this.isDocumentDeclined(property, type)
          ? "danger"
          : this.isDocumentApprovalStatus(property, type)
          ? "primary"
          : "not-available";
      } else if (type === TAXINVOICE.code) {
        return property.isTaxInvoice
          ? "success"
          : this.isResponsibleConveyancer()
          ? "primary"
          : "not-available";
      } else if (type === ACCOUNTSALES.code) {
        return property.isAccountSales
          ? "success"
          : this.isResponsibleConveyancer()
          ? "primary"
          : "not-available";
      } else if (type === "send-customer-alert") {
        return property.isPreSettlementReminderSeller ||
          property.isPreSettlementReminderBuyer
          ? "success"
          : "primary";
      } else if (type === "settlement-date-time") {
        return property.isSettlementDateTimeSet ? "success" : "primary";
      } else if (type === "final-inspection-reminder-agent") {
        return property.isFinalInspectionAgentNotif ? "success" : "primary";
      } else if (type === "notification-sro-email") {
        return property.isFinalInspectionSellerNotif ||
          property.isSendSROEmailBuyerNotif
          ? "success"
          : "primary";
      } else if (type === "settlement-reminder-agent") {
        return property.isSettlementReminderNotif ? "success" : "primary";
      } else if (type === "final-inspection-reminder-buyer") {
        return property.isFinalInspectionBuyerNotif ? "success" : "primary";
      } else if (type === "send-tax-invoice-buyer") {
        return property.isSendTaxInvoiceBuyer
          ? "success"
          : property.isTaxInvoice
          ? "primary"
          : "not-available";
      } else if (type === "send-tax-invoice-seller") {
        return property.isSendTaxInvoiceSeller
          ? "success"
          : property.isTaxInvoice
          ? "primary"
          : "not-available";
      } else if (type === CONTRACT.code) {
        return property.isContractUpload
          ? "success"
          : this.isResponsibleCustomerSignedAndContract()
          ? "primary"
          : "not-available";
      } else if (type === REVIEWOFCONTRACT.code) {
        return property.isContractReview
          ? "success"
          : this.isDocumentDeclined(property, type)
          ? "danger"
          : this.isDocumentApprovalStatus(property, type)
          ? "primary"
          : "not-available";
      } else if (type === "initial-documents-reminder") {
        return property.isInitialDocumentReminder ? "success" : "primary";
      } else if (type === "review-completed-documents") {
        return property.isReviewCompletedDocs
          ? "success"
          : property.isInitialDocument
          ? "primary"
          : "not-available";
      } else if (type === "registered-plan") {
        return property.isPlanRegistered ? "success" : "primary";
      } else if (type === REGISTEREDPLAN.code) {
        return property.isRegisteredPlan
          ? "success"
          : this.isResponsibleConveyancer()
          ? "primary"
          : "not-available";
      } else if (type === CERTIFICATEOFOCCUPANCY.code) {
        return property.isCertificateOccupancy
          ? "success"
          : this.isResponsibleConveyancer()
          ? "primary"
          : "not-available";
      }
    },
    getTransactionType(type) {
      let value = "";
      if (type === BUYING.code) {
        value = BUYING.value;
      } else if (type === BOFFTHEPLAN.code) {
        value = BOFFTHEPLAN.value;
      } else if (type === SELLING.code) {
        value = SELLING.value;
      }
      return value;
    },
    getTransactionStage(stage) {
      let value = "";
      if (stage === CONSTANTS.TRANS_STATUS.PRECONTRACT) {
        value = "Pre-contract";
      } else if (stage === CONSTANTS.TRANS_STATUS.POSTCONTRACT) {
        value = "Post-contract";
      } else if (stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT) {
        value = "Pre-settlement";
      } else {
        value = "Post-settlement";
      }
      return value;
    },
    generateResponsibleViaRole(value) {
      if (this.getUserRole() === CONSTANTS.USER_ROLE.CUSTOMER) {
        if (value === "Buyer" || value === "Seller") return "You";
        else return value;
      } else if (this.getUserRole() === CONSTANTS.USER_ROLE.CONVEYANCER) {
        if (value === "Conveyancer") return "You";
        else return value;
      } else if (this.getUserRole() === CONSTANTS.USER_ROLE.ADMIN) {
        if (value === "Settle Easy Admin") return "You";
        else return value;
      } else {
        return value;
      }
    },
    setResponsible(value) {
      return this.generateResponsibleViaRole(value);
    },
    getStageText(stage) {
      if (stage === CONSTANTS.TRANS_STATUS.PRECONTRACT) return "post-contract";
      else if (stage === CONSTANTS.TRANS_STATUS.POSTCONTRACT)
        return "pre-settlement";
      else if (stage === CONSTANTS.TRANS_STATUS.PRESETTLEMENT)
        return "post-settlement";
    },
    getSignatureCount() {
      /* FOR FETCHING AND INITIALIZING WEBFORM DATA */
      const property = this.propertyStepsObject;
      const header = {
        headers: this.getHeaderObject({
          listingId: property.propertyId || property.listingId
        })
      };
      const forDownload = document => {
        const { type, form_status } = document;
        const validator = WEBFORM_VALIDATION[type][form_status];
        return validator.allowedRoles.includes("*");
      };
      webformsService
        .getSignatureCount(header)
        .then(resp => {
          let response = resp.data;
          if (response.length > 0) {
            response.forEach(document => {
              const { signaturedCount, type } = document;
              if (type === WEBFORM_CODE.scaf) {
                if (signaturedCount > 0) this.webformData.push(document);
              }
              this.getTransactionData(this.propertyStepsObject.listingId);
              this.webformArray.push(document);
              if (forDownload(document)) {
                // check if document is already existing
                if (
                  !this.propertyStepsObject.documents.find(
                    docs => docs === WEBFORM_CODES[document.type]
                  )
                ) {
                  this.propertyStepsObject.documents.push(
                    WEBFORM_CODES[document.type]
                  );
                  this.propertyDataWebForms = this.propertyStepsObject;
                }
              }
            });
          }
        })
        .catch(err => {
          console.error("getSignatureCount err ::: ", err);
        });
    },
    formStatus(doctype) {
      const doctypeArray = this.webformArray.filter(
        e => e.type === WEBFORM_CODE[doctype]
      );
      const statusArray = WEBFORM_STATUS_MAPPING[doctype];
      const userRole = this.getUserRole();
      const returnStatus = list => {
        if (list.completed.includes("*") || list.completed.includes(userRole)) {
          return "completed";
        } else if (
          list.pending.includes("*") ||
          list.pending.includes(userRole)
        ) {
          return "pending";
        } else {
          return "not-available";
        }
      };
      if (doctypeArray.length > 0) {
        const status = doctypeArray[0].form_status;
        const statusList = statusArray[status];
        return returnStatus(statusList);
      } else {
        const statusList = statusArray["default"];
        return returnStatus(statusList);
      }
    },
    checkTooltipAvailability(document) {
      const {
        documentForApproval,
        documentStatusArray,
        documents
      } = this.propertyStepsObject;
      const docs = CONSTANTS.TRANSACTION_DOCUMENTS;
      const docsForApproval = [
        docs.ENGAGEMENTLETTER.code,
        docs.REVIEWOFCONTRACT.code,
        docs.STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT.code,
        docs.STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT.code,
        docs.DRAFTCONTRACT.code,
        docs.SETTLEMENTCOSTS.code,
        docs.SECTION32.code,
        docs.COSTSDISCLOSURE.code,
        docs.SIGNEDAUTHORISATIONFORM.code
      ];
      if (this.getUserRole() !== CONSTANTS.USER_ROLE.CHIEFPRACTICEMANAGER) {
        if (docsForApproval.includes(document)) {
          if (documents.includes(document)) {
            if (documentForApproval.includes(document)) {
              const documentIndex = documentForApproval.indexOf(document);
              return (
                documentStatusArray[documentIndex] !==
                CONSTANTS.DOCUMENT_STATUSES.APPROVED.code
              );
            }
          } else {
            return true;
          }
        }
      }
      return false;
    }
  }
};
