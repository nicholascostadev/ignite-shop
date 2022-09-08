import { styled } from "..";

export const Container = styled("div", {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled("header", {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export const CartButton = styled("button", {
  border: 0,
  color: "$gray300",
  padding: 12,
  backgroundColor: "$gray800",
  borderRadius: 6,
  
  lineHeight: 0,

  cursor: 'pointer'
})