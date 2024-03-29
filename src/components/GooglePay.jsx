import GooglePayButton from '@google-pay/button-react'
import axios from 'axios'

const GooglePay = (props) => {

  const { vgs, data, passToParent } = props
  const update = Object.assign({}, data)

  const processGooglePay = (token) => {
    // show returned data in developer console for debugging
    console.log(token);
    // @todo pass payment token to your gateway to process payment
    // @note DO NOT save the payment credentials for future transactions,
    // unless they're used for merchant-initiated transactions with user
    // consent in place.
    let paymentToken = JSON.parse(token.paymentMethodData.tokenizationData.token);
    let url = `https://${vgs.VAULT_ID}-${vgs.GOOGLE_PAY_ROUTE_ID}.sandbox.verygoodproxy.com/post`
    let payload = {
        google_pay_payload: {
            token: paymentToken
        }
    }
    

    update.request = JSON.stringify(payload, null, 2)

    axios.post(url, payload)
        .then(function (response) {
          update.success = 'Success!'
          update.response = JSON.stringify(JSON.parse(response.data.data), null, 2)
          passToParent('google', update)
        })
        .catch(function (error) {
            update.error = error
            passToParent('google', update)
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
              allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'verygoodsecurity',
                gatewayMerchantId: props.vgs.ORG_ID,
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