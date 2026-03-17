/* eslint-disable import/no-default-export */
import React, { FC } from 'react'
import Layout from '@theme/Layout'

const STORYBOOK_URL = 'https://in-cloud.io/storybook/?path=/story/factory-taints--default'

const StorybookPage: FC = () => {
  return (
    <Layout title="Storybook" description="in-Cloud Storybook" noFooter wrapperClassName="storybook-full-width">
      <main className="storybook-container">
        <iframe
          src={STORYBOOK_URL}
          title="Storybook"
          className="storybook-iframe"
        />
      </main>
    </Layout>
  )
}

export default StorybookPage
