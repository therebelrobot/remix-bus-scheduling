export const mockChakraUiCore = () => {
  jest.mock('@chakra-ui/core', () => ({
    Box: 'Box',
    IconButton: 'IconButton',
    Text: 'Text',
  }))
}
