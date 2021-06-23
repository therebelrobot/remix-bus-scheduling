import * as React from 'react'

import {useDrop} from 'react-dnd'

import {Box, Divider, theme} from '@chakra-ui/core'
import useHover from '@react-hook/hover'

import {BUS_HEIGHT, SIDEBAR_WIDTH} from '_/components/constants'
import {DragData, Route} from '_/components/Route'
import {useBuses, useRoutes} from '_/state'
import {useColorMode} from '_/utils/useColorMode'

export const NewBus: React.FC<{isOdd: boolean}> = ({isOdd}) => {
  const {
    routes: allRoutes,
    clearSelectedRoute,
    updateRouteBus,
    selectedRoute,
    getRouteById,
  } = useRoutes()
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
  const clickingRoute = getRouteById(selectedRoute)

  const {isDark} = useColorMode()

  const hoverRef = React.useRef(null)
  const isHovering = useHover(hoverRef, {enterDelay: 200, leaveDelay: 200})

  const isActive = isOver || isHovering

  return (
    <Box
      ref={drop}
      width="100%"
      height={`${BUS_HEIGHT}px`}
      backgroundColor={
        isActive
          ? theme.colors.blue[isDark ? 700 : 200]
          : isOdd
          ? theme.colors.blue[isDark ? 900 : 50]
          : 'transparent'
      }
      borderBottom={`solid 1px ${theme.colors.gray[500]}`}
      onClick={() => {
        if (!clickingRoute) return
        const newId = getNextBusId()
        createBus(newId)
        updateRouteBus(selectedRoute, newId)
        removeEmptyBuses()
        setShouldShowNewBusRow(false)
        clearSelectedRoute()
      }}
      cursor={isActive ? 'pointer' : undefined}
    >
      <Box ref={hoverRef} display="flex" flexDirection="row" width="100%" height="100%">
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
          {isActive && (!!dragRoute || !!clickingRoute) && (
            <Route
              key={`route-dragging-${dragRoute ? dragRoute.id : clickingRoute.id}`}
              route={dragRoute || clickingRoute}
              transient
            />
          )}
          +
        </Box>
      </Box>
    </Box>
  )
}
