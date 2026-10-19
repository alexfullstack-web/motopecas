# Moto Peças

Site de loja de motopeças feito com React, Vite e CSS puro (JavaScript, sem TypeScript).

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # build de produção (pasta dist)
npm run preview  # testar o build
```

## Antes de publicar

1. **WhatsApp:** copie `.env.example` para `.env` e coloque o número real da loja
   (`VITE_WHATSAPP_NUMBER`, formato DDI + DDD + número, só dígitos).
2. **Produtos:** edite `src/data/products.js` (nome, preço, estoque, categoria) e
   `src/data/categories.js`. Coloque as fotos em `public/images/products/` e ajuste o
   caminho em `image`. As imagens atuais são placeholders em SVG.
3. **Textos da loja:** horários e informações de contato estão em
   `src/components/Footer/Footer.jsx` e `src/pages/Contact/Contact.jsx`.
4. **Formulário de contato:** usa o Formspree (endpoint em `src/pages/Contact/Contact.jsx`).
5. **Hospedagem:** como o site usa rotas (`/produtos`, `/sobre`...), configure o servidor para
   devolver `index.html` em qualquer rota (na Vercel/Netlify, adicione uma regra de rewrite para `/index.html`).

## Estrutura

- `src/styles/variables.css` — design system (cores, tipografia, espaçamentos, tema escuro)
- `src/styles/global.css` e `animations.css` — base e animações
- `src/components/` — Header, Navbar, Footer, ProductCard, CategoryCard, SearchBar, Cart, Layout, Toast, WhatsAppButton
- `src/pages/` — Home, Products, ProductDetails, About, Contact, CartPage, NotFound
- `src/context/CartContext.jsx` e `src/hooks/` — carrinho (salvo no navegador) e tema
- `src/services/whatsapp.js` — links e mensagens do WhatsApp

## Breakpoints (mobile-first)

480px, 768px, 1024px, 1280px e 1536px (valores usados direto nas media queries).
