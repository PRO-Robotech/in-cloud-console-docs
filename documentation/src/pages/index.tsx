/* eslint-disable import/no-default-export */
import React, { FC } from 'react'
import Layout from '@theme/Layout'
import { Header } from '@site/src/components/Landing/molecules'

const LandingPage: FC = () => {
  return (
    <Layout title="in-Сloud Console" description="in-Сloud Console">
      <Header />
    </Layout>
  )
}

export default LandingPage
