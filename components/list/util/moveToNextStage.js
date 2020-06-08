// import transactionService from "../services/convx_api/transaction";
// import fetchPropertyData from "../util/fetchPropertyData.js";
import CONSTANTS from "../static/constants";

export default {
  // mixins: [fetchPropertyData],
  methods: {
    submitStage(property) {
    //   const { listingId, transactionType, status } = property;
    //   var headers = {
    //     headers: this.getHeaderObject()
    //   };
    //   let param = {
    //     listingId,
    //     stage: null,
    //     step: null,
    //     multipleStep: [],
    //     transactionType
    //   };
    //   if (status === CONSTANTS.TRANS_STATUS.PRECONTRACT) {
    //     param.stage = CONSTANTS.TRANS_STATUS.POSTCONTRACT;
    //   }
    //   if (status === CONSTANTS.TRANS_STATUS.POSTCONTRACT) {
    //     param.stage = CONSTANTS.TRANS_STATUS.PRESETTLEMENT;
    //   }
    //   if (status === CONSTANTS.TRANS_STATUS.PRESETTLEMENT) {
    //     param.stage = CONSTANTS.TRANS_STATUS.POSTSETTLEMENT;
    //   }
    //   this.showLoadingModal = true;
    //   transactionService
    //     .updatePropertyListingConveyancingSteps(param, headers)
    //     .then(resp => {
    //       window.jQuery(`#confirmationModal`).modal("hide");
    //       if (status === CONSTANTS.TRANS_STATUS.PRECONTRACT) {
    //         this.$toasted.global.moveToPost();
    //         this.$router.push("/properties");
    //       } else if (status === CONSTANTS.TRANS_STATUS.POSTCONTRACT) {
    //         this.$toasted.global.moveToPreSettlement();
    //         this.$router.push("/properties");
    //       } else if (status === CONSTANTS.TRANS_STATUS.PRESETTLEMENT) {
    //         this.$toasted.global.moveToPostSettlement();
    //         this.$router.push("/properties");
    //       }
    //       this.showLoadingModal = false;
    //     })
    //     .catch(err => {
    //       this.showLoadingModal = false;
    //       console.error(err);
    //     });
    // }
  }
};
