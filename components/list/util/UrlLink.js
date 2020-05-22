
'use strict'

const _ = require('lodash')

const ADMIN = {
  code: 'ADM',
  link: '/admin-dashboard',
  value: 'Admin'
}

const CUSTOMER = {
  code: 'CUS',
  link: '/customer-dashboard',
  value: 'Customer'
}

const CONVEYANCER = {
  code: 'CON',
  link: '/conveyancer-dashboard',
  value: 'Conveyancer'
}

const REALSTATEAGENT = {
  code: 'REA',
  link: '/agent-dashboard',
  value: 'Real Estate Agent'
}

const CHANNELPARTNER = {
  code: 'CNP',
  link: '/channel-partner-dashboard',
  value: 'Channel Partner'
}

const SUPPORTOFFICER = {
  code: 'SO',
  link: '/support-officer-dashboard',
  value: 'Support Officer'
}
const PARTNERADMIN = {
  code: 'OA',
  link: '/partner-dashboard',
  value: 'Partner Admin'
}
const OFFICEMANAGER = {
  code: 'BA',
  link: '/office-manager-dashboard',
  value: 'Sales admins'
}
const DIRECTOR = {
  code: 'DIR',
  link: '/director-dashboard',
  value: 'Directors'
}
const CHIEFPRACTICEMANAGER = {
  code: 'CPM',
  link: '/cpm-dashboard',
  value: 'Chief Practice Manager'
}

const urlLinks = [
  ADMIN,
  CUSTOMER,
  SUPPORTOFFICER,
  CHANNELPARTNER,
  REALSTATEAGENT,
  CONVEYANCER,
  PARTNERADMIN,
  OFFICEMANAGER,
  DIRECTOR,
  CHIEFPRACTICEMANAGER
]

function getCode (value) {
  var codeResp = null
  _.each(urlLinks, function (urlLinks) {
    if (value === urlLinks.value) {
      codeResp = urlLinks.code
      return false // lodash break equivalent
    }
  })
  return codeResp
}

function getLink (code) {
  var valueResp = null
  _.each(urlLinks, function (urlLinks) {
    if (code === urlLinks.code) {
      valueResp = urlLinks.link
      return false // lodash break equivalent
    }
  })
  return valueResp
}

function getValue (code) {
  var valueResp = null
  _.each(urlLinks, function (urlLinks) {
    if (code === urlLinks.code) {
      valueResp = urlLinks.value
      return false // lodash break equivalent
    }
  })
  return valueResp
}

module.exports = {
  getLink,
  getCode,
  getValue,
  ADMIN,
  CUSTOMER,
  SUPPORTOFFICER,
  CHANNELPARTNER,
  REALSTATEAGENT,
  CONVEYANCER,
  OFFICEMANAGER,
  DIRECTOR,
  CHIEFPRACTICEMANAGER
}
