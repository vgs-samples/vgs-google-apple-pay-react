import GooglePayButton from '@google-pay/button-react'
import axios from 'axios'

const GooglePay = (props) => {

  const ORG_ID = "AC5dzmDWXoWwjtHXSBhh9mzw"

  const passToParent = props.passToParent
  const state = props.state 

  const processGooglePay = (token) => {
    // show returned data in developer console for debugging
    console.log(token);
    // @todo pass payment token to your gateway to process payment
    // @note DO NOT save the payment credentials for future transactions,
    // unless they're used for merchant-initiated transactions with user
    // consent in place.
    let paymentToken = JSON.parse(token.paymentMethodData.tokenizationData.token);
    let url = `https://tntxmzpmtvn.sandbox.verygoodproxy.com/post`
    let payload = {
        google_pay_payload: {
            token: paymentToken
        }
    }
    
    state.request = JSON.stringify(payload, null, 2)

    axios.post(url, payload)
        .then(function (response) {
            state.success = 'Success!'
            state.response = JSON.stringify(JSON.parse(response.data.data), null, 2)
            passToParent(state)
        })
        .catch(function (error) {
            state.error = error
            passToParent(state)
        });
  }
  
  return (
    <GooglePayButton
      environment="TEST"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY'],
              allowedCardNetworks: ['MASTERCARD', 'VISA'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'verygoodsecurity',
                gatewayMerchantId: ORG_ID,
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Demo Merchant',
        },
        transactionInfo: {
          totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
          currencyCode: 'USD'
        },
      }}
      onLoadPaymentData={paymentRequest => {
        processGooglePay(paymentRequest);
      }}
    />
  )
}

export default GooglePay