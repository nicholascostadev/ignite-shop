import { AppProps } from 'next/app';

import { globalStyles } from '../styles/global';

import { CartProvider } from 'use-shopping-cart';
import { Header } from '../components/Header';
import { Container } from '../styles/pages/app';

globalStyles();

const stripeKey = process.env.STRIPE_PUBLIC_API_KEY

export default function App({ Component, pageProps }: AppProps) {
    return (
      <CartProvider
        cartMode="checkout-session"
        stripe={stripeKey}
        currency="BRL"
      >
        <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </CartProvider>
    )
}