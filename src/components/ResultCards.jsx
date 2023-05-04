
import { Card, CardHeader, Heading, Box, Text, CardBody, Stack, StackDivider } from '@chakra-ui/react'

const ResultCards = (props) => {

  let data = props.data 

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
              {data.success}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Error
            </Heading>
            <Text pt='2' fontSize='sm'>
              {data.error}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Request
            </Heading>
            <Text pt='2' fontSize='sm'>
              {data.request}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Response
            </Heading>
            <Text pt='2' fontSize='sm'>
              {data.response}
            </Text>
          </Box>
        </Stack>
      </CardBody>      
    </Card>
  )
}

export default ResultCards 