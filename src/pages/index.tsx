import { useKeenSlider } from 'keen-slider/react'
import Image from "next/future/image"
import { HomeContainer, Product } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import { GetStaticProps } from "next"
import Head from 'next/head'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { Stripe } from 'stripe'
import { stripe } from "../lib/stripe"
import { CartButton } from '../styles/components/Header'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import {
  Product as TProduct,
  CartActions,
  CartEntry as ICartEntry,
} from 'use-shopping-cart/core'

type ProductType = {
  name: string
  id: string
  imageUrl: string
  price: string
  description: string
  priceNotFormatted: number
}

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const { addItem, cartDetails } = useShoppingCart()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48, 
    }
  })

  console.log(cartDetails)

  function handleAddItemToCart(product: ProductType): () => void {
    return () => {
        addItem({
            currency: "BRL",
            id: product.id,
            name: product.name,
            price: product.priceNotFormatted,
            image: product.imageUrl,
            description: product.description,
          })
    }
  }

  return (
    <>
     <Head>
        <title>Home | Ignite Shop</title>
      </Head>
    
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
            <Product key={product.id} className="keen-slider__slide">
              <Link href={`/product/${product.id}`}  passHref prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>
              
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <CartButton onClick={handleAddItemToCart(product)} color="green">
                  <Handbag size={24} />
                </CartButton>
              </footer> 
            </Product>
        ))}
      </HomeContainer>
    </>
    
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0] ?? "",
      price: formatCurrencyString({currency: "BRL",value: price.unit_amount,language: "pt-BR"}),
      priceId: price.id,
      description: product.description,
      priceNotFormatted: price.unit_amount
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, 
  }
}