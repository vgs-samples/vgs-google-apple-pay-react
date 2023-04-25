import React from 'react';
import { Helmet } from "react-helmet";

const ApplePay = (props) => {

  return (
    <>
      <Helmet>
        <script src="https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js"></script>
      </Helmet>
      <apple-pay-button buttonstyle="black" type="pay" locale="en" style={{ display: "block", width: "240px", height: "50px" }}>
      </apple-pay-button>
    </>
  )
}

export default ApplePay