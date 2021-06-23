import * as React from 'react'

import {useDrag} from 'react-dnd'

import {Box, Text, theme} from '@chakra-ui/core'
import useHover from '@react-hook/hover'

import {BUS_HEIGHT} from '_/components/constants'
import {RouteBackground} from '_/components/RouteBackground'
import {Route as RouteType, useBuses, useRoutes} from '_/state'

export interface DragData {
  routeId: RouteType['id']
}

export const Route: React.FC<{route: RouteType; transient?: boolean}> = ({route, transient}) => {
  const useDragHandler = React.useCallback(
    () => ({
      type: 'ROUTE',
      item: {routeId: route.id} as DragData,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [route.id]
  )
  const [{isDragging}, drag, dragPreview] = useDrag(useDragHandler)

  const {
    selectedRoute,
    setSelectedRoute,
    clearSelectedRoute,
    setHoveredRoute,
    clearHoveredRoute,
  } = useRoutes()
  const {setShouldShowNewBusRow} = useBuses()
  const isSelectedRoute = selectedRoute === route.id
  const width = route.endTime - route.startTime

  const hoverRef = React.useRef(null)
  const isHovering = useHover(hoverRef, {enterDelay: 200, leaveDelay: 200})

  React.useEffect(() => {
    if (transient) return
    if (isHovering) {
      setHoveredRoute(route.id)
      return
    }
    clearHoveredRoute()
  }, [isHovering])

  return (
    <Box
      ref={dragPreview}
      opacity={isDragging || transient ? 0.5 : 1}
      width={`${width}px`}
      height={`calc(${BUS_HEIGHT}px - 8px)`}
      position="absolute"
      top="4px"
      left={`${route.startTime}px`}
      background={isSelectedRoute || isDragging ? theme.colors.gray[500] : 'transparent'}
      borderRadius="5px"
      cursor="pointer"
      zIndex={2}
      onDragStart={() => {
        setSelectedRoute(route.id)
        setShouldShowNewBusRow(true)
      }}
      onClickCapture={(e) => {
        if (isSelectedRoute) return clearSelectedRoute()
        e.preventDefault()
        e.stopPropagation()
        setSelectedRoute(route.id)
      }}
    >
      <RouteBackground width={width} />
      <Box ref={drag} width="100%" height="100%" userSelect="none" zIndex={2}>
        <Box
          ref={hoverRef}
          padding="2px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Text fontSize="10px" textTransform="uppercase" position="relative" top="4px">
            {' '}
            Route {route.id}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
