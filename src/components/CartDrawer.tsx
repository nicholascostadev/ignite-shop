import axios from 'axios';
import Image from "next/future/image";
import Link from "next/link";
import { SpinnerGap, X } from "phosphor-react";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CartDrawerButton, CartDrawerCloseButton, CartDrawerContainer, CartDrawerItem, CartDrawerItemImage, CartDrawerItemsContainer, CartDrawerMainInfo } from '../styles/components/cartDrawer';

export function CartDrawer() {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { 
    cartDetails,
    removeItem,
    formattedTotalPrice,
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    redirectToCheckout,
    clearCart
  } = useShoppingCart()
  const hasItemsInCart = !!cartCount

  function handleRemoveProductFromCart(id: string): () => void {
    return () => removeItem(id)
  }

  async function handleRedirectUserToCheckout() {

    try {
      setIsRedirecting(true)

      const response = await axios.post('/api/checkout', {
        items: cartDetails
      })

      const { checkoutSessionId } = response.data
      clearCart()
      const result = await redirectToCheckout(checkoutSessionId)

      if (result?.error) {
        console.error("Result error: ", result)
      } 

    } catch (err) {
      alert('Falha ao redirecionar ao checkout')
      console.error(err)
      setIsRedirecting(false)
    }
  }

  return (
    <CartDrawerContainer isOpen={shouldDisplayCart}>
      <CartDrawerCloseButton onClick={handleCartClick}>
        <X size={24} />
      </CartDrawerCloseButton>

      <CartDrawerMainInfo>
        {
          hasItemsInCart ? 
            (<h1>Sacola de compras</h1>)
            : 
            (<h1>Você não tem nenhum item selecionado, que tal selecionar um?</h1>)
        }


        <CartDrawerItemsContainer>
          {Object.keys(cartDetails).map(key => {
            return (
              <CartDrawerItem key={cartDetails[key].id}>
                <CartDrawerItemImage>
                  <Image src={cartDetails[key].image} alt="" width={95} height={95} />
                </CartDrawerItemImage>
                <div>
                  <div>
                    <Link href={`/product/${cartDetails[key].id}`} passHref>
                      <a>{cartDetails[key].name}</a>
                    </Link>
                    <strong>{cartDetails[key].formattedValue}</strong>
                  </div>

                  <button onClick={handleRemoveProductFromCart(cartDetails[key].id)}>Remover</button>
                </div>
              </CartDrawerItem>
            )
          })}
          
        </CartDrawerItemsContainer>

        <footer>
          {hasItemsInCart && (
            <>
              <div>
                <p>Quantidade</p>
                <p>{hasItemsInCart ? `${cartCount} item`: cartCount > 1 ? `${cartCount} itens`: ""}</p>
              </div>
              <div>
                <strong>Valor total</strong>
                <strong>{formattedTotalPrice}</strong>
              </div>
            </>
          )}

          <CartDrawerButton 
            disabled={!hasItemsInCart || isRedirecting} 
            onClick={handleRedirectUserToCheckout}
          >
            {isRedirecting ? (
              <SpinnerGap size={22} />
            ): (
              "Finalizar compra"
            )}
            
           
          </CartDrawerButton>
        </footer>
      </CartDrawerMainInfo>
    </CartDrawerContainer>
  )
}