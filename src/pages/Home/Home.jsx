import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import SmartImage from "../../components/SmartImage/SmartImage";
import Icon, { WhatsAppIcon } from "../../components/Icon/Icon";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import { useReveal, animateCount } from "../../hooks/useReveal";
import { buildWhatsAppUrl } from "../../services/whatsapp";
import { formatPrice } from "../../utils/format";
import "./Home.css";

const benefits = [
  {
    icon: "chat",
    title: "Pedido pelo WhatsApp",
    text: "Monte o carrinho no site e envie o pedido pronto para a loja.",
  },
  {
    icon: "wrench",
    title: "Peças para o dia a dia",
    text: "Pneus, freios, transmissão, elétrica, suspensão e acessórios.",
  },
  {
    icon: "shield",
    title: "Compatibilidade conferida",
    text: "Informe modelo e ano da moto e a equipe confirma antes da compra.",
  },
  {
    icon: "tag",
    title: "Preço claro",
    text: "Valores visíveis no catálogo, sem precisar pedir orçamento.",
  },
];

const steps = [
  {
    icon: "search",
    title: "Escolha as peças",
    text: "Navegue pelo catálogo ou busque pelo nome da peça.",
  },
  {
    icon: "cart",
    title: "Monte o carrinho",
    text: "Ajuste as quantidades e confira o total do pedido.",
  },
  {
    icon: "chat",
    title: "Finalize no WhatsApp",
    text: "O pedido chega pronto para a loja. Pagamento e entrega são combinados na conversa.",
  },
];

const headline = [["Sua", "moto"], ["merece", "o"], ["melhor."]];

