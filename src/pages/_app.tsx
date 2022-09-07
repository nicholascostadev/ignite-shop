import { AppProps } from 'next/app';

import { globalStyles } from '../styles/global';

globalStyles();

import Image from 'next/future/image'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}