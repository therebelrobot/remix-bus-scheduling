import * as React from 'react'

import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

import {HomeLayout} from '_/layouts/HomeLayout'

export const HomeHandler = () => {
  // home page data needs are handled here
  // do not put layout JSX in here, only Provider wrapping if needed

  return (
    <DndProvider backend={HTML5Backend}>
      <HomeLayout />
    </DndProvider>
  )
}
