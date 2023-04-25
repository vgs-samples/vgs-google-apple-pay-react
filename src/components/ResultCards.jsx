
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
              {state?.success ? state.success.toString() : "Submit a request to see details"}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Error
            </Heading>
            <Text pt='2' fontSize='sm'>
              {state?.error ? state.error.toString() : "Submit a request to see details"}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Request
            </Heading>
            <Text pt='2' fontSize='sm'>
              {state?.request ? state.request.toString() : "Submit a request to see details"}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Response
            </Heading>
            <Text pt='2' fontSize='sm'>
              {state?.response ? state.response.toString() : "Submit a request to see details"}
            </Text>
          </Box>
        </Stack>
      </CardBody>      
    </Card>
  )
}

export default ResultCards 