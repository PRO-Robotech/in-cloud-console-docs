import React, { FC } from 'react'
import Head from 'next/head'
import { TMeta } from '@localTypes/meta'

export const Meta: FC<TMeta> = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)
