import * as React from 'react'

import {useDrop} from 'react-dnd'

import {Box, Divider, Text, theme} from '@chakra-ui/core'

import {BUS_HEIGHT, SIDEBAR_WIDTH} from '_/components/constants'
import {DragData, Route} from '_/components/Route'
import {Bus as BusType, useBus, useBuses, useRoutes} from '_/state'
import {getMinuteTime} from '_/utils/getTime'
import {hasTimeConflict} from '_/utils/hasTimeConflict'
import {useColorMode} from '_/utils/useColorMode'

export const Bus: React.FC<{busId: BusType['id']; isOdd: boolean}> = ({busId, isOdd}) => {
  const {routes: allRoutes, clearSelectedRoute, updateRouteBus, getRoutesByBusId} = useRoutes()
  const {bus} = useBus(busId)
  const {removeEmptyBuses, setShouldShowNewBusRow} = useBuses()

  const {isDark} = useColorMode()

  const canDropHandler = ({routeId}: DragData, monitor) => {
    const dragRoute = allRoutes.find((r) => r.id === routeId)
    const busRoutes = getRoutesByBusId(bus.id)
    const alreadyHasDragRoute = busRoutes.some((r) => r.id === routeId)
    let dragRouteConflict = false
    for (const busRoute of busRoutes) {
      dragRouteConflict = dragRouteConflict || hasTimeConflict(busRoute, dragRoute)
    }
    return !dragRouteConflict && !alreadyHasDragRoute
  }

  const dropHandler = ({routeId}: DragData, monitor) => {
    updateRouteBus(routeId, bus.id)
    removeEmptyBuses()
    setShouldShowNewBusRow(false)
    clearSelectedRoute()
  }

  const useDropHandler = () => ({
    // The type (or types) to accept - strings or symbols
    accept: 'ROUTE',
    // Props to collect
    collect: (monitor) => ({
      data: monitor.getItem() || ({routeId: null, busId: null} as DragData),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: canDropHandler,
    drop: dropHandler,
  })
  const [
    {
      canDrop,
      isOver,
      data: {routeId: dragRouteId},
    },
    drop,
  ] = useDrop(useDropHandler)
  const dragRoute = allRoutes.find((r) => r.id === dragRouteId)
  const busRoutes = getRoutesByBusId(busId)
  const alreadyHasDragRoute = busRoutes.some((r) => r.id === dragRouteId)

  const dragRouteConflict = React.useMemo(() => {
    let conflict = false
    if (isOver && !alreadyHasDragRoute && dragRoute) {
      for (const busRoute of busRoutes) {
        conflict = conflict || hasTimeConflict(busRoute, dragRoute)
      }
    }
    return conflict
  }, [isOver])

  const startTimeRaw = React.useMemo(
    () =>
      Math.min(
        ...[...busRoutes, ...(isOver && dragRoute && !dragRouteConflict ? [dragRoute] : [])]
          .filter(Boolean)
          .map((r) => r.startTime)
      ),
    [isOver, busRoutes.length]
  )
  const endTimeRaw = React.useMemo(
    () =>
      Math.max(
        ...[...busRoutes, ...(isOver && dragRoute && !dragRouteConflict ? [dragRoute] : [])]
          .filter(Boolean)
          .map((r) => r.endTime)
      ),
    [isOver, busRoutes.length]
  )

  return (
    <Box
      ref={drop}
      width="100%"
      height={`${BUS_HEIGHT}px`}
      display="flex"
      flexDirection="row"
      backgroundColor={
        isOver && !dragRouteConflict && !alreadyHasDragRoute
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
        paddingLeft="16px"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Text>Bus {busId}</Text>
        <Divider orientation="vertical" />

        <Text fontSize="xs">
          {getMinuteTime(startTimeRaw)}
          {' - '}
          {getMinuteTime(endTimeRaw)}
        </Text>
      </Box>

      <Divider orientation="vertical" margin={0} />
      <Box position="relative" flex="1" height="100%" overflowX="hidden">
        {[...Array(25).keys()].map((_, index) => (
          <Divider
            orientation="vertical"
            opacity={0.5}
            position="absolute"
            left={`${index * 60}px`}
            top={0}
            bottom={0}
            zIndex={1}
            margin={0}
          />
        ))}
        {isOver && !!dragRoute && !dragRouteConflict && (
          <Route key={`route-dragging-${dragRoute.id}`} route={dragRoute} />
        )}
        {busRoutes.map((route) => (
          <Route key={`route-${route.id}`} route={route} />
        ))}
      </Box>
    </Box>
  )
}
