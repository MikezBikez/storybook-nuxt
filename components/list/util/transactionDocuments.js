'use strict'

const _ = require('lodash')

const CONTRACT = {
  code: 'contract',
  value: 'Contract'
}

const REVIEWOFCONTRACT = {
  code: 'roc',
  value: 'Review of contract'
}

const DRAFTCONTRACT = {
  code: 'dfc',
  value: 'Draft contract'
}

const SECTION32 = {
  code: 's32',
  value: 'Draft section 32'
}

const SIGNEDSECTION32 = {
  code: 'ss32',
  value: 'Signed section 32'
}

const ENGAGEMENTLETTER = {
  code: 'egl',
  value: 'Engagement letter'
}

const COSTSDISCLOSURE = {
  code: 'cdc',
  value: 'Costs disclosure'
}

const FINALCONTRACT = {
  code: 'fnc',
  value: 'Final contract'
}

const SIGNEDCONTRACT = {
  code: 'sct',
  value: 'Signed contract'
}

const SIGNEDAUTHORISATIONFORM = {
  code: 'scaf',
  value: `Signed client's authorisation form`
}

const SELLERSQUESTIONNAIRE = {
  code: 'fosq',
  value: `Filled out seller's questionnaire`
}

const BUYERSQUESTIONNAIRE = {
  code: 'fobq',
  value: `Filled out buyer's questionnaire`
}

const S27DRS = {
  code: 's27',
  value: `S27 deposit release statement`
}

const SIGNEDSECTION27 = {
  code: 'ss27',
  value: `Signed section 27`
}

const STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT = {
  code: 'soass',
  value: `Statement of adjustments & settlement statement`
}

const SETTLEMENTCOSTS = {
  code: 'stc',
  value: `Settlement costs`
}

const TAXINVOICE = {
  code: 'tiv',
  value: `Tax invoice`
}

const ACCOUNTSALES = {
  code: 'acs',
  value: `Account sales`
}

const REGISTEREDPLAN = {
  code: 'rpl',
  value: `Registered plan`
}

const CERTIFICATEOFOCCUPANCY = {
  code: 'coo',
  value: `Certificate of occupancy`
}

const transactionDocuments = [
  CONTRACT,
  REVIEWOFCONTRACT,
  DRAFTCONTRACT,
  ENGAGEMENTLETTER,
  COSTSDISCLOSURE,
  FINALCONTRACT,
  SELLERSQUESTIONNAIRE,
  SIGNEDCONTRACT,
  SIGNEDAUTHORISATIONFORM,
  BUYERSQUESTIONNAIRE,
  S27DRS,
  STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT,
  SETTLEMENTCOSTS,
  TAXINVOICE,
  ACCOUNTSALES,
  SIGNEDSECTION32,
  SECTION32,
  SIGNEDSECTION27,
  REGISTEREDPLAN,
  CERTIFICATEOFOCCUPANCY
]

function getValue (code) {
  var valueResp = null
  _.each(transactionDocuments, function (transactionDocument) {
    if (code === transactionDocument.code) {
      valueResp = transactionDocument.value
      return false // lodash break equivalent
    }
  })
  return valueResp
}

module.exports = {
  getValue,
  CONTRACT,
  REVIEWOFCONTRACT,
  DRAFTCONTRACT,
  ENGAGEMENTLETTER,
  COSTSDISCLOSURE,
  FINALCONTRACT,
  SIGNEDAUTHORISATIONFORM,
  SELLERSQUESTIONNAIRE,
  SIGNEDCONTRACT,
  BUYERSQUESTIONNAIRE,
  S27DRS,
  STATEMENTOFADJUSTMENTSANDSETTLEMENTSTATEMENT,
  SETTLEMENTCOSTS,
  TAXINVOICE,
  ACCOUNTSALES,
  SIGNEDSECTION32,
  SECTION32,
  SIGNEDSECTION27,
  REGISTEREDPLAN,
  CERTIFICATEOFOCCUPANCY
}
