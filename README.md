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
   `src/data/categories.js`. Em `image` vai a foto (link ou arquivo em `public/images/`);
   em `fallback` fica a imagem local que aparece se a foto não carregar.
   Dica: links do Google Imagens (`encrypted-tbn0.gstatic.com`) são miniaturas de baixa
   qualidade e podem sair do ar. Para produção, baixe as fotos e salve em `public/images/`.
3. **Textos da loja:** horários e informações de contato estão em
   `src/components/Footer/Footer.jsx` e `src/pages/Contact/Contact.jsx`.
4. **Formulário de contato:** usa o Formspree (endpoint em `src/pages/Contact/Contact.jsx`).
5. **Hospedagem:** como o site usa rotas (`/produtos`, `/sobre`...), configure o servidor para
   devolver `index.html` em qualquer rota (na Vercel/Netlify, adicione uma regra de rewrite para `/index.html`).

## Estrutura

- `src/styles/variables.css` — design system (cores, tipografia, espaçamentos, tema escuro)
- `src/styles/global.css` e `animations.css` — base e animações
- `src/components/` — Header, Navbar, Footer, ProductCard, CategoryCard, SearchBar, Cart, Layout, Toast, WhatsAppButton, SmartImage (carregamento suave + fallback), Icon (ícones SVG)
- `src/hooks/useReveal.js` — animações ao rolar a página (classes `reveal`, `reveal-left`, `reveal-right`, `reveal-zoom`)
- `src/utils/flyToCart.js` — animação do produto voando até o carrinho
- `src/pages/` — Home, Products, ProductDetails, About, Contact, CartPage, NotFound
- `src/context/CartContext.jsx` e `src/hooks/` — carrinho (salvo no navegador) e tema
- `src/services/whatsapp.js` — links e mensagens do WhatsApp

## Breakpoints (mobile-first)

480px, 768px, 1024px, 1280px e 1536px (valores usados direto nas media queries).
