import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Stripe } from 'stripe'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    priceId: string
    priceNotFormatted: number
  }
}

export default function Product({ product }: ProductProps) {
  const { addItem, cartDetails } = useShoppingCart()
  const isItemAlreadyInCart = !!cartDetails[product.id]

  async function handleBuyProduct() {
    if (isItemAlreadyInCart) return

    addItem({
      currency: 'BRL',
      id: product.id,
      name: product.name,
      price: product.priceNotFormatted,
      price_id: product.priceId,
      image: product.imageUrl,
      description: product.description,
    })
  }

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isItemAlreadyInCart} onClick={handleBuyProduct}>
            {isItemAlreadyInCart ? 'Item já adicionado' : 'Colocar na sacola'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_MNzPUFSjc0sWAF' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const { id } = params

  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0] ?? '',
        price: formatCurrencyString({
          currency: 'BRL',
          value: price.unit_amount,
          language: 'pt-BR',
        }),
        priceId: price.id,
        description: product.description,
        priceNotFormatted: price.unit_amount,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
