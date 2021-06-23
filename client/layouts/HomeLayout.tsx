import * as React from 'react'

import {Box} from '@chakra-ui/core'

import {BusList} from '_/components/BusList'
import {TitleBar} from '_/components/TitleBar'

export const HomeLayout = () => {
  // Homepage layout is created here.
  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* page header */}
      <TitleBar />
      {/* context tools */}
      {/* main body */}
      <BusList />
      {/* footer status / info / etc. */}
    </Box>
  )
}
