import * as React from 'react'

import {Box} from '@chakra-ui/core'

import BusBack from '_/img/BusBack.svg'
import BusFront from '_/img/BusFront.svg'
import BusMiddle from '_/img/BusMiddle.svg'

export const RouteBackground = ({width}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      position="absolute"
      left={0}
      top={0}
      width="100%"
      height="32px"
      zIndex={1}
      pointerEvents="none"
    >
      <Box width="27px" height="100%" flexShrink={0}>
        <Box as={BusFront} height="100%" width="100%" fill="currentColor"></Box>
      </Box>
      <Box flex={1} height="100%" display="flex" flexDirection="row" overflowX="hidden">
        {[...Array(Math.ceil((width - 52) / 19)).keys()].map((_, index) => (
          <Box
            as={BusMiddle}
            key={`route-bg-${index}`}
            height="32px"
            width="19px"
            flexShrink={0}
            fill="currentColor"
          ></Box>
        ))}
      </Box>
      <Box width="26px" flexShrink={0}>
        <Box as={BusBack} height="100%" width="100%" fill="currentColor"></Box>
      </Box>
    </Box>
  )
}
