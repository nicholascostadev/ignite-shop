import { styled } from "../styles"

const Button = styled("button", {
  backgroundColor: '$green300',
  borderRadius: 4,
  border: 0,
  padding: '4px 8px',

  span: {
    fontWeight: 'bold'
  },
})

export default function Home() {
  return (
    <Button>
      <span>Teste</span>
      Hello World</Button>
  )
}
