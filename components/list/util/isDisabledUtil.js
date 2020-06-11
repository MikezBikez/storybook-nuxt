import CONSTANTS from "../static/constants";

export default {
  methods: {
    isDisabled(property, documentType) {
      let isDisabled = false;
      if (documentType === "ss32") {
        if (
          !property.isDraftContractApprovedCompleted ||
          !(
            this.isUserCustomer ||
            this.isUserAdmin ||
            this.isUserChiefPracticeManager
          )
        ) {
          isDisabled = true;
        }
      } else if (documentType === "approve-draft-contract-draft-section-32") {
        if (
          property.isDraftContractApprovedCompleted ||
          !(property.isDraftContract && property.isSection32) ||
          !(
            this.isUserCustomer ||
            this.isUserAdmin ||
            this.isUserChiefPracticeManager
          )
        ) {
          isDisabled = true;
        }
      }
      return isDisabled;
    },
    isDisabledClass(property, documentType) {
      return this.isDisabled(property, documentType)
        ? "disabled"
        : "btn-se-primary";
    },
    isUserCustomer() {
      return this.getUserRole() === CONSTANTS.USER_ROLE.CUSTOMER;
    },
    isUserAdmin() {
      return this.getUserRole() === CONSTANTS.USER_ROLE.ADMIN;
    },
    isUserChiefPracticeManager() {
      return this.getUserRole() === CONSTANTS.USER_ROLE.CHIEFPRACTICEMANAGER;
    }
  }
};
