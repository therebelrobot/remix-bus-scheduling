import {useCallback} from 'react'

import {useColorMode as chColorMode} from '@chakra-ui/core'

export const useColorMode = () => {
  const {colorMode, toggleColorMode: toggle} = chColorMode()
  const toggleColorMode = useCallback(() => {
    toggle()
    document.cookie = `isDarkMode=${colorMode === 'light'}`
  }, [toggle])
  return {colorMode, toggleColorMode, isDark: colorMode === 'dark'}
}
