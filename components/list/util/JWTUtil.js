import jwtDecode from 'jwt-decode'
import CONSTANTS from '../static/constants'
import userLinks from './UrlLink'

export default {
  computed: {
    isUserAdmin: {
      get () { return this.getUserRole() === CONSTANTS.USER_ROLE.ADMIN },
      set: (value) => value
    },
    isUserChiefPracticeManager: {
      get () { return this.getUserRole() === CONSTANTS.USER_ROLE.CHIEFPRACTICEMANAGER },
      set: (value) => value
    },
    isUserCustomer: {
      get () { return this.getUserRole() === CONSTANTS.USER_ROLE.CUSTOMER },
      set: (value) => value
    },
    isUserConveyancer: {
      get () { return this.getUserRole() === CONSTANTS.USER_ROLE.CONVEYANCER },
      set: (value) => value
    },
    isUserChannelPartner: {
      get () { return this.getUserRole() === CONSTANTS.USER_ROLE.CHANNELPARTNER },
      set: (value) => value
    },
    isUserRealEstateAgent: {
      get () { return this.getUserRole() === CONSTANTS.USER_ROLE.REALSTATEAGENT },
      set: (value) => value
    },
    isUserDirector: {
      get () { return this.getUserRole() === CONSTANTS.USER_ROLE.DIRECTOR },
      set: (value) => value
    },
    isUserPartnerAdmin: {
      get () { return this.getUserRole() === CONSTANTS.USER_ROLE.PARTNERADMIN },
      set: (value) => value
    },
    isUserOfficeManager: {
      get () { return this.getUserRole() === CONSTANTS.USER_ROLE.OFFICEMANAGER },
      set: (value) => value
    }
  },
  methods: {
    saveJWTToken (token, id, role, userAuth, fullName, avatar, firstName, origins, user, organisationId, organisationName) {
      var expirationMS = 24 * 60 * 60 * 1000
      var object = {token: token, id: id, role: role, userAuth: userAuth, timestamp: new Date().getTime() + expirationMS, fullName, avatar: avatar, firstName, origins: origins, user: user, organisationId: organisationId, organisationName: organisationName}
      localStorage.setItem('auth_token', JSON.stringify(object))
      localStorage.setItem('userRole', object.role)
    },
    hasToken () {
      const token = this.getToken()
      return token && token.length > 0
    },
    getHeaderObject (addedData) {
      const data = this.getUserObject()
      if (data) {
        return {
          role: data.role || '',
          user_id: data.id || '',
          org_id: data.user.organizationId || '',
          'x-access-token': data.userAuth,
          ...(addedData && addedData)
        }
      }
    },
    getToken () {
      var object = this.getUserObject()
      if (object) {
        return object.token
      } else {
        return ''
      }
    },
    getUserId () {
      var object = this.getUserObject()
      if (object) {
        return object.id
      } else {
        return ''
      }
    },
    getSignatureUrl () {
      var object = this.getUserObject()
      if (object) {
        return object.user.signatureUrl
      } else {
        return ''
      }
    },
    getOrganisationId () {
      var object = this.getUserObject()
      if (object) {
        return object.user.organizationId
      } else {
        return ''
      }
    },
    getOrganisationName () {
      var object = this.getUserObject()
      if (object) {
        return object.user.organizationName
      } else {
        return ''
      }
    },
    getPartnerName () {
      var object = this.getUserObject()
      if (object) {
        return object.user.partnerName
      } else {
        return ''
      }
    },
    getUserRole () {
      var object = this.getUserObject()
      if (object) {
        return object.role
      } else {
        return ''
      }
    },
    getUserAuthToken () {
      var object = this.getUserObject()
      if (object) {
        return object.userAuth
      } else {
        return ''
      }
    },
    getUser () {
      var object = this.getUserObject()
      if (object) {
        return object.user
      } else {
        return ''
      }
    },
    getUserObject () {
      var object = JSON.parse(localStorage.getItem('auth_token'))
      if (object) {
        var timestamp = new Date(object.timestamp).getTime()
        var now = new Date().getTime()
        if (now < timestamp) {
          return object
        } else {
          localStorage.removeItem('auth_token')
          return ''
        }
      } else {
        return ''
      }
    },
    decodeToken () {
      const token = this.getToken()
      if (token === '') {
        return ''
      } else {
        return jwtDecode(token)
      }
    },
    removeToken () {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('isUserActive')
      localStorage.removeItem('property')
      localStorage.removeItem('user')
      localStorage.removeItem('vuex')
      localStorage.removeItem('userRole')
      this.eraseCookie('authservice-jwt')
    },
    getUserRoleDescription () {
      const userRole = this.getUserRole()
      if (userRole === CONSTANTS.USER_ROLE.REALSTATEAGENT) {
        return CONSTANTS.USER_ROLE_DESC.REALSTATEAGENT
      } else if (userRole === CONSTANTS.USER_ROLE.CHANNELPARTNER) {
        return CONSTANTS.USER_ROLE_DESC.CHANNELPARTNER
      } else if (userRole === CONSTANTS.USER_ROLE.CONVEYANCER) {
        return CONSTANTS.USER_ROLE_DESC.CONVEYANCER
      } else if (userRole === CONSTANTS.USER_ROLE.CUSTOMER) {
        return CONSTANTS.USER_ROLE_DESC.CUSTOMER
      } else if (userRole === CONSTANTS.USER_ROLE.ADMIN) {
        return CONSTANTS.USER_ROLE_DESC.ADMIN
      } else if (userRole === CONSTANTS.USER_ROLE.CHIEFPRACTICEMANAGER) {
        return CONSTANTS.USER_ROLE_DESC.CHIEF_PRACTICE_MANAGER
      }
    },
    getDashboardPerRole () {
      const userRole = this.getUserRole()
      if (userRole === CONSTANTS.USER_ROLE.REALSTATEAGENT) {
        return CONSTANTS.USER_ROLE_URL.REALSTATEAGENT
      } else if (userRole === CONSTANTS.USER_ROLE.CHANNELPARTNER) {
        return CONSTANTS.USER_ROLE_URL.CHANNELPARTNER
      } else if (userRole === CONSTANTS.USER_ROLE.CONVEYANCER) {
        return CONSTANTS.USER_ROLE_URL.CONVEYANCER
      } else if (userRole === CONSTANTS.USER_ROLE.CUSTOMER) {
        return CONSTANTS.USER_ROLE_URL.CUSTOMER
      } else if (userRole === CONSTANTS.USER_ROLE.ADMIN) {
        return CONSTANTS.USER_ROLE_URL.ADMIN
      } else if (userRole === CONSTANTS.USER_ROLE.OFFICEMANAGER) {
        return CONSTANTS.USER_ROLE.OFFICEMANAGER
      } else if (userRole === CONSTANTS.USER_ROLE.CHIEFPRACTICEMANAGER) {
        return CONSTANTS.USER_ROLE.CHIEFPRACTICEMANAGER
      }
    },
    // get Full user name from storage
    getFullUserFullName () {
      var object = this.getUserObject()
      if (object) {
        // if (object.role === CONSTANTS.USER_ROLE.ADMIN) {
        // return 'Convx'
        // } else {
        return object.fullName
        // }
      } else {
        return ''
      }
    },
    getAvatar () {
      var object = this.getUserObject()
      if (object.avatar) {
        return object.avatar
      } else {
        return '/avatar-placeholder2.png'
      }
    },
    setAvatar (newAvatar) {
      var object = this.getUserObject()
      if (object.avatar) {
        object.avatar = newAvatar
      }
      localStorage.setItem('auth_token', JSON.stringify(object))
    },
    getUserEmail () {
      var object = this.decodeToken()
      if (object.identity) {
        return object.identity.email
      } else {
        return ''
      }
    },
    getUserFirstName () {
      var object = this.getUserObject()
      if (object) {
        return object.firstName
      } else {
        return ''
      }
      // if (object) {
      //   if (object.role === CONSTANTS.USER_ROLE.ADMIN) {
      //     return 'Convx'
      //   } else {
      //     return object.firstName
      //   }
      // } else {
      //   return ''
      // }
    },
    getTenant () {
      var object = this.decodeToken()
      if (object.identity) {
        return object.identity.tenant
      } else {
        return ''
      }
    },
    getOrigins () {
      var object = this.getUserObject()
      if (object) {
        if (object.origins) {
          return object.origins
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    eraseCookie (name) {
      document.cookie = name + '=; Max-Age=0' + ';path=/'
    },
    getCookie (cname) {
      var name = cname + '='
      var decodedCookie = decodeURIComponent(document.cookie)
      var ca = decodedCookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    },
    setCookie (cname, cvalue, exdays) {
      console.log('setCookie(' + cname + ')')
      var d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      var expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    },
    generateUserRoleLinks () {
      let roles = this.$store.state.user.userRoles
      if (roles === null || !roles) {
        let object = this.getUserObject()
        roles = object.user.userRoles
      }
      roles.forEach(role => {
        role.link = userLinks.getLink(role.role)
        role.roleText = userLinks.getValue(role.role)
      })
      return roles
    },
    getUserCustomerRole () {
      let role = this.$store.state.user.userCustomerRole
      if (role === null || !role) {
        let object = this.getUserObject()
        role = object.user.userCustomerRole
      }
      console.log(role)
      role.link = userLinks.getLink(role.role)
      role.roleText = userLinks.getValue(role.role)
      return role
    },
    changeRole (role) {
      let user = this.getUserObject().user
      user.organizationId = role.organizationId
      user.organizationName = role.organizationName || role.organization
      user.partnerName = role.partnerName
      this.saveJWTToken(this.getToken(), this.getUserId(), role.role, this.getUserAuthToken(), this.getFullUserFullName()
        , this.getAvatar(), this.getUserFirstName(), this.getOrigins(), user)
      this.$store.dispatch('setUser', user)
      this.$store.dispatch('setActiveRole', role.role)
      this.$router.push(role.link).catch(_err => { this.$router.go() })
    }
  }
}
