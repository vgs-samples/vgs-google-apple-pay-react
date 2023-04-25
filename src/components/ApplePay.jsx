import React from 'react';
import { ApplePayButton } from "react-apple-pay-button";

const ApplePay = (props) => {

  const onRequestApplePay = () => {};
  return (
    <ApplePayButton onClick={onRequestApplePay} theme="light">
      {"Buy with"}
    </ApplePayButton>
  );
}

export default ApplePay