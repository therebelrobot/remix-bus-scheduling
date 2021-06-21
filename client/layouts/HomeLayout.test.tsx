import * as React from 'react'

import renderer from 'react-test-renderer'

import {HomeLayout} from '_/layouts/HomeLayout'

import 'mocks/@chakra-ui/core.mock'

it('renders', () => {
  expect(renderer.create(<HomeLayout />).toJSON()).toMatchSnapshot()
})
