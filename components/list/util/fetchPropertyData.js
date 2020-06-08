// import transactionService from "../services/convx_api/transaction";

export default {
  methods: {
    getTransactionData(listingId) {
      // const headers = {
      //   headers: this.getHeaderObject()
      // };
      // const paramBody = {
      //   organisationId: this.getOrganisationId(),
      //   userId: this.getUserId(),
      //   roleId: this.getUserRole(),
      //   sort: "desc",
      //   sortMethod: "id",
      //   listingId
      // };
      // this.showLoadingModal = true;
      // transactionService
      //   .getTransactionList(paramBody, headers)
      //   .then(resp => {
      //     this.$store.dispatch(
      //       "setPropertyDetails",
      //       resp.data.transactions.transactions[0]
      //     );
      //     this.showLoadingModal = false;
      //   })
      //   .catch(err => {
      //     console.error(err);
      //     this.showLoadingModal = false;
      //   });
    }
  }
};
