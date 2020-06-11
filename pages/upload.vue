<template lang="pug">
  section.container
    .text-center
      h1.title
        | Upload page
      h2.subtitle
        | Showing upload component
    .flex.justify-between.w-full
      UploadDownloadDocumentComponent(:documentType='Section32', :propertyObject='propertyStepsObject')
      button.btn.btn-se-primary( @click="downloadDocument(propertyStepsObject, item.filter)")
        i.fas.fa-download
        | Download PDF2
</template>

<script>
import UploadDownloadDocumentComponent from "~/components/UploadDownloadDocument";

const propertyStepsObject = {};
export default {
  components: {
    UploadDownloadDocumentComponent
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 3em;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 1.5em;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
