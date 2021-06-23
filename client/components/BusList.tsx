import * as React from 'react'

import {Box} from '@chakra-ui/core'

import {Bus} from '_/components/Bus'
import {NewBus} from '_/components/NewBus'
import {TimeScale} from '_/components/TimeScale'
import {useBuses} from '_/state'

export const BusList: React.FC = () => {
  const {buses, shouldShowNewBusRow} = useBuses()
  const busesRender = React.useMemo(() => {
    return (
      <>
        {buses.map((bus, index) => (
          <Bus key={`bus-${bus.id}`} busId={bus.id} isOdd={!(index % 2)} />
        ))}
      </>
    )
  }, [buses.length])
  return (
    <Box display="flex" flexDirection="column" flex="1" width="100%">
      <TimeScale />
      {busesRender}
      {shouldShowNewBusRow && <NewBus isOdd={!(buses.length % 2)} />}
    </Box>
  )
}
