import React, { FC, PropsWithChildren } from 'react'
import { Styled } from './styled'

export const HomeTemplate: FC<PropsWithChildren> = ({ children }) => (
  <Styled.MainContainer>{children}</Styled.MainContainer>
)
