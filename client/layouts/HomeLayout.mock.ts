import {stubs} from 'mocks/stubs'

export const mockHomeLayout = () => {
  jest.mock('_/layouts/HomeLayout')
  stubs('_/layouts/HomeLayout')
}
