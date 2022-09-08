import { X } from "phosphor-react";
import { CartDrawerContainer, CartDrawerIconContainer, CartDrawerMainInfo } from '../styles/components/cartDrawer';

export function CartDrawer() {
  return (
    <CartDrawerContainer>
      <CartDrawerIconContainer>
        <X size={24} />
      </CartDrawerIconContainer>

      <CartDrawerMainInfo>
        <h1>Sacola de compras</h1>
      </CartDrawerMainInfo>
    </CartDrawerContainer>
  )
}