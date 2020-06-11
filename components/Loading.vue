<template lang='pug'>
    #convx-preloader-modal.modal.fade(style="display: none;", aria-hidden="true", tabindex="-1", role="dialog", aria-labelledby="convx-preloader-modalLabel", data-backdrop="static", data-keyboard="false")
      .modal-dialog(role='document')
        .modal-content
          .modal-body
            .container.d-flex.h-100
              .row.justify-content-center.align-self-center.w-100.m-0
                .bouncing-loader
                  .d-block
                  .d-block
                  .d-block
                label(style="color: gray; font-size:50px; font-weight: bold; text-align: center;, width: 500px;") {{loadingMessage}}
    //- preloader modal   
</template>


<script>
  export default {
    props: {
      loadingMessage: {
        type: String,
        required: false
      }
    },
    methods: {
      modalShow () {
        let x = document.getElementById('convx-preloader-modal')
        x.setAttribute('style', 'display: block')
        x.setAttribute('aria-hidden', 'false')
        x.classList.toggle('show')
      },
      modalHide () {
        let x = document.getElementById('convx-preloader-modal')
        x.setAttribute('style', 'display: none')
        x.setAttribute('aria-hidden', 'true')
        x.classList.toggle('show')
      }
    },
    mounted: function () {
      this.modalShow()
    }
  }
</script>

<style lang='scss'>
#convx-preloader-modal {
  .modal {
    background: rgba(0, 0, 0, .1);
  }  
  .modal-dialog {
    transform: translate(0,-50%);
    top: 50%;
    margin: 0 auto;
    max-width: 155px;

    .modal-content {
      background-color: transparent !important;
      border:0;
      .modal-body {
        background-color: transparent !important;
      }
    }      
  }
} 

.bouncing-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

  > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #4794fc;
    border-radius: 50%;
    box-shadow: 0px 0px 5px #403f3f;
    animation: bouncing-loader 0.6s infinite alternate;
  }
  > div:nth-child(2) {
    animation-delay: 0.2s;
  }
  > div:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bouncing-loader {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0.1;
      transform: translateY(-1rem);
    }
  }

} //- bouncing-loader

</style>