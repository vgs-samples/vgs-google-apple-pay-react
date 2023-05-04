import * as React from 'react'
import {useState} from 'react'

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ChakraProvider, Center, Flex, Box, Divider } from '@chakra-ui/react'
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
    APPLE_PAY_ROUTE_ID: "0b807ac5-d13b-4511-b7b7-99c4aaa2d0df"
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
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box w='40%' p={5} color='white'>
              <ResultCards title="Google Pay Report" state={googlePayState} />
              <Box w='100%' p={4} color='white'></Box>
              <Center>
                <GooglePay state={googlePayState} passToParent={passToParent} vgs={vgs}  />
              </Center>
          </Box>
          <Divider orientation='vertical' />
          <Box w='40%' p={5} color='white'>
              <ResultCards title="Apple Pay Report" state={applePayState} />
              <Box w='100%' p={4} color='white'></Box>
              <Center>
                <ApplePay state={applePayState} passToParent={passToParent} vgs={vgs} />
              </Center>
          </Box>
        </Flex>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default App