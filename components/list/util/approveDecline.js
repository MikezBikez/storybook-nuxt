export default {
  mixins: [fetchPropertyData],
  methods: {
    approveDocument(code, listingId) {},
    declineDocument(code, listingId) {},
    updateDocumentStatus(listingId, documentStatusType, currentDocumentType) {}
  }
};
