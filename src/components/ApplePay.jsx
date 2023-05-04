import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'


// You must include the ApplePay JS SDK in your page.
// https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js
// We have included this in the <head> in public/index.html


const ApplePay = (props) => {

  const [canLoad, setLoad] = useState(false)

  const ApplePaySession = window.ApplePaySession
  const { vgs, state, passToParent } = props
  const VGS_URL = `https://${vgs.VAULT_ID}-${vgs.APPLE_PAY_ROUTE_ID}.sandbox.verygoodproxy.com/post`
  const backend = document.location.href + "paymentSession"

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
    
    
    
    session.onvalidatemerchant = event => {

      console.log(event)

      // Call your own server to request a new merchant session.
      // See: https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/requesting_an_apple_pay_payment_session
      axios.post(backend, { appleUrl: event.validationURL },
        {
          headers: {
            "Content-Type": "application/json",
          }
      }).then(res => {
          console.log(res.data)
          session.completeMerchantValidation(res.data);
        })
        .catch(err => {
          console.error("Error fetching merchant session", err);
        })
    };

    const performTransaction = (details, callback) => {

      state.request = details.token
    
      axios.post(VGS_URL, { token: details.token },
        {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
          },
        }).then(res => {
          if (res.status !== 200) {
            state.error = res.data
            passToParent("apple", state)
            callback({ approved: false })
          } else {
            state.success = 'Success!'
            state.response = res.data
            passToParent("apple", state)
            callback({ approved: true })
          }
        }).catch(error => {
          // Not a processing error, code/fetch error

          passToParent("apple", state)
          console.log(error)
          callback({ approved: false })
        });
    }

    session.onpaymentauthorized = function (event) {
      performTransaction(event.payment, function (outcome) {
        if (outcome.approved) {
          session.completePayment(ApplePaySession.STATUS_SUCCESS)
          console.log(outcome)
        } else {
          session.completePayment(ApplePaySession.STATUS_FAILURE)
          console.log(outcome)
        }
      })
    }

    session.begin()

  }

  return (
    <>
      {
        canLoad
          ? <apple-pay-button onMouseDown={createApplePaySession}  buttonstyle="black" type="pay" locale="en" style={{ height: "45px" }}></apple-pay-button>
          : <Alert status='warning' variant='solid'>
              <AlertIcon />
              <AlertDescription>Apple Pay is not supported with your current configuration.</AlertDescription>
            </Alert>
      }
      
    </>
  )
}

export default ApplePay