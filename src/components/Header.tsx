import Image from 'next/future/image'
import { useShoppingCart } from 'use-shopping-cart'

import { Handbag } from 'phosphor-react'
import logoImg from '../assets/logo.svg'
import { CartButton, HeaderContainer } from '../styles/components/Header'

export function Header() {
  const { cartCount, clearCart } = useShoppingCart()
  const hasItemsInCart = !!cartCount
  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
        <CartButton hasItems={hasItemsInCart} color="gray" onClick={clearCart}>
          <div>{cartCount ?? ""}</div>
          <Handbag size={24} />
        </CartButton>
    </HeaderContainer>
  )
}