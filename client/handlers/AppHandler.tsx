import React from 'react'

import cookies from 'next-cookies'

import {ColorModeProvider, CSSReset, ThemeProvider} from '@chakra-ui/core'

import {ApiProvider} from '_/contexts/Api/ApiProvider'
import {AppLayout} from '_/layouts/AppLayout'

export const AppHandler = ({Component, pageProps, initialColorMode}) => {
  // do not put layout JSX in here, only Provider wrapping if needed

  return (
    <ApiProvider initialState={pageProps.initialApolloState}>
      <ThemeProvider>
        <ColorModeProvider value={initialColorMode}>
          <CSSReset />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ColorModeProvider>
      </ThemeProvider>
    </ApiProvider>
  )
}

AppHandler.getInitialProps = async ({Component, ctx}) => {
  // fixes Chakra's dark mode for Next.js
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  const {isDarkMode = 'false'} = cookies(ctx)
  return {
    pageProps,
    initialColorMode: isDarkMode === 'true' ? 'dark' : 'light',
  }
}
