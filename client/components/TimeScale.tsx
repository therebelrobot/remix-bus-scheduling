import * as React from 'react'

import {Box, Text, theme} from '@chakra-ui/core'

import {BUS_HEIGHT, SIDEBAR_WIDTH} from '_/components/constants'
import {useBuses} from '_/state'
import {getMinuteTime} from '_/utils/getTime'

export const TimeScale: React.FC = () => {
  const {buses, shouldShowNewBusRow} = useBuses()
  return (
    <Box
      width="100%"
      height={`${BUS_HEIGHT}px`}
      display="flex"
      flexDirection="row"
      backgroundColor="transparent"
      borderBottom={`solid 1px ${theme.colors.gray[500]}`}
      overflowX="hidden"
    >
      <Box width={`${SIDEBAR_WIDTH}px`} />
      <Box position="relative" flex="1" height="100%">
        {[...Array(25).keys()].map((_, index) => {
          const timeRaw = index * 60
          return (
            <Box
              key={`time-scale-${index}`}
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              left={`${timeRaw}px`}
              transform="translateX( -50% )"
            >
              <Text fontSize="10px">{getMinuteTime(timeRaw)}</Text>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
