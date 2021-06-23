import * as React from 'react'

import {Box, Heading, Link} from '@chakra-ui/core'

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
      <Heading fontSize="md" position="relative" top="5px" left="16px">
        by{' '}
        <Link href="https://aster.hn" target="_blank">
          Aster Haven
        </Link>
      </Heading>
    </Box>
  )
}
