<template lang="pug">
  .page-wrapper
    .card
      .card-body
        .next-step-section
          .property-description
            h1 {{getTransactionType(propertyStepsObject.transactionType)}} - {{propertyStepsObject.address}}
            h2 {{getTransactionStage(propertyStepsObject.status)}} - Next steps
          table.table
            thead.mobile-hide
              tr
                th STEPS
                th RESPONSIBLE
                th ACTIONS
                th STATUS
            tbody(v-if="isPropertyOnPreContractStageBuying")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                  // temporary commenting out due to feedback
                  //- b-form-input.document-name(v-if="item.filter === 'otr'" v-model="documentName" type="text" placeholder="Enter file name here" autocomplete='off')
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key(v-if="item.filter === 'contract'")
                      UploadDownloadDocumentComponent(v-if="(isUserCustomer || isUserOfficeManager || isUserDirector || isUserRealEstateAgent || isUserAdmin || isUserChiefPracticeManager)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'conveyancer-assigned'")
                      AssignReassignConveyancerComponent(:propertyObject='propertyStepsObject')
                    .key(v-else-if="item.filter === 'roc'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'sct'")
                      UploadDownloadDocumentComponent(v-if="(isUserCustomer || isUserOfficeManager || isUserDirector || isUserRealEstateAgent || isUserAdmin || isUserChiefPracticeManager)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                          
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                        
                    // temporary commenting out due to feedback
                    //- .key(v-else-if="item.filter === 'otr'")
                    //-   UploadDownloadDocumentComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :documentName='documentName')
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPreContractStageSelling")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key(v-if="item.filter === 'conveyancer-assigned'")
                      AssignReassignConveyancerComponent(:propertyObject='propertyStepsObject')
                    .key(v-if="item.filter === 'egl'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'cdc'")
                      RedirectToWebformComponent(:userRole='getUserRole()', :documentType='item.filter', :propertyObject='propertyDataWebForms', :webformData='webformData', :webformArray='webformArray')
                    .key(v-else-if="item.filter === 'scaf'")
                      RedirectToWebformComponent(:userRole='getUserRole()', :documentType='item.filter', :propertyObject='propertyDataWebForms', :webformData='webformData', :webformArray='webformArray')
                    .key(v-else-if="item.filter === 'fosq'")
                      RedirectToWebformComponent(:userRole='getUserRole()', :documentType='item.filter', :propertyObject='propertyDataWebForms', :webformData='webformData', :webformArray='webformArray')
                    .key(v-else-if="item.filter === 'dfc'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 's32'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'approve-draft-contract-draft-section-32'")
                      button.btn(v-if="!propertyStepsObject.isDraftContractApprovedCompleted" :class='[isDisabledClass(propertyStepsObject, item.filter)]' :disabled="isDisabled(propertyStepsObject, item.filter)" @click="openApproveDraftAndSection32Modal(propertyStepsObject, item.filter)")
                        i.fas.fa-check-circle
                        | Approve
                      .status-label.success(v-else)
                        i.fas.fa-check-circle
                        | Approved
                    .key(v-else-if="item.filter === 'ss32'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserCustomer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                      
                    .key(v-else-if="item.filter === 'fnc'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'sct'")
                      UploadDownloadDocumentComponent(v-if="(isUserCustomer || isUserOfficeManager || isUserDirector || isUserRealEstateAgent || isUserAdmin || isUserChiefPracticeManager)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                                                            
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPreContractStageBOffThePlan && propertyStepsObject.currentStep === 'SC'")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                td(v-if="item.class != 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class != 'group-title'") 
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key(v-if="item.filter === 'sct'")
                      UploadDownloadDocumentComponent(v-if="(isUserCustomer || isUserOfficeManager || isUserDirector || isUserRealEstateAgent || isUserAdmin || isUserChiefPracticeManager)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'conveyancer-assigned'")
                      AssignReassignConveyancerComponent(:propertyObject='propertyStepsObject') 
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                                
                td(v-if="item.class != 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPreContractStageBOffThePlan && propertyStepsObject.currentStep === 'CR'")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'") 
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key(v-if="item.filter === 'contract'")
                      UploadDownloadDocumentComponent(v-if="(isUserCustomer || isUserOfficeManager || isUserDirector || isUserRealEstateAgent || isUserAdmin || isUserChiefPracticeManager)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'conveyancer-assigned'")
                      AssignReassignConveyancerComponent(:propertyObject='propertyStepsObject')
                    .key(v-else-if="item.filter === 'roc'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'sct'")
                      UploadDownloadDocumentComponent(v-if="(isUserCustomer || isUserOfficeManager || isUserDirector || isUserRealEstateAgent || isUserAdmin || isUserChiefPracticeManager)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                           
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPostContractStageBuying")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key(v-if="item.filter === 'egl'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF       
                    .key(v-else-if="item.filter === 'cdc'")
                      RedirectToWebformComponent(:userRole='getUserRole()', :documentType='item.filter', :propertyObject='propertyDataWebForms', :webformData='webformData', :webformArray='webformArray')
                    .key(v-else-if="item.filter === 'scaf'")
                      RedirectToWebformComponent(:userRole='getUserRole()', :documentType='item.filter', :propertyObject='propertyDataWebForms', :webformData='webformData', :webformArray='webformArray')              
                    .key(v-else-if="item.filter === 'fobq'")
                      RedirectToWebformComponent(:userRole='getUserRole()', :documentType='item.filter', :propertyObject='propertyDataWebForms', :webformData='webformData', :webformArray='webformArray')
                    .key(v-else-if="item.filter === 'initial-documents-reminder'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')
                    .key(v-else-if="item.filter === 'review-completed-documents'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                        
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPostContractStageSelling")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:           
                    .key(v-if="item.filter === 'deposit-release-notification'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 's27'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                                          
                    .key(v-else-if="item.filter === 'ss27'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserCustomer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                                          
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                        
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPostContractStageBOffThePlan")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key(v-if="item.filter === 'egl'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF            
                    .key(v-else-if="item.filter === 'scaf'")
                      RedirectToWebformComponent(:userRole='getUserRole()', :documentType='item.filter', :propertyObject='propertyDataWebForms', :webformData='webformData', :webformArray='webformArray')                      
                    .key(v-else-if="item.filter === 'cdc'")
                      RedirectToWebformComponent(:userRole='getUserRole()', :documentType='item.filter', :propertyObject='propertyDataWebForms', :webformData='webformData', :webformArray='webformArray')                      
                    .key(v-else-if="item.filter === 'initial-documents-reminder'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'review-completed-documents'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'registered-plan'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openRegisteredPlanModal")
                        i.far.fa-calendar-alt
                        | {{(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) ? 'Set' : 'View'}} date
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                        
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPreSettlementBuying")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                  TotalCost(v-if="item.filter === 'send-tax-invoice-buyer'" :propertyObject="propertyStepsObject", :totalCostError="totalCostError")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key(v-if="item.filter === 'send-customer-alert'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')    
                    .key(v-else-if="item.filter === 'settlement-date-time'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="triggerSetSettlementDateTime")
                        i.far.fa-calendar-alt
                        | {{(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) ? 'Set' : 'View'}} date and time               
                    .key(v-else-if="item.filter === 'soass'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                      
                    .key(v-else-if="item.filter === 'stc'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                       
                    .key(v-else-if="item.filter === 'tiv'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                    
                    .key(v-else-if="item.filter === 'final-inspection-reminder-agent'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'notification-sro-email'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'settlement-reminder-agent'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'final-inspection-reminder-buyer'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'send-tax-invoice-buyer'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')              
                    .key(v-else-if="item.filter === 'payment-completed'")
                      .status-label.success(v-if='propertyStepsObject.isPaymentCompleted')
                        i.fas.fa-check-circle
                        | PAID
                      .status-label.primary(v-else)
                        i.far.fa-credit-card
                        | Mark as paid
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                        
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPreSettlementSelling")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                  TotalCost(v-if="item.filter === 'send-tax-invoice-seller'" :propertyObject="propertyStepsObject", :totalCostError="totalCostError")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key(v-if="item.filter === 'send-customer-alert'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'soass'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                       
                    .key(v-else-if="item.filter === 'stc'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                       
                    .key(v-else-if="item.filter === 'acs'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                    
                    .key(v-else-if="item.filter === 'tiv'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF              
                    .key(v-else-if="item.filter === 'notification-sro-email'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'settlement-date-time'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="triggerSetSettlementDateTime")
                        i.far.fa-calendar-alt
                        | {{(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) ? 'Set' : 'View'}} date and time                                    
                    .key(v-else-if="item.filter === 'send-tax-invoice-seller'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'payment-completed'")
                      .status-label.success(v-if='propertyStepsObject.isPaymentCompleted')
                        i.fas.fa-check-circle
                        | PAID
                      .status-label.primary(v-else)
                        i.far.fa-credit-card
                        | Mark as paid            
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                   
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPreSettlementBOffThePlan")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                  TotalCost(v-if="item.filter === 'send-tax-invoice-buyer'" :propertyObject="propertyStepsObject", :totalCostError="totalCostError")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key(v-if="item.filter === 'send-customer-alert'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')    
                    .key(v-else-if="item.filter === 'fobq'")
                      RedirectToWebformComponent(:userRole='getUserRole()', :documentType='item.filter', :propertyObject='propertyDataWebForms', :webformData='webformData', :webformArray='webformArray')                    
                    .key(v-else-if="item.filter === 'settlement-date-time'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="triggerSetSettlementDateTime")
                        i.far.fa-calendar-alt
                        | {{(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) ? 'Set' : 'View'}} date and time           
                    .key(v-else-if="item.filter === 'rpl'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                    
                    .key(v-else-if="item.filter === 'coo'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                                           
                    .key(v-else-if="item.filter === 'soass'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                       
                    .key(v-else-if="item.filter === 'stc'")
                      UploadDownloadDocumentComponent(v-if="((isUserAdmin || isUserChiefPracticeManager || isUserConveyancer) && (!hasDownloadDocument(propertyStepsObject, item.filter) || isDocumentDeclined(propertyStepsObject, item.filter)) || ((isUserAdmin || isUserConveyancer) && !isActionAvailable(propertyStepsObject, item.filter)))" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      ApproveDeclineDocumentComponent(v-else-if="isUserChiefPracticeManager && !isActionAvailable(propertyStepsObject, item.filter)" :documentType='item.filter', :propertyObject='propertyStepsObject' @modalDataObject='openApproveDeclineModal')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                                        
                    .key(v-else-if="item.filter === 'tiv'")
                      UploadDownloadDocumentComponent(v-if="(isUserAdmin || isUserChiefPracticeManager || isUserConveyancer)" :documentType='item.filter', :propertyObject='propertyStepsObject')
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" v-else @click="downloadDocument(propertyStepsObject, item.filter)")
                        i.fas.fa-download
                        | Download PDF                              
                    .key(v-else-if="item.filter === 'final-inspection-reminder-agent'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'notification-sro-email'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'settlement-reminder-agent'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'final-inspection-reminder-buyer'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'send-tax-invoice-buyer'")
                      SendNotificationComponent(:documentType='item.filter', :propertyObject='propertyStepsObject', :notificationCode='item.notificationCode', @notificationModalObject='openSendNotificationModal')                  
                    .key(v-else-if="item.filter === 'payment-completed'")
                      .status-label.success(v-if='propertyStepsObject.isPaymentCompleted')
                        i.fas.fa-check-circle
                        | PAID
                      .status-label.primary(v-else)
                        i.far.fa-credit-card
                        | Mark as paid                 
                    .key(v-else-if="item.filter === 'move-to-next-stage'")
                      button.btn.btn-se-primary(:disabled="!isActionAvailable(propertyStepsObject, item.filter)" @click="openNextStageModal(propertyStepsObject)")
                        i.fas.fa-angle-double-right
                        | Move to {{getStageText(propertyStepsObject.status)}}                        
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label(:class="[statusClass(propertyStepsObject, item.filter)]") {{getStatus(propertyStepsObject, item.filter)}}
            tbody(v-else-if="isPropertyOnPostSettlementBuying")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label.success COMPLETED
            tbody(v-else-if="isPropertyOnPostSettlementSelling")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label.success COMPLETED
            tbody(v-else-if="isPropertyOnPostSettlementBOffThePlan")
              tr(v-for="(item, _, i) in nextStepsJSON" :key="i" :class="item.class")
                td(:class="item.subClass") {{item.title}}
                  i.fas.fa-question-circle.fa-lg.tooltip-help-icon.p-1(title="This document will be available for download once reviewed and approved by Chief Practice Manager." v-b-tooltip.hover.topright v-if="checkTooltipAvailability(item.filter)")
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Responsible:
                    .key {{setResponsible(item.responsible)}}
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Actions:
                    .key
                td(v-if="item.class !== 'group-title'")
                  .mobile-flex
                    .key.mobile-only Status
                    .key.status-label.success COMPLETED
    GenericConfirmationModal(modalName='confirmationModal', :header='modalHeader',
      :body='modalData', dismissModalName='No', :confirmationModalName='modalConfirmationModalName'
      v-on:onConfirm='onClickModal' :propertyAddress="nextStageAddress")
    SettlementDateTime(:property="propertyStepsObject")
    RegisteredPlanComponent(:property="propertyStepsObject")
    loading-component(v-if='showLoadingModal', ref='loadingComponent', :loadingMessage="loadingMessage")
</template>
<script src="./next-step.js"></script>
<style lang="scss" scoped>
// override
.page-wrapper {
  padding-top: 1.5em;
}
td,
th,
p {
  color: #333;
}
h1 {
  color: #333;
  font-size: 24px;
  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
}
h2 {
  font-size: 20px;
  color: #4e545b;
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
}
.mobile-hide {
  @media screen and (max-width: 767px) {
    display: none;
  }
}
.mobile-only {
  @media screen and (min-width: 768px) {
    display: none;
  }
}
.mobile-flex {
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
  }
}
.all-bold {
  font-family: "SE_Gotham-Rounded-Medium", sans-serif !important;
}
.mobile-bold {
  @media screen and (max-width: 768px) {
    font-family: "SE_Gotham-Rounded-Medium", sans-serif !important;
  }
}
.key {
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    width: 100%;
  }
}
.property-description {
  margin-bottom: 1rem;
  h1,
  h2 {
    font-family: "SE_Gotham-Rounded-Medium", sans-serif !important;
    margin: 0;
  }
}
.table {
  tr ~ tr {
    @media screen and (max-width: 767px) {
      border-top: 2px solid #d6d6d6;
    }
  }
  tr.group-title + tr {
    @media screen and (max-width: 767px) {
      border-top: 0;
    }
  }
  th {
    width: 40%;
    font-family: "SE_Gotham-Rounded-Medium", sans-serif !important;
    border-top: none;
    color: #6c757d;
    & ~ th {
      width: 20%;
    }
  }
  tr {
    td {
      vertical-align: unset;
      border-top: none;
      @media screen and (max-width: 767px) {
        display: flex;
      }
      .tooltip-help-icon {
        cursor: pointer;
        color: #d1d1d1;
        margin: 0 0.25rem;
      }
    }
    &.group-title {
    }
    &.tabbed {
      td {
        @media screen and (max-width: 767px) {
          padding-left: 1.5rem;
          font-size: 13px;
        }
        &:first-child {
          padding-left: 2rem;
          @media screen and (max-width: 767px) {
            padding-left: 1.5rem;
          }
        }
      }
    }
    &.tabbed-title {
      td {
        @media screen and (max-width: 767px) {
          font-size: 13px;
        }
      }
    }
    &.group-title {
      td {
        padding: 1rem 0.75rem 0;
        font-family: "SE_Gotham-Rounded-Medium", sans-serif;
        @media screen and (max-width: 767px) {
          font-size: 14px;
        }
      }
    }
  }
}
.btn {
  max-width: 200px;
  text-align: left;
  padding: 0.575rem 0.75rem 0.5rem;
}
.dropdown-item,
.status-label,
.btn {
  position: relative;
  width: 100%;
  font-size: 13px;
  font-family: "SE_Gotham-Rounded-Medium", sans-serif !important;
  i {
    padding-right: 0.5rem;
  }
  &.danger {
    color: #ea4435;
  }
  &.primary {
    color: #4794fc;
  }
  &.success {
    color: #31a750;
  }
  &.not-available {
    color: #aeafb0;
  }
  &.info {
    color: #aeafb0;
  }
  &:disabled {
    color: #d6d6d6 !important;
    background-color: #f3f3f3 !important;
    cursor: not-allowed !important;
  }
  &.disabled {
    color: #d6d6d6;
    background-color: #f3f3f3;
    cursor: not-allowed !important;
  }
  &.btn-se-primary {
    color: #4794fc;
    background-color: #edf4ff;
    &:hover {
      color: #fff;
      background-color: #4794fc;
    }
  }
  &.dropdown-toggle::after {
    position: absolute;
    right: 16px;
    top: 15px;
    font-size: 20px;
    margin-left: 0.855em;
    vertical-align: 0.1em;
  }
}
</style>

<style lang="scss">
.tooltip-inner {
  font-family: "SE_Gotham-Light", sans-serif;
  color: black;
  font-size: 12px;
  background-color: #dddddd;
  text-align: left;
  padding: 1rem;
}
.arrow::before {
  border-top-color: #dddddd !important;
  border-bottom-color: #dddddd !important;
}
.next-step-section {
  .btn {
    @media screen and (max-width: 767px) {
      display: flex;
      justify-content: left;
    }
  }
}
</style>
