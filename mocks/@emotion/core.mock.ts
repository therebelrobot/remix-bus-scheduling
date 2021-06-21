export const mockEmotionCore = () => {
  jest.mock('@emotion/core', () => ({
    css: () => null,
    Global: 'Global',
  }))
}
