import { useKeenSlider } from 'keen-slider/react';
import Image from "next/future/image";
import { HomeContainer, Product, SliderContainer } from "../styles/pages/home";

import 'keen-slider/keen-slider.min.css';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Handbag } from 'phosphor-react';
import { useState } from 'react';
import { Stripe } from 'stripe';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { stripe } from "../lib/stripe";
import { CartButton } from '../styles/components/header';


type ProductType = {
  name: string
  id: string
  imageUrl: string
  price: string
  description: string
  priceNotFormatted: number,
  priceId: string,
}

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const { addItem, cartDetails } = useShoppingCart()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48, 
    },
    breakpoints: {
      '(max-width: 1180px)': {
        slides: {
          perView: 2,
          spacing: 48,
        }
      },
      '(max-width: 768px)': {
        slides: {
          perView: 1,
          spacing: 48,
        }
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }, 
  })

 


  function handleAddItemToCart(product: ProductType) {
    if(cartDetails[product.id]) return () => {}
    return () => {
        addItem({
            currency: "BRL",
            id: product.id,
            name: product.name,
            price: product.priceNotFormatted,
            price_id: product.priceId,
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

      <SliderContainer>
        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map(product => (
              <Product key={product.id} className="keen-slider__slide">
                <Link href={`/product/${product.id}`} passHref prefetch={false}>
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

        {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
      </SliderContainer>
    </>
  )
}

function Arrow(props: any) {
  const disabled = props.disabled ? "arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
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