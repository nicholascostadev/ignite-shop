import { useShoppingCart } from 'use-shopping-cart'

import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Handbag } from 'phosphor-react'
import logoImg from '../assets/logo.svg'
import { CartButton, HeaderContainer } from '../styles/components/header'
import { CartDrawer } from './CartDrawer'

export function Header() {
  const { cartCount, handleCartClick } = useShoppingCart()
  const { asPath } = useRouter()
  const hasItemsInCart = !!cartCount
  const isOnSuccessPage = asPath.includes('/success')

  return (
    <HeaderContainer isOnSuccessPage={isOnSuccessPage}>
      <Link href="/" passHref prefetch={false}>
        <Image src={logoImg} alt="" />
      </Link>
      {!isOnSuccessPage && (
        <>
          <CartButton
            hasItems={hasItemsInCart}
            color="gray"
            onClick={handleCartClick}
          >
            <div>{cartCount ?? ''}</div>
            <Handbag size={24} />
          </CartButton>
          <CartDrawer />
        </>
      )}
    </HeaderContainer>
  )
}
