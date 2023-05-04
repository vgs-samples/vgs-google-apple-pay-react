
import { Card, CardHeader, Heading, Box, Text, CardBody, Stack, StackDivider } from '@chakra-ui/react'

const ResultCards = (props) => {

  let state = props.state 

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{props.title}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Success
            </Heading>
            <Text pt='2' fontSize='sm'>
              {state?.success ? JSON.stringify(state.success) : "Submit a request to see details"}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Error
            </Heading>
            <Text pt='2' fontSize='sm'>
              {state?.error ? JSON.stringify(state.error): "Submit a request to see details"}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Request
            </Heading>
            <Text pt='2' fontSize='sm'>
              {state?.request ? JSON.stringify(state.request) : "Submit a request to see details"}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Response
            </Heading>
            <Text pt='2' fontSize='sm'>
              {state?.response ? JSON.stringify(state.response) : "Submit a request to see details"}
            </Text>
          </Box>
        </Stack>
      </CardBody>      
    </Card>
  )
}

export default ResultCards 