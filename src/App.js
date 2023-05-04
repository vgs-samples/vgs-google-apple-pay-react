import * as React from 'react'
import {useState} from 'react'

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ChakraProvider, Center, Box, Divider } from '@chakra-ui/react'
import { ReactSVG } from 'react-svg'

import ResultCards from "./components/ResultCards.jsx"
import GooglePay from "./components/GooglePay.jsx"
import ApplePay from "./components/ApplePay.jsx"

const emotionCache = createCache({
  key: 'emotion-css-cache',
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});


function App() {

  const vgs = {
    VAULT_ID: "tntq31aihwk",
    ORG_ID: "ACmsziNd1zaK1wPseoXvkptS",
    GOOGLE_PAY_ROUTE_ID: "dbcb64c8-a58e-40f6-addc-9c8b363bebb3",
    APPLE_PAY_ROUTE_ID: "87791d38-602d-4403-862c-59431c9a5150"
  }
  
  const data = {
    success: "Submit a request to see details",
    error: "Submit a request to see details",
    request: "Submit a request to see details",
    respons: "Submit a request to see details"
  }
  const [googlePayState, updateGooglePayState] = useState(data)
  const [applePayState, updateAppleState] = useState(data)

  const passToParent = (type, state) => {
    console.log(type, state)
    if (type === 'google') updateGooglePayState(state)
    else if (type === 'apple') updateAppleState(state)
    console.log(applePayState, googlePayState)
  }


  
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider>
        <Center>
          <ReactSVG beforeInjection={(svg) => {svg.setAttribute('style', 'width: 150px')}} src="vgs-initials-color.svg" />
        </Center>
        <Center>
          <Box w='40%' p={5} color='white'>
              <ResultCards title="Google Pay Report" data={googlePayState} />
              <Box w='100%' p={4} color='white'></Box>
              <Center>
                <GooglePay data={googlePayState} passToParent={passToParent} vgs={vgs}  />
              </Center>
          </Box>
          <Center>
            <Divider orientation='vertical' />
          </Center>
          <Box w='40%' p={5} color='white'>
              <ResultCards title="Apple Pay Report" data={applePayState} />
              <Box w='100%' p={4} color='white'></Box>
              <Center>
                <ApplePay data={applePayState} passToParent={passToParent} vgs={vgs} />
              </Center>
          </Box>
        </Center>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default App