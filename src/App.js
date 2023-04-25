import * as React from 'react'
import {useState} from 'react'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Center, Divider } from '@chakra-ui/react'

import ResultCards from "./components/ResultCards.jsx"
import GooglePay from "./components/GooglePay.jsx"
import ApplePay from "./components/ApplePay.jsx"

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

  return (
    
    <ChakraProvider>
      <Box w='40%' p={4} color='white'></Box>
      <Center>
        <Box w='40%' p={4} color='white'>
          <Box>
            <ResultCards title="Google Pay Report" state={googlePayState} />
            <Box w='100%' p={4} color='white'></Box>
            <Center>
              <GooglePay state={googlePayState} passToParent={passToParent} />
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
            <ApplePay state={applePayState} passToParent={passToParent}/>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  )
}

export default App