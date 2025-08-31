import React, { FC } from 'react'
import type { GetStaticProps } from 'next'
import { Meta } from '@components'
import { HomePage } from '@pages'
import { THomePage } from '@localTypes/pageTypes'
import { homePageMock } from '@mocks/pages/homePage'

export const getStaticProps: GetStaticProps<THomePage> = async () => {
  return { props: { ...homePageMock } }
}

const Home: FC<THomePage> = ({ meta, title }) => (
  <>
    <Meta {...meta} />
    <HomePage title={title} />
  </>
)

export default Home
