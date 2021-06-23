import create from 'zustand'

import routesRaw from '_/../data/bus-scheduling-input.json'

// type definitions
export interface Route {
  id: number
  startTime: number
  endTime: number
  assignedBusId: number
}

export interface Bus {
  id: number
}

export interface State {
  routes: Route[]
  buses: Bus[]
  selectedRoute: null | Route['id']
  hoveredRoute: null | Route['id']
  shouldShowNewBusRow: boolean
  setShouldShowNewBusRow: (should: boolean) => void
  setSelectedRoute: (routeId: Route['id']) => void
  clearSelectedRoute: () => void
  setHoveredRoute: (routeId: Route['id']) => void
  clearHoveredRoute: () => void
  createBus: (busId: Bus['id']) => void
  updateBus: (bus: Bus) => void
  updateBuses: (buses: Bus[]) => void
  updateRouteBus: (routeId: Route['id'], busId: Bus['id']) => void
  removeEmptyBuses: () => void
}

// defaults
const routes = routesRaw.map((r) => ({...r, assignedBusId: r.id}))

const defaultBuses = routes.map((r) => ({id: r.id}))

// mutations
const updateBusData = (buses: Bus[], state: State) => {
  const newState = {...state}
  for (const bus of buses) {
    // make sure we aren't dealing with a reference
    const clonedBus = {...bus}
    const busIndex = newState.buses.findIndex((b) => b.id === clonedBus.id)
    newState.buses[busIndex] = clonedBus
  }
  return newState
}
const updateRouteData = (routes: Route[], state: State) => {
  const newState = {...state}
  for (const route of routes) {
    // make sure we aren't dealing with a reference
    const clonedRoute = {...route}
    const routeIndex = newState.routes.findIndex((b) => b.id === clonedRoute.id)
    newState.routes[routeIndex] = clonedRoute
  }
  return newState
}

// selectors
const getRoutesByBusId = (busId: number, state: State) =>
  state.routes.filter((r) => r.assignedBusId === busId)
const getRouteById = (id: number, state: State) => state.routes.find((b) => b.id === id)
const getBusById = (id: number, state: State) => state.buses.find((b) => b.id === id)

// hooks
// this useStore hook is low-level, should be abstracted by
// specific selector hooks, as seen below
export const useStore = create(
  (set): State => ({
    routes,
    buses: defaultBuses,
    selectedRoute: null,
    hoveredRoute: null,
    shouldShowNewBusRow: false,
    setShouldShowNewBusRow: (shouldShowNewBusRow) =>
      set((state: State) => ({...state, shouldShowNewBusRow})),
    setSelectedRoute: (selectedRoute) => set((state: State) => ({...state, selectedRoute})),
    clearSelectedRoute: () => set((state: State) => ({...state, selectedRoute: null})),
    setHoveredRoute: (hoveredRoute) => set((state: State) => ({...state, hoveredRoute})),
    clearHoveredRoute: () => set((state: State) => ({...state, hoveredRoute: null})),
    createBus: (busId) => set((state: State) => ({...state, buses: [...state.buses, {id: busId}]})),
    updateBus: (bus) => set((state: State) => updateBusData([bus], state)),
    updateBuses: (buses) => set((state: State) => updateBusData(buses, state)),
    updateRouteBus: (routeId: number, busId: number) =>
      set((state: State) => {
        const newRoute = {...getRouteById(routeId, state), assignedBusId: busId}
        return updateRouteData([newRoute], state)
      }),
    removeEmptyBuses: () =>
      set((state: State) => {
        const newState = {...state}
        for (const bus of state.buses) {
          if (!getRoutesByBusId(bus.id, state).length) {
            const busIndex = newState.buses.findIndex((b) => b.id === bus.id)
            newState.buses.splice(busIndex, 1)
          }
        }
        return newState
      }),
  })
)

// selector hooks
export const useRoutes = () =>
  useStore((state: State) => ({
    routes: state.routes,
    selectedRoute: state.selectedRoute,
    setSelectedRoute: state.setSelectedRoute,
    clearSelectedRoute: state.clearSelectedRoute,
    hoveredRoute: state.hoveredRoute,
    setHoveredRoute: state.setHoveredRoute,
    clearHoveredRoute: state.clearHoveredRoute,
    updateRouteBus: state.updateRouteBus,
    getRoutesByBusId: (busId: number) => getRoutesByBusId(busId, state),
    getRouteById: (id: number) => getRouteById(id, state),
  }))

export const useRoute = (id: number) =>
  useStore((state: State) => ({
    setSelectedRoute: state.setSelectedRoute,
    updateRouteBus: state.updateRouteBus,
    route: getRouteById(id, state),
  }))

export const useBuses = () =>
  useStore((state: State) => ({
    updateBuses: state.updateBuses,
    buses: state.buses,
    removeEmptyBuses: state.removeEmptyBuses,
    getBusById: (id: number) => getBusById(id, state),
    shouldShowNewBusRow: state.shouldShowNewBusRow,
    setShouldShowNewBusRow: state.setShouldShowNewBusRow,
    getNextBusId: () => Math.max(...state.buses.map((b) => b.id)) + 1,
    createBus: state.createBus,
  }))

export const useBus = (id: number) =>
  useStore((state: State) => ({
    updateBus: state.updateBus,
    bus: getBusById(id, state),
  }))