function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animateCount(el, value);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <>
      <span ref={ref}>0</span>
      {suffix}
    </>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const visualRef = useRef(null);
  useReveal();

  const featured = products.filter((product) => product.featured).slice(0, 4);
  const heroMain = products.find((p) => p.category === "Capacetes") || products[0];
  const heroChips = [
    products.find((p) => p.category === "Pneus"),
    products.find((p) => p.category === "Óleos e Lubrificantes"),
  ].filter(Boolean);
  const bannerImage = categories.find((c) => c.id === "freios") || categories[0];

  const countByCategory = (name) => products.filter((p) => p.category === name).length;

  // leve efeito de profundidade: o visual do hero acompanha o mouse
  const handleHeroMove = (event) => {
    const el = visualRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", x.toFixed(3));
    el.style.setProperty("--py", y.toFixed(3));
  };

  let wordIndex = 0;

  return (
    <main className="home">
      {/* ================= HERO ================= */}
      <section className="hero carbon" onMouseMove={handleHeroMove}>
        <div className="hero__speed" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} style={{ "--i": i }} />
          ))}
        </div>
        <div className="hero__slash" aria-hidden="true" />
        <span className="hero__bg-word" aria-hidden="true">
          MOTO
        </span>

        <div className="hero__inner">
          <div className="hero__content">
            <span className="hero__tag">
              <span className="hero__tag-dot" />
              Peças e acessórios para motos
            </span>

            <h1 className="hero__title">
              {headline.map((line, lineIndex) => (
                <span className="hero__line" key={lineIndex}>
                  {line.map((word) => {
                    const delay = 150 + wordIndex++ * 90;
                    const accent = word === "melhor.";
                    return (
                      <span className="hero__word-mask" key={word}>
                        <span
                          className={`hero__word ${accent ? "hero__word--accent" : ""}`}
                          style={{ animationDelay: `${delay}ms` }}
                        >
                          {word}
                        </span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p className="hero__subtitle">
              Encontre peças e acessórios para cuidar da sua moto. Monte o
              pedido aqui e finalize direto com a loja pelo WhatsApp.
            </p>

            <div className="hero__actions">
              <Link to="/produtos" className="btn btn--primary btn--lg">
                Ver produtos
                <Icon name="arrow" size={18} className="icon--arrow" />
              </Link>

              <Link to="/sobre" className="btn btn--ghost btn--lg">
                Conheça a loja
              </Link>
            </div>

            <dl className="hero__stats">
              <div>
                <dt>Produtos</dt>
                <dd>
                  <CountUp value={products.length} suffix="+" />
                </dd>
              </div>
              <div>
                <dt>Categorias</dt>
                <dd>
                  <CountUp value={categories.length} />
                </dd>
              </div>
              <div>
                <dt>Atendimento</dt>
                <dd>Seg–Sáb</dd>
              </div>
            </dl>
          </div>

          <div className="hero__visual" ref={visualRef}>
            <div className="hero__wheel" aria-hidden="true">
              <svg viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="188" className="hero__wheel-tread" />
                <circle cx="200" cy="200" r="160" className="hero__wheel-rim" />
                <circle cx="200" cy="200" r="122" className="hero__wheel-disc" />
                {Array.from({ length: 10 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={200 + 92 * Math.cos((i * Math.PI) / 5)}
                    cy={200 + 92 * Math.sin((i * Math.PI) / 5)}
                    r="9"
                    className="hero__wheel-hole"
                  />
                ))}
              </svg>
            </div>

            <div className="hero__glow" aria-hidden="true" />

            <Link to={`/produtos/${heroMain.id}`} className="hero__main" aria-label={`Ver ${heroMain.name}`}>
              <SmartImage
                src={heroMain.image}
                fallback={heroMain.fallback}
                alt={heroMain.name}
                fit="contain"
                eager
                className="hero__main-image"
              />
            </Link>

            {heroChips.map((item, i) => (
              <Link
                key={item.id}
                to={`/produtos/${item.id}`}
                className={`hero__chip hero__chip--${i + 1}`}
              >
                <span className="hero__chip-image">
                  <SmartImage src={item.image} fallback={item.fallback} alt="" fit="contain" eager />
                </span>
                <span className="hero__chip-text">
                  <small>{item.category}</small>
                  <strong>{formatPrice(item.price)}</strong>
                </span>
              </Link>
            ))}

            <span className="hero__badge" aria-hidden="true">
              <Icon name="gauge" size={18} />
              Feita para quem pilota
            </span>
          </div>
        </div>

        <a href="#beneficios" className="hero__scroll" aria-label="Rolar para o conteúdo">
          <span />
        </a>
      </section>

      {/* ================= FAIXA ROLANTE ================= */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...categories, ...categories].map((category, i) => (
            <span key={i} className="ticker__item">
              {category.name}
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      {/* ================= BENEFÍCIOS ================= */}
      <section className="home__benefits" id="beneficios" aria-label="Diferenciais da loja">
        <div className="container">
          <ul className="benefits">
            {benefits.map((item, i) => (
              <li key={item.title} className="benefit reveal" data-delay={i * 100}>
                <span className="benefit__icon">
                  <Icon name={item.icon} size={24} />
                </span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= CATEGORIAS ================= */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">Categorias</span>
              <h2>
                Compre por <span className="text-accent">categoria</span>
              </h2>
              <p>Escolha o tipo de peça e veja só o que você precisa.</p>
            </div>
            <Link to="/produtos" className="link-arrow">
              Todas as peças <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div className="home__categories">
            {categories.map((category, i) => (
              <div key={category.id} className="reveal" data-delay={(i % 4) * 90}>
                <CategoryCard
                  category={category}
                  index={i}
                  count={countByCategory(category.name)}
                  onClick={(item) => navigate(`/produtos?categoria=${encodeURIComponent(item.name)}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DESTAQUES ================= */}
      <section className="section home__featured">
        <div className="container">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">Mais procurados</span>
              <h2>
                Produtos em <span className="text-accent">destaque</span>
              </h2>
              <p>Itens que nossos clientes mais procuram.</p>
            </div>
            <Link to="/produtos" className="link-arrow">
              Catálogo completo <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div className="home__products">
            {featured.map((product, i) => (
              <div key={product.id} className="reveal" data-delay={i * 110}>
                <ProductCard
                  product={product}
                  onViewDetails={(item) => navigate(`/produtos/${item.id}`)}
                  onAddToCart={addItem}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMO COMPRAR ================= */}
      <section className="section steps-section">
        <div className="container">
          <div className="section-heading section-heading--center reveal">
            <div>
              <span className="eyebrow">Simples e rápido</span>
              <h2>
                Como <span className="text-accent">comprar</span>
              </h2>
            </div>
          </div>

          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title} className="step reveal" data-delay={i * 160}>
                <span className="step__number">0{i + 1}</span>
                <span className="step__icon">
                  <Icon name={step.icon} size={28} />
                </span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= BANNER ================= */}
      <section className="container">
        <div className="banner reveal-zoom">
          <SmartImage
            src={bannerImage.image}
            fallback={bannerImage.fallback}
            alt=""
            className="banner__image"
          />
          <div className="banner__content">
            <span className="eyebrow eyebrow--light">Ajuda especializada</span>
            <h2 className="banner__title">Não achou a peça que procura?</h2>
            <p className="banner__text">
              Chame a gente no WhatsApp. Informe o modelo e o ano da sua moto e
              ajudamos a encontrar a peça certa.
            </p>
            <a
              className="btn btn--whatsapp btn--lg"
              href={buildWhatsAppUrl("Olá! Preciso de ajuda para encontrar uma peça.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
