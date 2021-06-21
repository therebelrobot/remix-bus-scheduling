import * as React from 'react'

import renderer from 'react-test-renderer'

import {AppLayout} from '_/layouts/AppLayout'

import {mockChakraUiCore} from 'mocks/@chakra-ui/core.mock'
import {mockEmotionCore} from 'mocks/@emotion/core.mock'

import {mockColorMode} from '_/utils/useColorMode.mock'

mockColorMode()
mockChakraUiCore()
mockEmotionCore()

it('renders', () => {
  expect(
    renderer
      .create(
        <AppLayout>
          <div />
        </AppLayout>
      )
      .toJSON()
  ).toMatchSnapshot()
})
