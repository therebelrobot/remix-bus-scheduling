export const mockColorMode = () => {
  jest.mock('_/utils/useColorMode', () => ({
    useColorMode: () => ({colorMode: 'dark', toggleColorMode: () => null}),
  }))
}
