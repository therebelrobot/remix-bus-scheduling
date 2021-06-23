import * as React from 'react'

import {Box, Heading} from '@chakra-ui/core'

export const TitleBar: React.FC = () => {
  return (
    <Box
      paddingLeft="16px"
      display="flex"
      flexDirection="row"
      alignItems="center"
      height="80px"
      width="100%"
    >
      <Heading>Bus Route Planner</Heading>
    </Box>
  )
}
