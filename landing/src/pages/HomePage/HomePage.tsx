import React, { FC } from 'react'
import { HomeTemplate } from '@templates'
import { THomePage } from '@localTypes/pageTypes'

export const HomePage: FC<Omit<THomePage, 'meta'>> = ({ title }) => {
  return <HomeTemplate>{title}</HomeTemplate>
}
