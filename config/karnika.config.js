let config = Object.assign({})
import { production } from './env.config'

Object.defineProperties(config, {
  apiTimeout: {
    value: production ? 10 * 1000 : 20 * 1000, // 10 or 20 sec
    writable: false
  },
  serviceUrl: {
    value: production ? 'https://sales.karnikaindustries.com/api/retailer/' : 'https://thekidcity.co/karnika/api/retailer/',
    writable: false
  },
  paymentURL: {
    value: production ? 'https://sales.karnikaindustries.com/api/retailer/' : 'https://thekidcity.co/karnika/api/retailer/',
    writable: false
  },
  stripeKey: {
    value: production ? "rzp_test_cSiAv6UOeW5YbX" : "rzp_test_cSiAv6UOeW5YbX",
    writable: false
  },
  googleTrackid: {
    value: production ? "UA-198537569-1" : "UA-198537569-1",
    writable: false
  },
  deviceToken:{
    value: "",
    writable: false
  }
})
Object.seal(config)

module.exports = config



//live - https://thekidcity.in/api/retailer/

//dev - https://dev.maxmobility.in/kidcity/api/retailer/
// https://dev.maxmobility.in/kidcity/pay-now

//local - http://192.168.0.32:8080/kidcity_repo/public/api/retailer/
// http://192.168.0.32:8080/kidcity_repo/public/pay-now

// 192.168.0.16