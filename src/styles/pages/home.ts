import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',

  minHeight: 656,
  borderRadius: 8,
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 540,

  overflow: 'hidden',

  img: {
    objectFit: 'cover',
  },

  footer: {
    cursor: 'default',
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      strong: {
        color: '$white',
        fontSize: '$lg',
      },

      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
      },
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: '1',
    },
  },

  '@media (max-width: 1024px)': {
    footer: {
      transform: 'translateY(0%)',
      opacity: '1',
    },
  },
})

export const SliderContainer = styled('div', {
  position: 'relative',
  marginLeft: 'auto',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',

  '.arrow': {
    width: '30px',
    height: '30px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    '-webkit-transform': 'translateY(-50%)',
    fill: '$gray100',
    cursor: 'pointer',
  },

  '.arrow--left': {
    left: '5px',
  },

  '.arrow--right': {
    left: 'auto',
    right: '5px',
  },

  '.arrow--disabled': {
    display: 'none',
  },
})
