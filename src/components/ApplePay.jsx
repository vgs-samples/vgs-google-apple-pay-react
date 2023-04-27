import React, {useState, useEffect} from 'react';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'
import axios from 'axios'


// You must include the ApplePay JS SDK in your page.
// https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js
// We have included this in the <head> in public/index.html


const ApplePay = (props) => {

  const [canLoad, setLoad] = useState(false)

  const ApplePaySession = window.ApplePaySession
  const { vgs, state, passToParent } = props
  const url = `https://${vgs.VAULT_ID}-${vgs.APPLE_PAY_ROUTE_ID}.sandbox.verygoodproxy.com/post`
  let backend = "yourbackendserver.com"

  // See: https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/checking_for_apple_pay_availability
  // useEffect(() => {
  //   if (ApplePay) {
  //     var merchantIdentifier = 'merchant.verygoodsecurity.demo.applepay';
  //     var promise = ApplePay.canMakePaymentsWithActiveCard(merchantIdentifier);
  //     promise.then(function (canMakePayments) {
  //         if (canMakePayments)
  //           setLoad(true)
  //   }); }
  // }, [])
    

  useEffect(() => {
    if (ApplePaySession) {
      var merchantIdentifier = 'merchant.verygoodsecurity.demo.applepay';
      if (ApplePaySession.canMakePayments(merchantIdentifier)) {
        setLoad(true)
      }
    }
  }, [ApplePaySession])
  
  const createApplePaySession = () => {

    var request = {
      countryCode: 'US',
      currencyCode: 'USD',
      supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
      merchantCapabilities: ['supports3DS'],
      total: { label: 'Very Good Security', amount: '10.00' },
    }
    var session = new ApplePaySession(8, request);
    
    session.begin()
    
    session.onvalidatemerchant = event => {
        console.log(event)
        // Call your own server to request a new merchant session.
        // See: https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/requesting_an_apple_pay_payment_session
        axios.get(backend)
          .then(res => res.json()) // Parse response as JSON.
          .then(merchantSession => {
            session.completeMerchantValidation(merchantSession);
          })
          .catch(err => {
            console.error("Error fetching merchant session", err);
          });
    };

    session.onshippingcontactselected = event => {
      // Do things
    }
    
    session.onpaymentauthorized = token => {
      axios.post(url, token)
        .then(function (response) {
          state.success = 'Success!'
          session.completePayment({"status": 0})
          state.response = JSON.stringify(JSON.parse(response.data.data), null, 2)
          passToParent(state)
        })
        .catch(function (error) {
          state.error = error
          session.completePayment({
            "status": 1,
            "errors": [error]
        })
          passToParent(state)
        });
    }
  }

  return (
    <>
      {
        canLoad
          ? <apple-pay-button onMouseDown={createApplePaySession}  buttonstyle="black" type="pay" locale="en" style={{ height: "45px" }}></apple-pay-button>
          : <Alert status='warning' variant='solid'>
              <AlertIcon />
              <AlertDescription>Apple Pay is not supported with current configuration.</AlertDescription>
            </Alert>
      }
      
    </>
  )
}

export default ApplePay