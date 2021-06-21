import * as React from 'react'

import {AppStateContext} from '_/contexts/AppState/AppStateContext'

export const AppStateProvider = ({children}) => {
  return <AppStateContext.Provider value={{}}>{children}</AppStateContext.Provider>
}
