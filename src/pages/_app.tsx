import { AppProps } from 'next/app';

import { globalStyles } from '../styles/global';

import { CartProvider } from 'use-shopping-cart';
import { Header } from '../components/Header';
import { Container } from '../styles/pages/app';

globalStyles();

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
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}