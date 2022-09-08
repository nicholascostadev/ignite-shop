import { AppProps } from 'next/app';

import { globalStyles } from '../styles/global';

globalStyles();

import Image from 'next/future/image'

import logoImg from '../assets/logo.svg'
import { CartButton, Container, Header } from '../styles/pages/app';
import { CartProvider } from 'use-shopping-cart';
import { Handbag } from 'phosphor-react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.STRIPE_SECRET_API_KEY}
      successUrl="http://localhost:3000/success"
      cancelUrl="http://localhost:3000/"
      currency="BRL"
      allowedCountries={['US', 'GB', 'CA', 'BR']}
      loading={<p>Loading...</p>}
    >
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
          <CartButton>
            <Handbag size={24} />
          </CartButton>
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}