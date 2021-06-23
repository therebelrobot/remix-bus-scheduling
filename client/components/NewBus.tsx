import * as React from 'react'

import {useDrop} from 'react-dnd'

import {Box, Divider, theme} from '@chakra-ui/core'

import {BUS_HEIGHT, SIDEBAR_WIDTH} from '_/components/constants'
import {DragData, Route} from '_/components/Route'
import {useBuses, useRoutes} from '_/state'
import {useColorMode} from '_/utils/useColorMode'

export const NewBus: React.FC<{isOdd: boolean}> = ({isOdd}) => {
  const {routes: allRoutes, clearSelectedRoute, updateRouteBus} = useRoutes()
  const {removeEmptyBuses, setShouldShowNewBusRow, getNextBusId, createBus} = useBuses()

  const [
    {
      isOver,
      data: {routeId: dragRouteId},
    },
    drop,
  ] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'ROUTE',
    // Props to collect
    collect: (monitor) => ({
      data: monitor.getItem() || ({routeId: null, busId: null} as DragData),
      isOver: monitor.isOver(),
    }),
    drop: ({routeId}: DragData, monitor) => {
      const newId = getNextBusId()
      createBus(newId)
      updateRouteBus(routeId, newId)
      removeEmptyBuses()
      setShouldShowNewBusRow(false)
      clearSelectedRoute()
    },
  }))
  const dragRoute = allRoutes.find((r) => r.id === dragRouteId)
  const {isDark} = useColorMode()

  return (
    <Box
      ref={drop}
      width="100%"
      height={`${BUS_HEIGHT}px`}
      display="flex"
      flexDirection="row"
      backgroundColor={
        isOver
          ? theme.colors.blue[isDark ? 700 : 200]
          : isOdd
          ? theme.colors.blue[isDark ? 900 : 50]
          : 'transparent'
      }
      borderBottom={`solid 1px ${theme.colors.gray[500]}`}
    >
      <Box
        width={`${SIDEBAR_WIDTH}px`}
        height="100%"
        padding="4px"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        Create New
      </Box>
      <Divider orientation="vertical" margin={0} />
      <Box
        position="relative"
        flex="1"
        height="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        {isOver && !!dragRoute && (
          <Route key={`route-dragging-${dragRoute.id}`} route={dragRoute} />
        )}
        +
      </Box>
    </Box>
  )
}
