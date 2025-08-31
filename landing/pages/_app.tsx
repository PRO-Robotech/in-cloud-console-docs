/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import StyledComponentsRegistry from '../src/lib/registry'
import 'normalize.css/normalize.css'
// import './styles.css'

const MyApp: FC<any> = ({ Component, pageProps }: AppProps) => (
  <StyledComponentsRegistry>
    <Component {...pageProps} />
  </StyledComponentsRegistry>
)

export default MyApp
