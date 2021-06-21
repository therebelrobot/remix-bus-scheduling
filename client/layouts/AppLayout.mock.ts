import {stubs} from 'mocks/stubs'

export const mockAppLayout = () => {
  jest.mock('_/layouts/AppLayout')
  stubs('_/layouts/AppLayout')
}
