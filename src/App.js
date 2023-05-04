import * as React from 'react'
import {useState} from 'react'

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ChakraProvider, Center, Box, Flex, Divider } from '@chakra-ui/react'
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
  
  const [googlePayState, updateGooglePayState] = useState({})
  const [applePayState, updateApplePayState] = useState({})

  const passToParent = (type, state) => {
    if (type === 'google') {
      updateGooglePayState(state)
    } else {
      updateApplePayState(state)
    }
  }


  
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider>
        <Center>
          <ReactSVG beforeInjection={(svg) => {svg.setAttribute('style', 'width: 150px')}} src="vgs-initials-color.svg" />
        </Center>
        <Center>
          <Flex>
            <Box w='40%' p={5} color='white'>
                <ResultCards title="Google Pay Report" state={googlePayState} />
                <Box w='100%' p={4} color='white'></Box>
                <Center>
                  <GooglePay state={googlePayState} passToParent={passToParent} vgs={vgs}  />
                </Center>
            </Box>
            <Center>
              <Divider orientation='vertical' />
            </Center>
            <Box w='40%' p={5} color='white'>
                <ResultCards title="Apple Pay Report" state={applePayState} />
                <Box w='100%' p={4} color='white'></Box>
                <Center>
                  <ApplePay state={applePayState} passToParent={passToParent} vgs={vgs} />
                </Center>
            </Box>
          </Flex>
        </Center>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default App