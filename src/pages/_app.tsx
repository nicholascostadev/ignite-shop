import { AppProps } from 'next/app';

import { globalStyles } from '../styles/global';

import { CartProvider } from 'use-shopping-cart';
import { Header } from '../components/Header';
import { Container } from '../styles/pages/app';

globalStyles();

const stripeKey = "pk_test_51LfDKBARIofxqPkqq1p7kvJP9oEb7VrkhC1q9R0Op2Y9QWd2BihTCdFS8QxjO0oyG9N6DAhH2KrqG1UQwcKP4XzE00JCp0JjXv"

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