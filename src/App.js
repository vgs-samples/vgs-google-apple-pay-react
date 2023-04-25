import * as React from 'react'
import {useState} from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Center, Divider, Box } from '@chakra-ui/react'
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import ResultCards from "./components/ResultCards.jsx"
import GooglePay from "./components/GooglePay.jsx"
import ApplePay from "./components/ApplePay.jsx"

const emotionCache = createCache({
  key: 'emotion-css-cache',
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});


function App() {
  // 2. Wrap ChakraProvider at the root of your app

  const [googlePayState, updateGooglePayState] = useState({})
  const [applePayState, updateApplePayState] = useState({})

  const passToParent = (type, state) => {
    if (type === 'google') {
      updateGooglePayState(state)
    } else {
      updateApplePayState(state)
    }
  }
  const vgs = {

    VAULT_ID: "tntxmzpmtvn",
    ORG_ID: "AC5dzmDWXoWwjtHXSBhh9mzw"
  }
  
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider>
        <Box w='40%' p={4} color='white'></Box>
        <Center>
          <Box w='40%' p={4} color='white'>
            <Box>
              <ResultCards title="Google Pay Report" state={googlePayState} />
              <Box w='100%' p={4} color='white'></Box>
              <Center>
                <GooglePay state={googlePayState} passToParent={passToParent} vgs={vgs}  />
              </Center>
            </Box>
          </Box>
          <Center height='50px'>
            <Divider orientation='vertical' />
          </Center>
          <Box w='40%' p={4} color='white'>
            <Box>
              <ResultCards title="Apple Pay Report" state={applePayState} />
              <Box w='100%' p={4} color='white'></Box>
              <Center>
                <ApplePay state={applePayState} passToParent={passToParent} vgs={vgs} />
              </Center>
            </Box>
          </Box>
        </Center>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default App