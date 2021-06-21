import * as React from 'react'

import {defaultState} from '_/contexts/AppState/defaultState'

export const AppStateContext = React.createContext(defaultState)
export const useAppState = () => {
  return React.useContext(AppStateContext)
}
