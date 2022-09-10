# Ignite Shop
<br>

> ### Read in [English](##English) or  [Portuguese](##Portuguese)

<br>

![GitHub repo size](https://img.shields.io/github/repo-size/nicholascostadev/ignite-shop?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/nicholascostadev/ignite-shop?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/nicholascostadev/ignite-shop?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/nicholascostadev/ignite-shop?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/nicholascostadev/ignite-shop?style=for-the-badge)

<img src="ignite-shop.png" alt="project image">

> A clothing store made with `React` and `TypeScript`.

## English
### Technologies Used
- React
- [Stitches](https://stitches.dev/)
- Stripe API
- [keen-slider](https://keen-slider.io/)
- [useShoppingCart](https://useshoppingcart.com/)
### Tweaks and updates

The project is still under development and there will be more updates following the list below:

- [x] Mobile responsivity

### 🚀 Run it locally

For running the project locally, follow these steps in your terminal:

```bash
# terminal

# Clone the repository
git clone https://github.com/nicholascostadev/ignite-shop.git
# Install all dependencies 
cd ignite-shop
npm install
```

Create an account in Stripe and setup the API key in a `.env.local` file
```bash
# .env.local

STRIPE_PUBLIC_API_KEY=publickeywithouthquotes
STRIPE_SECRET_API_KEY=privatekeywithouthquotes
# This URL should be http://localhost:3000 if you're
# in development mode
NEXT_PUBLIC_VERCEL_URL=productionwebsite
```

```bash
# Run the project in development mode
npm run dev
```

### Deployment
The easiest way to deploy Nextjs projects is with [Vercel](https://vercel.com), just create an account there and follow the instructions.

### How to test it
One of the cards you can use for testing is:

`4242 4242 4242 4242` 

the rest of the data may be completely random, but the expiration date may be a valid one.

Other cards are available here: [Testing cards](https://stripe.com/docs/testing)
## Portuguese

<img src="ignite-shop.png" alt="project image">

> Uma loja de roupas feita com `React` e `TypeScript`.

### Tecnologias utilizadas
- React
- [Stitches](https://stitches.dev/)
- Stripe API
- [keen-slider](https://keen-slider.io/)
- [useShoppingCart](https://useshoppingcart.com/)

### Ajustes e Updates

Esse projeto ainda está em desenvolvimento e terá atualizações de acordo com a lista abaixo:

- [x] Responsividade no Mobile

### 🚀 Run it locally

Para rodar o projeto localmente, siga esses passos no seu terminal:

```bash
# terminal

# Clone o repositório
git clone https://github.com/nicholascostadev/ignite-shop.git
# Instale as dependências
cd ignite-shop
npm install
```

Crie uma conta no Stripe e coloque suas chaves de API no 
arquivo `.env.local`

```bash
# .env.local

STRIPE_PUBLIC_API_KEY=apipublicasemaspas
STRIPE_SECRET_API_KEY=apiprivadasemaspas
# Essa URL deve ser http://localhost:3000 se você está
# em ambiente de desenvolvimento
NEXT_PUBLIC_VERCEL_URL=websitedeproducao
```

```bash
# Rode o projeto em modo de desenvolvimento
npm run dev
```

### Deployment
A maneira mais de dar deploy em projetos Nextjs é pela [Vercel](https://vercel.com), é só criar uma conta e seguir as instruções.

### Como testar
Um dos cartões que você pode usar para testar é o:

`4242 4242 4242 4242` 

o resto dos dados pode ser completamente aleatório, tirando a data de validade que tem que ser uma data válida.

Outros cartões estão disponíveis por aqui: [Cartões de teste](https://stripe.com/docs/testing)